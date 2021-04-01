import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import { Table, Row, Col, Image, Button, Form, Badge } from "react-bootstrap";
import {
  listCategories,
  listChannels,
  listTags,
} from "../../actions/quotesActions";

import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginate from "../../components/Paginate";
import { socials, areaConfig } from "./quotesConfig";

const statusList = {
  1: { text: "追蹤中", color: "success" },
  2: { text: "暫停追蹤", color: "secondary" },
};

const QuotesKOLHomeScreen = ({ history, match }) => {
  const tagId = match.params.tagid;
  const [searchKeyword, setSearchKeyWord] = useState("");
  const [status, setStatus] = useState("");
  const [renderList, setRenderList] = useState([]);
  const dispatch = useDispatch();
  const channelList = useSelector((state) => state.channelList);
  const { loading, error, channels = [] } = channelList;
  const serviceCategoriesList = useSelector((state) => state.serviceCategories);
  const { serviceCategories } = serviceCategoriesList;

  const tagsList = useSelector((state) => state.tagsList);
  const { loading: tagsLoading, tags } = tagsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //const [show, setShow] = useState(false);

  const pageSize = 20;
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (userInfo) {
      dispatch(listCategories());
      dispatch(listChannels(tagId));
      dispatch(listTags());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  useEffect(() => {
    if (userInfo) {
      dispatch(listChannels(tagId));
      const tmpT = tags.filter((t) => t._id === tagId)[0];
      if (tmpT) {
        setTitle("標籤含有[" + tmpT.name + "]的");
      }
    } else {
      history.push("/login");
    }
  }, [tagId]);

  useEffect(() => {
    const { channels } = channelList;

    if (Array.isArray(channels) && channels.length > 0) {
      setPages(Math.ceil(channels.length / pageSize));
      setRenderList(channels);
    }
  }, [channelList]);

  const haltHandler = (mentor_id, mentor_title) => {
    window.confirm(`要暫時停止追蹤[${mentor_title}]這個頻道嗎? `);
  };

  const search = () => {
    let filteredarray = channels;
    if (searchKeyword !== "") {
      filteredarray = filteredarray.filter(
        (item) => item.title.indexOf(searchKeyword) > -1
      );
    }
    if (status !== "") {
      filteredarray = filteredarray.filter((item) => item.status === status);
    }

    // console.log("filteredarray", filteredarray);

    setRenderList(filteredarray);
  };

  return (
    <>
      <h1>{title}頻道列表</h1>
      {loading || tagsLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {title === "" ? (
            <LinkContainer to={`/quotes/kol/create`} className="my-3">
              <Button size="sm">新增頻道</Button>
            </LinkContainer>
          ) : (
            <Link to="/quotes/kol/list" className="btn btn-light my-3">
              回列表
            </Link>
          )}

          <Row>
            <Col>
              <Form className="mb-3">
                <Form.Row className="align-items-center">
                  <Col xs="auto">
                    <Form.Control
                      as="select"
                      custom
                      onChange={(e) => setStatus(e.target.value)}
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
                </Form.Row>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Paginate pages={pages} page={page} setPage={(p) => setPage(p)} />
            </Col>
            <Col>
              共 {renderList.length} 筆資料, 顯示 {(page - 1) * pageSize + 1}~{" "}
              {(page - 1) * pageSize + pageSize < renderList.length
                ? (page - 1) * pageSize + pageSize
                : renderList.length}
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
                    <th>標籤</th>
                    <th>簡介</th>
                    <th>區域</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {renderList
                    .slice(
                      (page - 1) * pageSize,
                      (page - 1) * pageSize + pageSize
                    )
                    .map((channel) => (
                      <tr key={channel._id}>
                        <td>
                          <Link to={`/quotes/kol/${channel._id}/view`}>
                            {channel.thumbnails ? (
                              <Image
                                src={channel.thumbnails}
                                roundedCircle
                                style={{ width: "50px" }}
                              />
                            ) : (
                              <i className="fas fa-user-alt"></i>
                            )}

                            <span className="ml-2">{channel.title}</span>
                          </Link>
                        </td>
                        <td>
                          {channel.socials &&
                            Object.keys(channel.socials).map((key) =>
                              channel.socials[key] !== "" &&
                              channel.socials[key] !== null ? (
                                <span key={`span-${key}`}>
                                  <a
                                    target="_blank"
                                    href={
                                      socials.filter((s) => s.id === key)[0]
                                        .url + channel.socials[key]
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
                        <td>
                          {channel.tags.map((t) => {
                            const text = tags.filter((tag) => tag._id === t)[0]
                              .name;
                            return (
                              <Link to={`/quotes/kol/${t}/tag`}>
                                <Badge variant="info" className="m-1">
                                  {text}
                                </Badge>
                              </Link>
                            );
                          })}
                        </td>
                        <td title={channel.intro}>
                          <pre>{channel.intro?.substring(0, 20)}</pre>
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
