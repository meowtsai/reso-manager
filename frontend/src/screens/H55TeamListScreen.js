import React, { Fragment, useEffect, useState } from "react";
import { Table, Row, Col, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listTeams,
  updateMemberGameId,
  deleteTeam,
} from "../actions/h55eventActions";
import Paginate from "../components/Paginate";
import { CSVLink } from "react-csv";

const H55TeamListScreen = ({ history }) => {
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [editTarget, setEditTarget] = useState({
    mode: null,
    team_id: null,
    game_id: null,
    new_game_id: null,
  });

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

  const editMode = (mode, team_id, game_id) => {
    //console.log("editMode", mode, team_id, game_id);
    setEditTarget({
      mode,
      team_id,
      game_id,
      new_game_id: game_id,
    });
  };

  const onSubmit = () => {
    //console.log("onSubmit", editTarget);
    if (editTarget.game_id !== editTarget.new_game_id) {
      dispatch(updateMemberGameId(editTarget));
    } else {
      setEditTarget({
        mode: null,
        team_id: null,
        game_id: null,
        new_game_id: null,
      });
    }

    //update db
  };

  const deleteHandler = (team_name, id) => {
    if (
      window.confirm(
        `你確定要刪除${team_name} (辨識id: ${id.substring(
          0,
          6
        )})這筆資料嗎, 沒有備分喔`
      )
    ) {
      //console.log("delete ", id);
      dispatch(deleteTeam(id));
    }
  };

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
                      辨識id: {team._id.substring(0, 6)}
                      <br />
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
                      {userInfo && userInfo.isAdmin && (
                        <Button
                          variant="danger"
                          className="btn-sm mt-3 ml-1"
                          onClick={() => deleteHandler(team.team, team._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      )}
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
                            <td>
                              {userInfo &&
                              userInfo.isAdmin &&
                              editTarget.mode === "captain" &&
                              team._id === editTarget.team_id &&
                              team.captain_game_id === editTarget.game_id ? (
                                <Fragment>
                                  <input
                                    type="text"
                                    defaultValue={editTarget.game_id}
                                    onChange={(e) =>
                                      setEditTarget({
                                        ...editTarget,
                                        new_game_id: e.target.value,
                                      })
                                    }
                                    style={{
                                      width: "70px",
                                      marginRight: "3px",
                                    }}
                                  />
                                  <i
                                    className="fa fa-check"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      onSubmit(team._id, team.captain_game_id)
                                    }
                                  ></i>
                                </Fragment>
                              ) : (
                                <Fragment>
                                  {team.captain_game_id}

                                  {userInfo && userInfo.isAdmin && (
                                    <i
                                      className="far fa-edit"
                                      style={{
                                        cursor: "pointer",
                                        marginLeft: "3px",
                                      }}
                                      onClick={() =>
                                        editMode(
                                          "captain",
                                          team._id,
                                          team.captain_game_id
                                        )
                                      }
                                    ></i>
                                  )}
                                </Fragment>
                              )}
                            </td>
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
                              <td>
                                {userInfo &&
                                userInfo.isAdmin &&
                                editTarget.mode === "member" &&
                                team._id === editTarget.team_id &&
                                member.game_id === editTarget.game_id ? (
                                  <Fragment>
                                    <input
                                      type="text"
                                      defaultValue={editTarget.game_id}
                                      onChange={(e) =>
                                        setEditTarget({
                                          ...editTarget,
                                          new_game_id: e.target.value,
                                        })
                                      }
                                      style={{
                                        width: "70px",
                                        marginRight: "3px",
                                      }}
                                    />
                                    <i
                                      className="fa fa-check"
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        onSubmit(team._id, member.game_id)
                                      }
                                    ></i>
                                    <i
                                      className="fa fa-times ml-2"
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        setEditTarget({
                                          mode: null,
                                          team_id: null,
                                          game_id: null,
                                          new_game_id: null,
                                        })
                                      }
                                    ></i>
                                  </Fragment>
                                ) : (
                                  <Fragment>
                                    {member.game_id}
                                    {userInfo && userInfo.isAdmin && (
                                      <i
                                        className="far fa-edit"
                                        style={{
                                          cursor: "pointer",
                                          marginLeft: "3px",
                                        }}
                                        onClick={() =>
                                          editMode(
                                            "member",
                                            team._id,
                                            member.game_id
                                          )
                                        }
                                      ></i>
                                    )}
                                  </Fragment>
                                )}
                              </td>
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
