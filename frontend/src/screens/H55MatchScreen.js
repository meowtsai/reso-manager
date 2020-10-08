import React, { useEffect, useState } from "react";
import { Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listMatch } from "../actions/h55eventActions";
import Paginate from "../components/Paginate";
import { CSVLink } from "react-csv";

const H55MatchScreen = ({ history }) => {
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
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

  useEffect(() => {
    const { matches } = matchList;

    if (matches && matches.length > 0) {
      setPages(Math.ceil(matches.length / pageSize));
    }
  }, [matchList]);

  const fileName = `第五人格萬聖狂歡盃媒合報名_${Date.now()}`;
  const csvHeaders = [
    { label: "id", key: "_id" },
    { label: "姓名", key: "name" },
    { label: "生日", key: "birthday" },
    { label: "Email", key: "email" },
    { label: "電話", key: "phone" },
    { label: "Line ID", key: "line_id" },
    { label: "GAME_ID", key: "game_id" },
    { label: "GAME_NAME", key: "game_name" },
    { label: "已有", key: "own" },
    { label: "需求", key: "need" },
  ];

  return (
    <>
      <h1>第五人格萬聖狂歡盃媒合報名列表</h1>
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
              共 {matches.length} 筆資料, 顯示 {(page - 1) * pageSize + 1}~{" "}
              {(page - 1) * pageSize + pageSize < matches.length
                ? (page - 1) * pageSize + pageSize
                : matches.length}
              筆
            </Col>

            <Col>
              <CSVLink
                data={matches.map((match) => ({
                  ...match,
                  phone: `${match.phone_code} - ${match.phone}`,
                  own: `已有: ${match.own_hunter}名監管者，${match.own_survivor}名求生者`,
                  need: `徵求: ${match.need_hunter}名監管者，${match.need_survivor}名求生者`,
                }))}
                headers={csvHeaders}
                filename={fileName + ".csv"}
              >
                <i className="fas fa-file-download"></i>
                下載 csv檔案
              </CSVLink>
            </Col>
          </Row>

          <Table
            striped
            bordered
            hover
            responsive
            className="table-sm text-dark"
          >
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
              {matches
                .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
                .map((match) => (
                  <tr key={`m-${match._id}`}>
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
                      <i className="fab fa-line text-success"></i>{" "}
                      {match.line_id}
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
        </>
      )}
    </>
  );
};

export default H55MatchScreen;
