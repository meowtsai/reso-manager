import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Row,
  Col,
  Button,
  Card,
  Badge,
  Image,
  ListGroup,
  Alert,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { DateTime } from "luxon";
import {
  listCategories,
  getChannelDetail,
  listQuoteItems,
  createQuote,
  listQuotesByCondition,
  updateQuote,
  deleteQuote,
  createChannelTags,
  listTags,
  createSocialData,
  listSocialDataByCondition,
  updateSocialData,
  deleteSocialData,
} from "../../actions/quotesActions";
import { socials as socialsConfig, areaConfig } from "./quotesConfig";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Avatar from "../../components/Avatar";
import QuoteCreateModal from "./QuoteCreateModal";
import QuoteEditModal from "./QuoteEditModal";
import TagManageModal from "./TagManageModal";
import SocialDataCreateModal from "./SocialDataCreateModal";
import SocialDataEditModal from "./SocialDataEditModal";

const KOLDetailPageScreen = ({ history, match }) => {
  const channelId = match.params.id;
  const dispatch = useDispatch();

  const channelDetail = useSelector((state) => state.channelDetails);
  const { loading, error, channel } = channelDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const serviceCategoriesList = useSelector((state) => state.serviceCategories);
  const {
    loading: serviceCategoriesLoading,
    serviceCategories,
  } = serviceCategoriesList;

  const quotesList = useSelector((state) => state.quotesList);
  const { loading: quotesLoading, error: quotesError, quotes } = quotesList;

  const quoteItemsList = useSelector((state) => state.quoteItemsList);
  const { loading: quoteItemsLoading, quoteItems } = quoteItemsList;

  const quoteCreate = useSelector((state) => state.quoteCreate);
  const {
    loading: quoteCreateLoading,
    quote,
    error: quoteCreateError,
    success: createSuccess,
  } = quoteCreate;

  const quoteUpdate = useSelector((state) => state.quoteUpdate);
  const { loading: quoteUpdateLoading, success: updateSuccess } = quoteUpdate;

  const quoteDelete = useSelector((state) => state.quoteDelete);
  const { loading: deleteLoading, success: deleteSuccess } = quoteDelete;

  const channelTagsCreate = useSelector((state) => state.channelTagsCreate);
  const {
    tags: channelTagsCreateTags,
    success: channelTagsCreateSuccess,
  } = channelTagsCreate;

  const socialDataCreate = useSelector((state) => state.socialDataCreate);
  const {
    error: socialDataCreateError,
    socialData: socialData,
    success: socialDataCreateSuccess,
  } = socialDataCreate;

  const socialDataList = useSelector((state) => state.socialDataList);
  const {
    loading: socialDataLoading,
    error: socialDataError,
    socialDataList: socialDataRecords,
  } = socialDataList;

  const socialDataUpdate = useSelector((state) => state.socialDataUpdate);
  const {
    error: socialDataEditError,
    loading: socialDataUpdateLoading,
    success: socialDataUpdateSuccess,
  } = socialDataUpdate;

  const socialDataDelete = useSelector((state) => state.socialDataDelete);
  const {
    error: socialDataDeleteError,
    loading: socialDataDeleteLoading,
    success: socialDataDeleteSuccess,
  } = socialDataDelete;

  const tagsList = useSelector((state) => state.tagsList);
  const { tags: allTags } = tagsList;

  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [showSocialCreateModal, setShowSocialCreateModal] = useState(false);
  const [showSocialEditModal, setShowSocialEditModal] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState({});
  const [selectedSocialDataRecord, setSelectedSocialDataRecord] = useState({});

  const handleCreateItem = (data) => {
    dispatch(createQuote(data));
  };

  const handleCreateSocial = (data) => {
    dispatch(createSocialData(data));
  };

  const handleEditSocial = (data) => {
    //console.log("handleEditSocial", data);
    dispatch(updateSocialData(data));
  };
  const handleDeleteSocial = (id) => {
    if (window.confirm("您確定要刪除這筆紀錄嗎? 沒有備分喔!")) {
      dispatch(deleteSocialData(id));
    }
  };

  const handleEditItem = (data) => {
    dispatch(updateQuote(data));
  };

  const handleDeleteItem = (id) => {
    if (window.confirm("您確定要刪除這筆紀錄嗎? 沒有備分喔!")) {
      dispatch(deleteQuote(id));
    }
  };

  const handleSubmitTags = (tags) => {
    const data = { channelId, tags };
    dispatch(createChannelTags(data));
  };

  useEffect(() => {
    if (!channel.title || channel._id !== channelId) {
      dispatch(listCategories());
      dispatch(listQuoteItems());
      dispatch(listTags());
      dispatch(listQuotesByCondition({ channel: channelId }));
      dispatch(listSocialDataByCondition({ channel: channelId }));
      dispatch(getChannelDetail(channelId));
    }
  }, [dispatch, history, channelId, channel]);

  useEffect(() => {
    if (createSuccess || updateSuccess || deleteSuccess) {
      dispatch(listQuotesByCondition({ channel: channelId }));
      //setShow(false);
      setShowEditModal(false);
    }
  }, [createSuccess, updateSuccess, deleteSuccess]);
  useEffect(() => {
    if (
      socialDataCreateSuccess ||
      socialDataUpdateSuccess ||
      socialDataDeleteSuccess
    ) {
      setShowSocialCreateModal(false);
      setShowSocialEditModal(false);
      dispatch(listSocialDataByCondition({ channel: channelId }));
    }
  }, [
    socialDataCreateSuccess,
    socialDataUpdateSuccess,
    socialDataDeleteSuccess,
  ]);

  useEffect(() => {
    if (channelTagsCreateSuccess) {
      setShowTagModal(false);
      dispatch(getChannelDetail(channelId));
    }
  }, [channelTagsCreateSuccess]);

  if (!channel.title || channel._id !== channelId) {
    return <Loader />;
  }

  return (
    <>
      <h1>頻道資料</h1>
      {loading || quoteItemsLoading || serviceCategoriesLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Link to="/quotes/kol/list" className="btn btn-light my-3">
            回列表
          </Link>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Row>
                    <Col xm={6}>
                      <div className="text-left">
                        <p>
                          <Avatar thumbnails={channel.thumbnails} />
                        </p>
                        <p>
                          <strong>頻道名稱</strong>{" "}
                          <span className="ml-2">{channel.title}</span>
                        </p>

                        <p>
                          <strong>社交平台</strong>{" "}
                          <span className="ml-2">
                            {Object.keys(channel.socials).map((key) =>
                              channel.socials[key] !== "" &&
                              channel.socials[key] !== null ? (
                                <span key={`span-${key}`}>
                                  <a
                                    target="_blank"
                                    href={
                                      socialsConfig.filter(
                                        (s) => s.id === key
                                      )[0].url + channel.socials[key]
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
                          </span>
                        </p>
                        <p>
                          <strong>地區</strong>{" "}
                          <span className="ml-2">
                            {" "}
                            {
                              areaConfig.filter((a) => a.id === channel.area)[0]
                                .text
                            }
                          </span>
                        </p>
                        <p>
                          <strong>類型</strong>{" "}
                          <span className="ml-2">
                            {channel.categories.map(
                              (c) =>
                                serviceCategories.filter((s) => s.key === c)[0]
                                  .cht
                            )}
                          </span>
                        </p>
                        <p>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setShowTagModal(true)}
                          >
                            管理標籤 +
                          </Button>
                          {channel.textTags.map((t) => (
                            <Badge variant="info" className="ml-2">
                              {t.name}{" "}
                            </Badge>
                          ))}
                        </p>
                      </div>
                    </Col>
                    <Col xm={5}>
                      <h5 className="mt-0 mb-2">簡介</h5>

                      <p className="text-muted font-13">
                        <pre>{channel.intro}</pre>
                      </p>
                      <h5 className="mt-0 mb-2">備註</h5>

                      <p className="text-muted font-13">
                        <pre>{channel.note}</pre>
                      </p>
                    </Col>
                    <Col xm={1} className="text-sm-right">
                      <LinkContainer to={`/quotes/kol/${channelId}/edit`}>
                        <Button variant="primary" className="btn-sm" size="sm">
                          <i className="fas fa-edit"></i> 編輯
                        </Button>
                      </LinkContainer>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Card>
                <Card.Body>
                  <h5>Nox 資料</h5>

                  {channel.noxStatusCode !== 10000 && channel.noxStatusCode && (
                    <Alert variant="danger">
                      {channel.noxStatusCode} - 抓取資料失敗(可能數據太低)
                    </Alert>
                  )}
                  {channel.noxData && (
                    <>
                      {" "}
                      <ListGroup horizontal>
                        <ListGroup.Item>
                          <div>
                            <h6>Nox 評級</h6>
                            <small className="text-muted">
                              {" "}
                              {channel.noxData.noxScore}
                              <ScoreToStars score={channel.noxData.noxScore} />
                            </small>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div>
                            <h6>粉絲數</h6>
                            <small className="text-muted">
                              {" "}
                              {channel.noxData.subscribers}
                            </small>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div>
                            <h6>總觀看量</h6>
                            <small className="text-muted">
                              {" "}
                              {channel.noxData.totalViews}
                            </small>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div>
                            <h6>平均觀看數</h6>
                            <small className="text-muted">
                              {" "}
                              {channel.noxData.estimateViews}
                            </small>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div>
                            <h6>影片總數</h6>
                            <small className="text-muted">
                              {" "}
                              {channel.noxData.totalVideos}
                            </small>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div>
                            <h6>網紅地區排名</h6>
                            <small className="text-muted">
                              {" "}
                              {channel.noxData.subscriberCountryRanking}
                            </small>
                          </div>
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <div>
                            <h6>預估月收入</h6>
                            <small className="text-muted">
                              {" "}
                              {channel.noxData.estMonthEarning}
                            </small>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup horizontal className="my-2">
                        <ListGroup.Item>
                          <div>
                            <h6>近30支影片觀看數</h6>
                            <small className="text-muted">
                              {" "}
                              {channel.noxData.lastThirtyVideoViews}
                            </small>
                          </div>
                        </ListGroup.Item>
                        {/* <ListGroup.Item>
                          <div>
                            <h6>近30支影片按讚數</h6>
                            <small className="text-muted">
                              {" "}
                              {channel.noxData.lastThirtyVideoLikes}
                            </small>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div>
                            <h6>近30支影片倒讚數</h6>
                            <small className="text-muted">
                              {" "}
                              {channel.noxData.lastThirtyVideoDisLikes}
                            </small>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div>
                            <h6>近30支影片平均觀看量</h6>
                            <small className="text-muted">
                              {" "}
                              {channel.noxData.averageViews}
                            </small>
                          </div>
                        </ListGroup.Item> */}
                        <ListGroup.Item>
                          <div>
                            <h6>開啟nox分析報告</h6>
                            <small className="text-muted">
                              {" "}
                              {channel.socials?.youtube && (
                                <a
                                  href={`https://tw.noxinfluencer.com/youtube/channel/${channel.socials.youtube}`}
                                  target="_blank"
                                >
                                  <i className="fas fa-external-link-alt ml-2"></i>
                                </a>
                              )}
                            </small>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div>
                            <h6>資訊更新時間</h6>
                            <small className="text-muted">
                              {DateTime.fromISO(
                                channel.noxData.createdAt
                              ).toFormat("yyyy-MM-dd hh:mm:ss")}
                            </small>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Card>
                <Card.Body>
                  <h5>社交平台粉絲數紀錄</h5>
                  <div className="text-right mb-3">
                    <Button
                      variant="primary"
                      className="btn-sm"
                      size="sm"
                      onClick={() => setShowSocialCreateModal(true)}
                    >
                      <i className="fas fa-plus"></i> 新增紀錄
                    </Button>
                  </div>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>日期</th>

                        <th>平台</th>
                        <th>粉絲數</th>

                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {socialDataRecords &&
                        socialDataRecords
                          .sort((a, b) => new Date(b.date) - new Date(a.date))
                          .map((s) => (
                            <tr>
                              {" "}
                              <td>
                                {DateTime.fromISO(s.date).toFormat(
                                  "yyyy-MM-dd"
                                )}
                              </td>{" "}
                              <td>{s.platform} </td> <td> {s.count}</td>
                              <td>
                                <Button
                                  variant="outline-primary"
                                  className="btn-sm"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedSocialDataRecord(s);
                                    setShowSocialEditModal(true);
                                  }}
                                >
                                  <i className="fas fa-edit"></i> 編輯
                                </Button>

                                <Button
                                  variant="outline-danger"
                                  className="btn-sm ml-2"
                                  size="sm"
                                  onClick={() => handleDeleteSocial(s._id)}
                                >
                                  <i className="fas fa-trash"></i> 刪除
                                </Button>
                              </td>{" "}
                            </tr>
                          ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Card>
                <Card.Body>
                  <h5>價格紀錄</h5>
                  <div className="text-right mb-3">
                    {" "}
                    <Button
                      variant="primary"
                      className="btn-sm"
                      size="sm"
                      onClick={() => setShow(true)}
                    >
                      <i className="fas fa-plus"></i> 新增紀錄
                    </Button>
                  </div>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>日期</th>
                        <th>平台</th>
                        <th>項目</th>
                        <th>採購價</th>
                        <th>市場價</th>
                        <th>備註</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(quotes) &&
                        quotes.map((q) => (
                          <tr>
                            <td>{q.date}</td>
                            <td>
                              {
                                quoteItems.filter((qi) => qi._id === q.item)[0]
                                  .platform
                              }
                            </td>
                            <td>
                              {
                                quoteItems.filter((qi) => qi._id === q.item)[0]
                                  .name
                              }
                            </td>
                            <td>{q.purchasePrice}</td>
                            <td>{q.marketPrice}</td>
                            <td>{q.note}</td>
                            <td>
                              <Button
                                variant="outline-primary"
                                className="btn-sm"
                                size="sm"
                                onClick={() => {
                                  setSelectedRecord(q);
                                  setShowEditModal(true);
                                }}
                              >
                                <i className="fas fa-edit"></i> 編輯
                              </Button>

                              <Button
                                variant="outline-danger"
                                className="btn-sm ml-2"
                                size="sm"
                                onClick={() => handleDeleteItem(q._id)}
                              >
                                <i className="fas fa-trash"></i> 刪除
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <TagManageModal
            show={showTagModal}
            onHide={() => setShowTagModal(false)}
            onSubmitTags={(data) => handleSubmitTags(data)}
            tags={channel.textTags}
            allTags={allTags}
          />

          <QuoteCreateModal
            show={show}
            handleClose={() => setShow(false)}
            channelId={channelId}
            channelTitle={channel.title}
            quoteItems={quoteItems}
            onCreateItem={(data) => handleCreateItem(data)}
            error={quoteCreateError}
            success={createSuccess}
          />

          {selectedRecord._id && (
            <QuoteEditModal
              quote={selectedRecord}
              show={showEditModal}
              handleClose={() => setShowEditModal(false)}
              channelId={channelId}
              channelTitle={channel.title}
              quoteItems={quoteItems}
              onEditItem={(data) => handleEditItem(data)}
              success={updateSuccess}
            />
          )}

          <SocialDataCreateModal
            show={showSocialCreateModal}
            handleClose={() => setShowSocialCreateModal(false)}
            channelId={channelId}
            channelTitle={channel.title}
            onCreateItem={(data) => handleCreateSocial(data)}
            error={socialDataCreateError}
            success={socialDataCreateSuccess}
          />

          {selectedSocialDataRecord._id && (
            <SocialDataEditModal
              record={selectedSocialDataRecord}
              show={showSocialEditModal}
              handleClose={() => setShowSocialEditModal(false)}
              channelId={channelId}
              channelTitle={channel.title}
              onEditItem={(data) => handleEditSocial(data)}
            />
          )}
        </>
      )}
    </>
  );
};
export default KOLDetailPageScreen;

const ScoreToStars = ({ score }) => {
  let rtnDiv = [];
  for (let i = 0; i < score; i++) {
    //rtnDiv.push(<i className="fas fa-star-half"></i>);
    if (i + 1 < score) {
      rtnDiv.push(<i className="fas fa-star ml-1 text-warning"></i>);
    } else {
      rtnDiv.push(<i className="fas fa-star-half ml-1 text-warning"></i>);
    }
  }
  return rtnDiv;
};
