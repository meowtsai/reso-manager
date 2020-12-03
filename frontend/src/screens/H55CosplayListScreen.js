import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Row, Col, Card, Form, Button } from "react-bootstrap";
import { DateTime } from "luxon";
import { listCosplays } from "../actions/h55eventActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const imgContainerStyle = {
  display: "flex",
  position: "relative",
  width: "352px",
  height: "230px",
  border: "1px solid rgba(123, 233, 255, 0.2)",
};

const H55CosplayListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyWord] = useState("");

  const cosplayList = useSelector((state) => state.cosplayList);
  const { loading, error, cosplays } = cosplayList;

  const [renderList, setRenderList] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listCosplays());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  useEffect(() => {
    if (Array.isArray(cosplays) && cosplays.length > 0) {
      setRenderList(cosplays);
    }
  }, [cosplays]);

  const search = () => {
    // const filteredarray = cosplays.filter(
    //   (item) =>
    //     item.nickname.indexOf(searchKeyword) > -1 ||
    //     item.work_subject.indexOf(searchKeyword) > -1
    // );
    // console.log("filteredarray", filteredarray);

    setRenderList(
      searchKeyword === ""
        ? cosplays
        : cosplays.filter(
            (item) =>
              item.nickname.indexOf(searchKeyword) > -1 ||
              item.work_subject.indexOf(searchKeyword) > -1
          )
    );
  };

  return (
    <>
      <h1>第五人格Cos大賽參賽者列表</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col xs={12}>
            <Form className="mb-3">
              <Form.Row className="align-items-center">
                <Col xs="auto">
                  <Form.Control
                    placeholder="搜尋"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyWord(e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button type="button" onClick={search}>
                    OK
                  </Button>
                </Col>
              </Form.Row>
            </Form>
            {renderList.map((item) => (
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
        </Row>
      )}
    </>
  );
};

export default H55CosplayListScreen;

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
        <Card.Text className="font-13" style={{ whiteSpace: "pre-wrap" }}>
          {item.work_desc}
        </Card.Text>
        <i className="far fa-images"></i>作品:
        {item.imgs.map((img, index) => (
          <Card.Link
            target="_blank"
            key={`img-${item._id}_${index}`}
            href={img}
          >
            {" "}
            {index + 1}
          </Card.Link>
        ))}
      </Card.Body>
      <Card.Footer className="text-muted">
        <i className="fas fa-globe"></i>網站:
        <Card.Link
          target="_blank"
          href={`https://www.resound.global/cosplay/showcase/${item._id}`}
        >
          站上觀看
        </Card.Link>
      </Card.Footer>
    </Card>
  );
};
