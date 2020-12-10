import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Row, Col, Form, Button, Badge, Spinner } from "react-bootstrap";

import { listCosplays, updateScoreById } from "../actions/h55eventActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { checkPermissions } from "../helpers/utils";
const imgContainerStyle = {
  display: "grid",
  position: "relative",
  width: "352px",
  height: "230px",
  border: "1px solid rgba(123, 233, 255, 0.2)",
};

const H55CosplayJudgeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyWord] = useState("");
  const [coserStatus, setCoserStatus] = useState("VERIFIED");
  const [category, setCategory] = useState("");
  const [editCoserId, setEditCoserId] = useState(null);

  const cosplayList = useSelector((state) => state.cosplayList);
  const {
    loading,
    error,
    cosplays,
    updateLoading,
    scores,
    scoreUpdateSuccess,
  } = cosplayList;

  const [renderList, setRenderList] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (scoreUpdateSuccess && scoreUpdateSuccess === true) {
      setEditCoserId(null);
    }
  }, [scoreUpdateSuccess]);

  useEffect(() => {
    if (userInfo) {
      dispatch(listCosplays());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  useEffect(() => {
    if (Array.isArray(cosplays) && cosplays.length > 0) {
      setRenderList(cosplays.filter((c) => c.status === "VERIFIED"));
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

  const updateScore = (scores, action) => {
    const { score_expression, score_creativity, score_display } = scores;

    if (
      Number.isNaN(score_expression) ||
      Number.isNaN(score_creativity) ||
      Number.isNaN(score_display)
    ) {
      window.alert("請輸入各項分數, 必須為數值");
      return;
    } else {
      dispatch(updateScoreById({ ...scores, coser_id: editCoserId }, action));
    }
  };

  return (
    <>
      <h1>第五人格Cos大賽評分列表</h1>
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

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>作品標題/敘述</th>
                  <th>作品封面圖</th>
                  <th>評分</th>
                </tr>
              </thead>
              <tbody>
                {renderList.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <h5> {item.work_subject} </h5>
                      <small>
                        <strong>編號</strong>
                        <span className="ml-2">
                          {item._id.substring(item._id.length - 6)}
                        </span>{" "}
                      </small>

                      <small>
                        <strong>暱稱</strong>
                        <span className="ml-2">{item.nickname}</span>
                      </small>
                      <br />
                      <hr width="70%" className="ml-0" />

                      <div
                        className="font-11 mb-5"
                        style={{
                          whiteSpace: "pre-wrap",

                          width: "500px",
                        }}
                      >
                        {" "}
                        {item.work_desc}{" "}
                      </div>
                    </td>

                    <td>
                      <div style={imgContainerStyle}>
                        <img
                          src={item.cover_img}
                          alt={item.nickname}
                          style={{
                            margin: "0 0 auto 15",
                            maxHeight: "230px",
                            maxWidth: "100%",
                          }}
                        />
                      </div>

                      <div className="mt-2 mb-2">
                        <i className="fas fa-globe"></i>網站:
                        <a
                          target="_blank"
                          href={`https://www.resound.global/cosplay/showcase/${item._id}`}
                          rel="noopener noreferrer"
                        >
                          前往觀看所有作品
                        </a>
                      </div>
                    </td>
                    <td>
                      {userInfo &&
                      checkPermissions(
                        userInfo.permissions,
                        "cosplay",
                        "judge"
                      ) ? (
                        <ScoringSection
                          updateLoading={updateLoading}
                          data={scores.filter(
                            (score) => score.coser === item._id
                          )}
                          editMode={editCoserId === item._id ? true : false}
                          beginScoring={(cmd) =>
                            cmd === true
                              ? setEditCoserId(item._id)
                              : setEditCoserId(null)
                          }
                          updateScore={(scores, action) =>
                            updateScore(scores, action)
                          }
                        />
                      ) : (
                        <Badge variant="danger">NA</Badge>
                      )}
                    </td>
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

export default H55CosplayJudgeScreen;

const ScoringSection = ({
  editMode,
  data = [],
  beginScoring,
  updateScore,
  updateLoading,
}) => {
  //if no data & editMode=false return only btn
  const { score_expression, score_creativity, score_display } =
    data.length > 0 ? data[0] : {};
  const [scoreInput, setScoreInput] = useState({
    score_expression,
    score_creativity,
    score_display,
  });

  function submitScore() {
    //window.alert("請輸入各項分數, 必須為數值");
    const { score_expression, score_creativity, score_display } = scoreInput;
    //console.log("submitScore scoreInput", scoreInput);

    if (!score_expression || !score_creativity || !score_display) {
      window.alert("請輸入各項分數, 必須為數值");
      return;
    }

    if (
      Number.isNaN(score_expression) ||
      score_expression > 40 ||
      Number.isNaN(score_creativity) ||
      score_creativity > 35 ||
      Number.isNaN(score_display) ||
      score_display > 20
    ) {
      window.alert("請輸入各項分數, 必須為數值, 且必須在規定的數值範圍");
      return;
    }

    if (data.length > 0) {
      updateScore({ record_id: data[0]._id, ...scoreInput }, "update");
    } else {
      updateScore(scoreInput, "add");
    }
  }

  if (editMode === false && data.length === 0) {
    return (
      <Button onClick={() => beginScoring(true)}>
        {" "}
        <i className="fas fa-edit"></i> 開始評分 >>
      </Button>
    );
  }

  if (editMode === true) {
    if (updateLoading === true) {
      return <Spinner />;
    }
    return (
      <Form.Group>
        <Form.Control
          size="sm"
          type="number"
          placeholder="角色表現 ? /40"
          required
          max="40"
          value={scoreInput?.score_expression}
          onChange={(e) =>
            setScoreInput({
              ...scoreInput,
              score_expression: Number.parseInt(e.target.value),
            })
          }
        />
        <Form.Text className="text-muted">角色表現 ? /40</Form.Text>
        <Form.Control
          size="sm"
          type="number"
          placeholder="主題創意 ? /35"
          required
          max="35"
          value={scoreInput?.score_creativity}
          onChange={(e) =>
            setScoreInput({
              ...scoreInput,
              score_creativity: Number.parseInt(e.target.value),
            })
          }
        />
        <Form.Text className="text-muted">主題創意 ? /35</Form.Text>
        <Form.Control
          size="sm"
          type="number"
          required
          placeholder="畫面呈現 ? /20"
          max="20"
          value={scoreInput?.score_display}
          onChange={(e) =>
            setScoreInput({
              ...scoreInput,
              score_display: Number.parseInt(e.target.value),
            })
          }
        />
        <Form.Text className="text-muted">畫面呈現 ? /20</Form.Text>
        <Form.Control
          size="sm"
          type="number"
          placeholder="評分總計"
          readOnly
          value={
            Number.parseInt(scoreInput?.score_expression) +
            Number.parseInt(scoreInput?.score_creativity) +
            Number.parseInt(scoreInput?.score_display)
          }
        />

        <Button variant="primary" onClick={submitScore} className="mt-2">
          送出
        </Button>
        <Button
          variant="secondary"
          onClick={() => beginScoring(false)}
          className="mt-2"
        >
          取消
        </Button>
      </Form.Group>
    );
  }

  if (editMode === false && data.length > 0) {
    return (
      <div>
        角色表現: {score_expression} <br />
        主題創意: {score_creativity} <br />
        畫面呈現: {score_display} <br />
        評分總計: {score_expression + score_creativity + score_display} <br />
        <Button variant="outline-secondary" onClick={() => beginScoring(true)}>
          {" "}
          <i className="fas fa-edit"></i> 修改評分 >>
        </Button>{" "}
      </div>
    );
  }
};
