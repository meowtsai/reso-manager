import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Row, Col } from "react-bootstrap";
import { DateTime } from "luxon";
import { listCosplays } from "../actions/h55eventActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const H55CosplayReportScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cosplayList = useSelector((state) => state.cosplayList);
  const {
    loading,
    error,
    cosplays,
    scores,
    fbvotes = [],
    scores_all = [],
  } = cosplayList;

  const voteTotal = fbvotes.reduce((prev, curr) => prev + curr.count, 0);
  const maxVote = fbvotes.reduce(
    (prev, curr) => (prev > curr.count ? prev : curr.count),
    0
  );

  console.log("voteTotal", voteTotal);
  console.log("maxVote", maxVote);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const judge1 = "5fd198f7d27abe0d2f679eb2";
  const judge2 = "5fd19900d27abe0d2f679eb3";

  useEffect(() => {
    if (userInfo) {
      dispatch(listCosplays());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const calFianl = (fbpoint, judge1point, judge2point) => {
    return (
      Math.round(
        (fbpoint * 0.05 +
          ((judge1point.score_expression +
            judge1point.score_creativity +
            judge1point.score_display +
            judge2point.score_expression +
            judge2point.score_creativity +
            judge2point.score_display) /
            2) *
            0.95) *
          100
      ) / 100
    );
  };

  return (
    <>
      <h1>第五人格Cos大賽報表</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col xs={3}>
            <h5>每日統計報表</h5>
            <DialyStatistics list={cosplays} />
          </Col>
          <Col xs={9}>
            <h5 className="text-info">得分表</h5>
            專業組
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th></th>
                  <th></th>

                  <th scope="col" colSpan="4">
                    評審1
                  </th>
                  <th scope="col" colSpan="4">
                    評審2
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="col">Coser暱稱</th>
                  <th scope="col">FB得分</th>
                  <td>角色</td>
                  <td>主題</td>
                  <td>畫面</td>
                  <td></td>
                  <td>角色</td>
                  <td>主題</td>
                  <td>畫面</td>
                  <td></td>
                  <th scope="col">總分</th>
                </tr>

                {scores_all
                  .filter((c) => c.status === "VERIFIED" && c.category === "PG")
                  .sort((a, b) => b.final - a.final)
                  .map((coser) => (
                    <tr>
                      <td className="text-light bg-dark">
                        {coser.nickname}

                        <a
                          className="text-light bg-dark ml-2"
                          target="_blank"
                          href={`https://www.resound.global/cosplay/showcase/${coser._id}`}
                          rel="noopener noreferrer"
                        >
                          <i className="far fa-images"></i>
                        </a>
                      </td>

                      <td>
                        {coser.fbpoint} <small>[{coser.fbvote} ]</small>{" "}
                      </td>

                      <JudgeScore score={coser.judge1_score} />
                      <JudgeScore score={coser.judge2_score} />
                      <td>{coser.final}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            創意組
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th></th>

                  <th></th>
                  <th scope="col" colSpan="4">
                    評審1
                  </th>
                  <th scope="col" colSpan="4">
                    評審2
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="col">Coser暱稱</th>

                  <th scope="col">FB得分</th>
                  <td>角色</td>
                  <td>主題</td>
                  <td>畫面</td>
                  <td></td>
                  <td>角色</td>
                  <td>主題</td>
                  <td>畫面</td>
                  <td></td>
                  <th scope="col">總分</th>
                </tr>

                {scores_all
                  .filter((c) => c.status === "VERIFIED" && c.category === "CG")
                  .sort((a, b) => b.final - a.final)
                  .map((coser) => (
                    <tr>
                      <td className="text-light bg-dark">
                        {coser.nickname}

                        <a
                          className="text-light bg-dark ml-2"
                          target="_blank"
                          href={`https://www.resound.global/cosplay/showcase/${coser._id}`}
                          rel="noopener noreferrer"
                        >
                          <i className="far fa-images"></i>
                        </a>
                      </td>

                      <td>
                        {coser.fbpoint} <small>[{coser.fbvote} ]</small>{" "}
                      </td>

                      <JudgeScore score={coser.judge1_score} />
                      <JudgeScore score={coser.judge2_score} />
                      <td>{coser.final}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </>
  );
};

export default H55CosplayReportScreen;

const JudgeScore = ({ score }) => {
  //console.log("judgeScore", score);
  const { score_expression, score_creativity, score_display } = score;

  return (
    <Fragment>
      <td>{score_expression}</td>
      <td>{score_creativity}</td>
      <td>{score_display}</td>
      <td>
        <strong>{score_expression + score_creativity + score_display}</strong>
      </td>
    </Fragment>
  );
};

const DialyStatistics = ({ list }) => {
  const alldate = [
    ...new Set(
      list.map((item) => DateTime.fromISO(item.createdAt).toLocaleString())
    ),
  ];

  const finalData = alldate.map((d) => {
    const dailyItems = list.filter(
      (item) => DateTime.fromISO(item.createdAt).toLocaleString() === d
    );
    const count1 = dailyItems.reduce(
      (prev, curr) => {
        // console.log(prev);
        // console.log(curr);
        return curr.category === "CG"
          ? { cg: prev.cg + 1, pg: prev.pg }
          : { pg: prev.pg + 1, cg: prev.cg };
      },
      { cg: 0, pg: 0 }
    );
    return { d, ...count1 };
  });

  const total = list.reduce(
    (prev, curr) => {
      return curr.category === "CG"
        ? {
            cg: prev.cg + 1,
            pg: prev.pg,
            cgv: curr.status === "VERIFIED" ? prev.cgv + 1 : prev.cgv,
            pgv: prev.pgv,
          }
        : {
            pg: prev.pg + 1,
            cg: prev.cg,
            pgv: curr.status === "VERIFIED" ? prev.pgv + 1 : prev.pgv,
            cgv: prev.cgv,
          };
    },
    { cg: 0, pg: 0, cgv: 0, pgv: 0 }
  );

  //console.log("total", total);

  //const statData = list.map((item) => item.category === "PG");
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th scope="col">日期</th>
          <th scope="col">專業組</th>
          <th scope="col">創意組</th>
        </tr>
      </thead>
      <tbody>
        {finalData.map((data) => (
          <tr>
            <td>{data.d}</td>
            <td>{data.pg}</td>
            <td>{data.cg}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>總計</td>
          <td>{total.pg}</td>
          <td>{total.cg}</td>
        </tr>
        <tr>
          <td>審核通過</td>
          <td>{total.pgv}</td>
          <td>{total.cgv}</td>
        </tr>
      </tfoot>
    </Table>
  );
};
