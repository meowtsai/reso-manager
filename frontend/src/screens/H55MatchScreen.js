import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listMatch } from "../actions/h55eventActions";

const H55MatchScreen = ({ history }) => {
  const dispatch = useDispatch();

  const matchList = useSelector((state) => state.matchList);
  const { loading, error, matches } = matchList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listMatch());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  return (
    <>
      <h1>第五人格萬聖狂歡盃媒合報名列表</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>報名者</th>
              <th>聯絡資料</th>
              <th>遊戲資料</th>
              <th>隊員</th>
              <th>填寫時間</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr>
                <td>
                  聯絡人姓名: {match.name}
                  <br />
                  生日: {match.birthday.substring(0, 10)}
                  <br />
                </td>
                <td>
                  <i className="fas fa-envelope"></i>
                  <a href={`mailto:${match.email}`}>{match.email}</a>
                  <br />
                  <i className="fas fa-phone"></i> {match.phone_code} -{" "}
                  {match.phone}
                  <br />
                  <i className="fab fa-line text-success"></i> {match.line_id}
                </td>

                <td>
                  GAME_NAME: {match.game_name} <br />
                  GAME_ID: {match.game_id} <br />
                </td>
                <td>
                  已有: {match.own_hunter}名監管者，　{match.own_survivor}
                  名求生者　
                  <br />
                  徵求: {match.need_hunter}名監管者，　{match.need_survivor}
                  名求生者　
                  <br />
                </td>
                <td>{match.date.substring(0, 16)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default H55MatchScreen;
