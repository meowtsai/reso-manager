import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Row, Col } from "react-bootstrap";
import { DateTime } from "luxon";
import { listCosplays } from "../actions/h55eventActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const H55CosplayReportScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cosplayList = useSelector((state) => state.cosplayList);
  const { loading, error, cosplays } = cosplayList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listCosplays());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h1>第五人格Cos大賽報表</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col xs={6}>
            <h5>每日統計報表</h5>
            <DialyStatistics list={cosplays} />
          </Col>
          <Col xs={6}></Col>
        </Row>
      )}
    </>
  );
};

export default H55CosplayReportScreen;

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
        ? { cg: prev.cg + 1, pg: prev.pg }
        : { pg: prev.pg + 1, cg: prev.cg };
    },
    { cg: 0, pg: 0 }
  );

  console.log("total", total);

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
      </tfoot>
    </Table>
  );
};
