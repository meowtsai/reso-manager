import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import { Table, Row, Col, Image, Button, Modal } from "react-bootstrap";
import { listKols } from "../actions/kolActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import LineChart from "../components/LineChart";
import Paginate from "../components/Paginate";

const KolListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const kolList = useSelector((state) => state.kolList);
  const { loading, error, kols = [], KolTrackingLogYesterday = [] } = kolList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //const [show, setShow] = useState(false);
  const [showLog, setShowLog] = useState({ show: false, logs: [], kol: {} });
  const pageSize = 20;
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    if (userInfo) {
      dispatch(listKols());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  useEffect(() => {
    const { kols } = kolList;

    if (kols && kols.length > 0) {
      setPages(Math.ceil(kols.length / pageSize));
    }
  }, [kolList]);

  const showModal = (kol, logs) => {
    //console.log("hi");
    setShowLog({ show: true, logs, kol });
  };
  const handleClose = () => {
    //console.log("hi");
    setShowLog({ show: false, logs: [], kol: {} });
  };

  return (
    <>
      <h1>KOL 列表</h1>
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
              共 {kols.length} 筆資料, 顯示 {(page - 1) * pageSize + 1}~{" "}
              {(page - 1) * pageSize + pageSize < kols.length
                ? (page - 1) * pageSize + pageSize
                : kols.length}
              筆
            </Col>

            <Col></Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>KOL</th>
                    <th>創立日期</th>
                    <th>訂閱人數</th>
                    <th>影片總數</th>
                    <th>觀看總數</th>
                    <th>最後更新時間</th>
                    <th>log</th>
                  </tr>
                </thead>
                <tbody>
                  {kols
                    .slice(
                      (page - 1) * pageSize,
                      (page - 1) * pageSize + pageSize
                    )
                    .map((kol) => (
                      <tr key={kol._id}>
                        <td>
                          <Image
                            src={kol.thumbnails}
                            roundedCircle
                            style={{ width: "50px" }}
                          />
                          <span className="ml-2"> {kol.title} </span>
                        </td>
                        <td>
                          {DateTime.fromISO(kol.published_at).toLocaleString(
                            DateTime.DATETIME_MED
                          )}
                          <ShowDuration pastDate={kol.published_at} />
                        </td>
                        <td>{kol.subscriber_count?.toLocaleString()}</td>
                        <td>{kol.video_count?.toLocaleString()}</td>
                        <td>{kol.view_count?.toLocaleString()}</td>
                        <td>
                          {DateTime.fromISO(kol.updatedAt).toLocaleString(
                            DateTime.DATETIME_MED
                          )}
                        </td>
                        <td>
                          <Button
                            onClick={() =>
                              showModal(
                                kol,
                                KolTrackingLogYesterday.filter(
                                  (log) => log.channel_id === kol.channel_id
                                )
                              )
                            }
                          >
                            {" "}
                            <i className="fas fa-chart-line"></i>{" "}
                          </Button>

                          {/* {KolTrackingLogYesterday.filter(
                        (log) => log.channel_id === kol.channel_id
                      ).map((log) => (
                        <div>
                          {log.subscriber_count} <small>{log.date}</small>
                        </div>
                      ))} */}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </>
      )}
      <Modal show={showLog.show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>{showLog.kol.title}</strong> 的資料趨勢圖
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LogDisplaySection logs={showLog.logs} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
      ;
    </>
  );
};

export default KolListScreen;

const ShowDuration = ({ pastDate }) => {
  const curDate = DateTime.fromISO(new Date().toISOString());
  const Date2 = DateTime.fromISO(pastDate);

  const durObject = curDate.diff(Date2, ["years", "months"]).toObject();

  return (
    <div className="text-muted small">
      {" "}
      ＊ 已經創立 {durObject.years} 年又 {parseInt(durObject.months)} 個月
    </div>
  );
};

const LogDisplaySection = ({ logs }) => {
  //console.log(typeof logs);

  return (
    <>
      {" "}
      <LineChart
        label="訂閱數"
        backgroundColor="blue"
        borderColor="skyblue"
        data1={logs.map((log) => log.date.substring(0, 10))}
        data2={logs.map((log) => log?.subscriber_count)}
      />
      <hr />
      <LineChart
        label="觀看數"
        backgroundColor="red"
        borderColor="pink"
        data1={logs.map((log) => log.date.substring(0, 10))}
        data2={logs.map((log) => log?.view_count)}
      />
      <hr />
      <LineChart
        label="影片數"
        backgroundColor="brown"
        borderColor="yellow"
        data1={logs.map((log) => log.date.substring(0, 10))}
        data2={logs.map((log) => log?.video_count)}
      />
    </>
  );
};
