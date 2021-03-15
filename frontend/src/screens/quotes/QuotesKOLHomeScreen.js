import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import { Table, Row, Col, Image, Button, Modal } from "react-bootstrap";
import { listCategories, listChannels } from "../../actions/quotesActions";

import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginate from "../../components/Paginate";
import { socials, areaConfig } from "./quotesConfig";

const QuotesKOLHomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const channelList = useSelector((state) => state.channelList);
  const { loading, error, channels = [] } = channelList;
  const serviceCategoriesList = useSelector((state) => state.serviceCategories);
  const { serviceCategories } = serviceCategoriesList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //const [show, setShow] = useState(false);

  const pageSize = 20;
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    if (userInfo) {
      dispatch(listCategories());
      dispatch(listChannels());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  useEffect(() => {
    const { channels } = channelList;

    if (channelList && channelList.length > 0) {
      setPages(Math.ceil(channelList.length / pageSize));
    }
  }, [channelList]);

  const haltHandler = (mentor_id, mentor_title) => {
    window.confirm(`要暫時停止追蹤[${mentor_title}]這個頻道嗎? `);
  };

  return (
    <>
      <h1>頻道列表</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <LinkContainer to={`/quotes/kol/create`}>
            <Button size="sm">新增頻道</Button>
          </LinkContainer>
          <Row>
            <Col>
              <Paginate pages={pages} page={page} setPage={(p) => setPage(p)} />
            </Col>
            <Col>
              共 {channels.length} 筆資料, 顯示 {(page - 1) * pageSize + 1}~{" "}
              {(page - 1) * pageSize + pageSize < channels.length
                ? (page - 1) * pageSize + pageSize
                : channels.length}
              筆
            </Col>

            <Col></Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>頻道名稱</th>
                    <th>社交平台</th>
                    <th>類型</th>
                    <th>簡介</th>
                    <th>區域</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {channels
                    .slice(
                      (page - 1) * pageSize,
                      (page - 1) * pageSize + pageSize
                    )
                    .map((channel) => (
                      <tr key={channel._id}>
                        <td>
                          <Link to={`/quotes/kol/${channel._id}/view`}>
                            {" "}
                            {channel.title}
                          </Link>
                        </td>
                        <td>
                          {Object.keys(channel.socials).map((key) =>
                            channel.socials[key] !== "" ? (
                              <span key={`span-${key}`}>
                                <a
                                  target="_blank"
                                  href={
                                    socials.filter((s) => s.id === key)[0].url +
                                    channel.socials[key]
                                  }
                                >
                                  <i
                                    className={`fab fa-${key} mr-2 text-dark`}
                                  ></i>
                                </a>
                              </span>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                        <td>
                          {channel.categories.map(
                            (c) =>
                              serviceCategories.filter((s) => s.key === c)[0]
                                .cht
                          )}
                        </td>
                        <td title={channel.intro}>
                          <pre>{channel.intro.substring(0, 20)}</pre>
                        </td>
                        <td>
                          {
                            areaConfig.filter((a) => a.id === channel.area)[0]
                              .text
                          }
                        </td>
                        <td>
                          <LinkContainer to={`/quotes/kol/${channel._id}/edit`}>
                            <Button
                              variant="primary"
                              className="btn-sm"
                              size="sm"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </LinkContainer>
                          <Button
                            variant="warning"
                            className="btn-sm ml-2"
                            size="sm"
                            onClick={() =>
                              haltHandler(channel._id, channel.title)
                            }
                          >
                            <i className="fas fa-ban"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default QuotesKOLHomeScreen;

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

//service.noxinfluencer.com/nox/youtube/v1/channel/profile?noxKey=NOXKOLSar2JuqJC9GET9XXZ0RjDWekDg5b&channelId=UCwDBDW_zegBNl9BAWI3tyjw
