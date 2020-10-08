import React, { useEffect, useState } from "react";
import { Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listTeams } from "../actions/h55eventActions";
import Paginate from "../components/Paginate";
import { CSVLink } from "react-csv";

const H55TeamListScreen = ({ history }) => {
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const dispatch = useDispatch();
  const [flattened, setFlattened] = useState([]);

  const teamList = useSelector((state) => state.teamList);
  const { loading, error, teams } = teamList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listTeams());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  useEffect(() => {
    const { teams } = teamList;

    if (teams && teams.length > 0) {
      setPages(Math.ceil(teams.length / pageSize));

      const members = teams.map((t) => {
        const cap_info = {
          title: "隊長",
          name: t.captain_name,
          birthday: t.captain_birthday.substring(0, 10),
          game_id: t.captain_game_id,
          line_id: t.captain_line_id,
          role: t.captain_role === "1" ? "監管者" : "求生者",
          img1: t.captain_img1,
          img2: t.captain_img2,
          team: t.team,
          team_id: t._id,
          phone: `'${t.captain_phone_code} - ${t.captain_phone}`,
          email: t.captain_email,
        };

        return [cap_info].concat(
          t.members.map((m, i) => ({
            ...m,
            title: "隊員" + (i + 1),
            role: m.role === "1" ? "監管者" : "求生者",
          }))
        );
      });
      const flat = members.reduce(function (a, b) {
        return a.concat(b);
      }, []);
      setFlattened(flat);
    }
  }, [teamList]);

  // useEffect(() => {

  // }, [page])

  const fileName = `第五人格萬聖狂歡盃名單_${Date.now()}`;
  const csvHeaders = [
    { label: "隊伍_id", key: "team_id" },
    { label: "隊伍名稱", key: "team" },
    { label: "Email", key: "email" },
    { label: "電話", key: "phone" },
    { label: "身分", key: "title" },
    { label: "姓名", key: "name" },
    { label: "生日", key: "birthday" },
    { label: "GAME_ID", key: "game_id" },
    { label: "Line ID", key: "line_id" },
    { label: "角色", key: "role" },
    { label: "正面圖檔連結", key: "img1" },
    { label: "反面圖檔連結", key: "img2" },
  ];

  return (
    <>
      <h1>第五人格萬聖狂歡盃隊伍列表</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col>
              <Paginate pages={pages} page={page} setPage={(p) => setPage(p)} />
            </Col>
            <Col>
              共 {teams.length} 筆資料, 顯示 {(page - 1) * pageSize + 1}~{" "}
              {(page - 1) * pageSize + pageSize < teams.length
                ? (page - 1) * pageSize + pageSize
                : teams.length}
              筆
            </Col>

            <Col>
              <CSVLink
                data={flattened}
                headers={csvHeaders}
                filename={fileName + ".csv"}
              >
                <i className="fas fa-file-download"></i>
                下載 csv檔案
              </CSVLink>
            </Col>
          </Row>

          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>隊伍資料</th>

                <th>隊員</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {teams
                .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
                .map((team) => (
                  <tr key={team._id}>
                    <td>
                      <h4>{team.team}</h4>
                      隊長姓名: {team.captain_name}{" "}
                      {team.captain_gender === "1" ? (
                        <i className="fas fa-mars text-info"></i>
                      ) : (
                        <i className="fas fa-venus text-danger"></i>
                      )}{" "}
                      <br />
                      隊長GAME_NAME: {team.captain_game_name} <br />
                      <i className="fas fa-envelope"></i>
                      <a href={`mailto:${team.captain_email}`}>
                        {team.captain_email}
                      </a>
                      <br />
                      <i className="fas fa-phone"></i> {team.captain_phone_code}{" "}
                      - {team.captain_phone}
                      <br />
                      <i className="fab fa-line text-success"></i>{" "}
                      {team.captain_line_id}
                      <br />
                      填寫時間: {team.date.substring(0, 10)} <br />
                    </td>
                    <td>
                      <Table>
                        <thead>
                          <tr>
                            <th></th>
                            <th>姓名</th>
                            <th>生日</th>
                            <th>GAME_ID</th>
                            <th>Line ID</th>
                            <th>角色</th>
                            <th>圖檔</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td> 隊長 </td>
                            <td> {team.captain_name} </td>
                            <td> {team.captain_birthday.substring(0, 10)} </td>
                            <td> {team.captain_game_id} </td>
                            <td> {team.captain_line_id} </td>
                            <td>
                              {" "}
                              {team.captain_role === "1"
                                ? "監管者"
                                : "求生者"}{" "}
                            </td>
                            <td>
                              {" "}
                              <a href={team.captain_img1}>
                                <i className="fas fa-id-card"></i>正面
                              </a>{" "}
                              /{" "}
                              <a href={team.captain_img2}>
                                <i className="far fa-id-card"></i>反面
                              </a>
                            </td>
                          </tr>
                          {team.members.map((member, index) => (
                            <tr key={`${team._id}${index}${member.line_id}`}>
                              <td> 隊員{index + 1} </td>
                              <td> {member.name} </td>
                              <td> {member.birthday} </td>
                              <td> {member.game_id} </td>
                              <td> {member.line_id} </td>
                              <td>
                                {" "}
                                {member.role === "1" ? "監管者" : "求生者"}{" "}
                              </td>
                              <td>
                                {" "}
                                <a href={member.img1}>
                                  <i className="fas fa-id-card"></i>正面
                                </a>{" "}
                                /{" "}
                                <a href={member.img2}>
                                  <i className="far fa-id-card"></i>反面
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default H55TeamListScreen;
