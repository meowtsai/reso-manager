import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  Spinner,
} from "react-bootstrap";
import { DateTime } from "luxon";
import { listCosplays, updateApplyById } from "../actions/h55eventActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const imgContainerStyle = {
  display: "flex",
  position: "relative",
  width: "352px",
  height: "230px",
  border: "1px solid rgba(123, 233, 255, 0.2)",
};
//enum: ["SUBMITTED", "VERIFIED", "DISQUALIFIED"],
const statusList = {
  SUBMITTED: { text: "待審核", color: "secondary" },
  VERIFIED: { text: "已通過", color: "success" },
  DISQUALIFIED: { text: "未通過", color: "danger" },
};

const H55CosplayListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyWord] = useState("");
  const [coserStatus, setCoserStatus] = useState("");
  const [category, setCategory] = useState("");

  const cosplayList = useSelector((state) => state.cosplayList);
  const { loading, error, cosplays, updateLoading } = cosplayList;

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
    let filteredarray = cosplays;
    if (searchKeyword !== "") {
      filteredarray = filteredarray.filter(
        (item) =>
          item.nickname.indexOf(searchKeyword) > -1 ||
          item.work_subject.indexOf(searchKeyword) > -1 ||
          item.coser_name.indexOf(searchKeyword) > -1 ||
          item.coser_email.indexOf(searchKeyword) > -1 ||
          item.coser_phone.indexOf(searchKeyword) > -1
      );
    }
    if (coserStatus !== "") {
      filteredarray = filteredarray.filter(
        (item) => item.status === coserStatus
      );
    }

    if (category !== "") {
      filteredarray = filteredarray.filter(
        (item) => item.category === category
      );
    }

    // console.log("filteredarray", filteredarray);

    setRenderList(filteredarray);
  };

  const onStatusChange = ({ _id, status }) => {
    console.log("onStatusChange", { _id, status });
    dispatch(updateApplyById({ _id, status }));
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
                    as="select"
                    custom
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">所有</option>
                    <option value="PG">專業組</option>
                    <option value="CG">創意組</option>
                  </Form.Control>
                </Col>
                <Col xs="auto">
                  <Form.Control
                    as="select"
                    custom
                    onChange={(e) => setCoserStatus(e.target.value)}
                  >
                    <option value="">所有</option>
                    {Object.keys(statusList).map((skey) => (
                      <option value={skey}>{statusList[skey].text}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col xs="auto">
                  <Form.Control
                    placeholder="關鍵字搜尋"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyWord(e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button type="button" onClick={search}>
                    OK
                  </Button>
                </Col>
                <Col xs="auto">共{renderList.length}筆</Col>
              </Form.Row>
            </Form>
            {renderList.map((item) => (
              <Row key={item._id} className="mt-2">
                <Col xs={5}>
                  <CoserDisplay
                    item={item}
                    verifyAction={({ _id, status }) =>
                      onStatusChange({ _id, status })
                    }
                    updateLoading={updateLoading}
                  />
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

const CoserDisplay = ({ item, verifyAction, updateLoading }) => {
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

      <p className="text-dark">
        <strong>狀態</strong>

        <Badge variant={statusList[item.status].color} className="ml-2">
          {statusList[item.status].text}
        </Badge>
      </p>
      <hr />
      {updateLoading === true ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : item.status === "SUBMITTED" ? (
        <p className="text-dark">
          <strong>資格審核</strong>
          <Button
            variant="success"
            className="ml-2"
            onClick={() => verifyAction({ _id: item._id, status: "VERIFIED" })}
          >
            {" "}
            <i className="fas fa-check"></i> 通過
          </Button>
          <Button
            variant="danger"
            className="ml-2"
            onClick={() =>
              verifyAction({ _id: item._id, status: "DISQUALIFIED" })
            }
          >
            {" "}
            <i className="fas fa-times"></i>未通過
          </Button>
        </p>
      ) : (
        <p className="text-dark">
          <strong>資格</strong>
          <Button
            variant="warning"
            className="ml-2"
            onClick={() => verifyAction({ _id: item._id, status: "SUBMITTED" })}
          >
            {" "}
            <i className="fas fa-undo"></i>
            重置為待審核狀態
          </Button>
        </p>
      )}
    </div>
  );
};

const WorkDisplay = ({ item }) => {
  return (
    <Card border={statusList[item.status].color} className="mb-1">
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
          前往觀看
        </Card.Link>
      </Card.Footer>
    </Card>
  );
};
