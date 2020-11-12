import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Row, Col, Card } from "react-bootstrap";
import { DateTime } from "luxon";
import { listCosplays } from "../actions/h55eventActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const imgContainerStyle = {
  display: "flex",
  position: "relative",

  height: "187px",
  border: "1px solid rgba(123, 233, 255, 0.2)",
  maxWidth: "100%",
};

const H55CosplayListScreen = ({ history }) => {
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
      <h1>第五人格Cos大賽參賽者列表</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col xs={9}>
            {cosplays.map((item) => (
              <Row key={item._id} className="mt-2">
                <Col xs={5}>
                  <CoserDisplay item={item} />
                </Col>
                <Col>
                  <WorkDisplay item={item} />
                </Col>
                <hr />
              </Row>
            ))}
          </Col>
          <Col>
            <h5>每日統計報表</h5>
            <DialyStatistics list={cosplays} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default H55CosplayListScreen;

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
  console.log("finalData", finalData);

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
    </Table>
  );
};

const CoserDisplay = ({ item }) => {
  return (
    <div className="text-left mt-3">
      <p className="text-dark">
        <strong>id</strong>
        <span className="ml-2">{item._id.substring(item._id.length - 6)}</span>
      </p>
      <p className="text-dark">
        <strong>組別</strong>
        <span className="ml-2">
          {item.category === "PG" ? "專業組" : "創意組"}
        </span>
      </p>
      <p className="text-dark">
        <strong>姓名</strong>
        <span className="ml-2">{item.coser_name}</span>
      </p>
      <p className="text-dark">
        <strong>手機號碼</strong>
        <span className="ml-2">{item.coser_phone}</span>
      </p>
      <p className="text-dark">
        <strong>E-mail</strong>
        <span className="ml-2">{item.coser_email}</span>
      </p>
      <p className="text-dark">
        <strong>報名時間</strong>
        <span className="ml-2">
          {" "}
          {DateTime.fromISO(item.createdAt).toLocaleString(
            DateTime.DATETIME_MED
          )}
        </span>
      </p>
    </div>
  );
};

const WorkDisplay = ({ item }) => {
  return (
    <Card border="primary" className="mb-1">
      <Card.Header> {item.nickname} </Card.Header>
      <div style={imgContainerStyle}>
        <div style={{ display: "flex", minWidth: "0px", overflow: "hidden" }}>
          <a href={item.cover_img} target="_blank">
            <Card.Img
              variant="top"
              src={item.cover_img}
              style={{ margin: "auto", maxWidth: "100%" }}
            />
          </a>
        </div>
      </div>
      <Card.Body>
        <Card.Title>{item.work_subject}</Card.Title>
        <Card.Text className="font-13" style={{ whiteSpace: "pre" }}>
          {item.work_desc}
        </Card.Text>
        <i className="far fa-images"></i>作品:
        {item.imgs.map((img, index) => (
          <Card.Link key={`img-${item._id}_${index}`} href={img}>
            {" "}
            {index + 1}
          </Card.Link>
        ))}
      </Card.Body>
    </Card>
  );
};
