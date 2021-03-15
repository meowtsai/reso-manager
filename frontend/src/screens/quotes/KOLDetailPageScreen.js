import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, Row, Col, Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  listCategories,
  getChannelDetail,
  listQuoteItems,
  createQuote,
  listQuotesByCondition,
  updateQuote,
  deleteQuote,
} from "../../actions/quotesActions";
import { socials as socialsConfig, areaConfig } from "./quotesConfig";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import QuoteCreateModal from "./QuoteCreateModal";
import QuoteEditModal from "./QuoteEditModal";

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
    success: createSuccess,
  } = quoteCreate;

  const quoteUpdate = useSelector((state) => state.quoteUpdate);
  const { loading: quoteUpdateLoading, success: updateSuccess } = quoteUpdate;

  const quoteDelete = useSelector((state) => state.quoteDelete);
  const { loading: deleteLoading, success: deleteSuccess } = quoteDelete;

  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});

  const handleCreateItem = (data) => {
    dispatch(createQuote(data));
  };

  const handleEditItem = (data) => {
    dispatch(updateQuote(data));
  };

  const handleDeleteItem = (id) => {
    if (window.confirm("您確定要刪除這筆紀錄嗎? 沒有備分喔!")) {
      dispatch(deleteQuote(id));
    }
  };

  useEffect(() => {
    if (!channel.title || channel._id !== channelId) {
      dispatch(listCategories());
      dispatch(listQuoteItems());
      dispatch(listQuotesByCondition({ channel: channelId }));
      dispatch(getChannelDetail(channelId));
    }
  }, [dispatch, history, channelId, channel]);

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      dispatch(listQuotesByCondition({ channel: channelId }));
      setShow(false);
      setShowEditModal(false);
    }
    if (deleteSuccess) {
      dispatch(listQuotesByCondition({ channel: channelId }));
    }
  }, [createSuccess, updateSuccess, deleteSuccess]);

  if (!channel.title || channel._id !== channelId) {
    return <Loader />;
  }

  return (
    <>
      <h1>頻道列表</h1>
      {loading ||
      quoteItemsLoading ||
      serviceCategoriesLoading ||
      quotesLoading ? (
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
                          <strong>頻道名稱</strong>{" "}
                          <span className="ml-2">{channel.title}</span>
                        </p>
                        <p>
                          <strong>社交平台</strong>{" "}
                          <span className="ml-2">
                            {Object.keys(channel.socials).map((key) =>
                              channel.socials[key] !== "" ? (
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

                        <th>項目</th>
                        <th>採購價</th>
                        <th>市場價</th>
                        <th>備註</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotes.map((q) => (
                        <tr>
                          <td>{q.date}</td>
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

          <QuoteCreateModal
            show={show}
            handleClose={() => setShow(false)}
            channelId={channelId}
            channelTitle={channel.title}
            quoteItems={quoteItems}
            onCreateItem={(data) => handleCreateItem(data)}
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
            />
          )}
        </>
      )}
    </>
  );
};
export default KOLDetailPageScreen;
