import React, { useEffect, useState } from "react";
import { Table, Row, Col, Card, CardGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { listGames } from "../../actions/mentorActions";

const MentorsGameListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const gameList = useSelector((state) => state.gameList);
  const { loading, error, games, mentors } = gameList;

  useEffect(() => {
    if (userInfo) {
      dispatch(listGames());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h3>帶練課程列表</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table
            striped
            bordered
            hover
            responsive
            className="table-sm text-dark"
          >
            <thead>
              <tr>
                <th>遊戲ID</th>
                <th>遊戲名稱</th>
                <th>課程資訊</th>
                <th>導師群</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={`m-${game._id}`}>
                  <td>{game.gameId}</td>
                  <td>{game.gameName}</td>
                  <td>
                    {game.courses.map((c) => (
                      <div>
                        {c.title} -{c.desc}{" "}
                        <small className="text-success">
                          ($ <strong> {c.fee}</strong>/{c.time}/最多可同時報名
                          <strong>{c.seats}</strong>名成員)
                        </small>
                      </div>
                    ))}
                  </td>
                  <td>
                    {mentors
                      .filter((m) => m.courseId === game.gameId)
                      .map((m) => (
                        <div>
                          {" "}
                          <strong>{m.name}</strong>
                        </div>
                      ))}
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

export default MentorsGameListScreen;
