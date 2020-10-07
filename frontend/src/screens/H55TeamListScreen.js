import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listTeams } from "../actions/h55eventActions";

const H55TeamListScreen = ({ history }) => {
  const dispatch = useDispatch();

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

  return (
    <>
      <h1>第五人格萬聖狂歡盃隊伍列表</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>隊伍資料</th>

              <th>隊員</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
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
                  <i className="fas fa-phone"></i> {team.captain_phone_code} -{" "}
                  {team.captain_phone}
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
                          {team.captain_role === "1" ? "監管者" : "求生者"}{" "}
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
                          <td> {member.role === "1" ? "監管者" : "求生者"} </td>
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
      )}
    </>
  );
};

export default H55TeamListScreen;
