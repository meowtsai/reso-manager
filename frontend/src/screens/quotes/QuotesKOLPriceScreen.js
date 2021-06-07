import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Row, Col, Image, Form, Button } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getPricingData } from "../../actions/quotesActions";
import { socials } from "./quotesConfig";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";

const QuotesKOLPriceScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [selectedChannels, setSelectedChannels] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [renderList, setRenderList] = useState([]);

  const [sortByOption, setSortByOption] = useState({
    key: "ytsubscriber",
    value: "desc",
  });

  const quoteCategories = [
    "直播",
    "貼文",
    "影片",
    "活動主持",
    "活動出席",
    "影片拍攝出席(抵達至收工)",
  ];

  const pricingList = useSelector((state) => state.pricingList);
  const {
    loading,
    error,
    channels = [],
    quotes = [],
    quoteItems,
    noxData,
  } = pricingList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(getPricingData());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  useEffect(() => {
    let list = [];

    if (channels.length > 0) {
      for (let i = 0; i < channels.length; i++) {
        const item = channels[i];

        const record = {
          _id: item._id,
          title: item.title,
          thumbnails: item.thumbnails,
        };

        const quote = quotes.filter((q) => q._id.channel === item._id);

        record.socials = item.socials
          ? Object.keys(item.socials)
              .filter((key) => {
                if (item.socials[key] && item.socials[key] !== "") {
                  return true;
                }
              })
              .map(
                (key) =>
                  ` ${key}: ${socials.filter((s) => s.id === key)[0].url}/${
                    item.socials[key]
                  }`
              )
              .join("\n")
          : "";
        const noxArray = noxData.filter((n) => n._id.channel === item._id);
        record.noxUrl = item.socials?.youtube
          ? `https://tw.noxinfluencer.com/youtube/channel/${item.socials.youtube}`
          : null;
        record.ytsubscriber = noxArray.length && noxArray[0].subscribers;
        record.estimateViews =
          noxArray.length && noxArray[0].estimateViews;

        quoteCategories.forEach((c, i) => {
          record["item" + (i + 1)] = quote
            .map((q) => formatPrice(q, c, 2))
            .filter((a) => a !== null)
            .join("\n");
        });

        list.push(record);
      }
      // list = list.sort((a, b) =>
      //   sortByOption.value === "desc"
      //     ? b[sortByOption.key] - a[sortByOption.key]
      //     : a[sortByOption.key] - b[sortByOption.key]
      // );
    }

    //  (sortByOption

    setRenderList(list);
  }, [channels, sortByOption]);

  const formatPrice = (quoteData, category, option = 1) => {
    const item = quoteItems.filter((qi) => qi._id === quoteData._id.item)[0];

    if (item.name === category) {
      if (socials.map((s) => s.id).indexOf(item.platform) > -1) {
        return option === 1 ? (
          <div>
            {" "}
            <i className={`fab fa-${item.platform} mr-2 social-icon`}></i>{" "}
            {quoteData.latest}{" "}
          </div>
        ) : (
          item.platform + ":" + quoteData.latest
        );
      } else {
        return option === 1 ? (
          <div> {quoteData.latest} </div>
        ) : (
          quoteData.latest
        );
      }
    } else {
      return null;
    }
  };

  const exportData = () => {
    let rtnData = renderList.filter(
      (item) => selectedChannels.indexOf(item._id) > -1
    );

    return rtnData;
  };

  // [{"_id":{"channel":"60599260e064322b9c5be34d","item":"605bfe5f5739802b4878cda6"},"latest":1500,"ChannelDetail":[]},{"_id":{"channel":"60599260e064322b9c5be34d","item":"605bfe5f5739802b4878cdac"},"latest":3500,"ChannelDetail":[]},{"_id":{"channel":"60599260e064322b9c5be34d","item":"605bfe5f5739802b4878cdb2"},"latest":30000,"ChannelDetail":[]},{"_id":{"channel":"60599260e064322b9c5be34d","item":"605bfe5f5739802b4878cdb1"},"latest":30000,"ChannelDetail":[]}]

  //實況主 平台  頻道訂閱數  頻道連結  近30支平均觀看 採購價 市場價
  const fileName = `KOL查價列表_${Date.now()}`;
  const csvHeaders = [
    { label: "id", key: "_id" },
    { label: "實況主", key: "title" },
    { label: "平台", key: "socials" },
    { label: "頻道訂閱數", key: "ytsubscriber" },
    { label: "近30支平均觀看", key: "lastThirtyVideoViews" },
    { label: "直播", key: "item1" },
    { label: "貼文", key: "item2" },
    { label: "影片", key: "item3" },
    { label: "活動主持", key: "item4" },
    { label: "活動出席", key: "item5" },
    { label: "影片拍攝出席(抵達至收工)", key: "item6" },
  ];

  //   "_id": {
  //     "channel": "60599261e064322b9c5be386",
  //     "lastThirtyVideoViews": 6461,
  //     "subscribers": 123000
  //   },
  //   "latest": "2021-03-31T04:32:13.184Z"
  // },
  return (
    <>
      {" "}
      <h1>KOL 報價表</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col></Col>
            <Col>
              共 {channels.length} 筆資料, 已選取 {selectedChannels.length}{" "}
              筆資料
            </Col>

            <Col>
              {selectedChannels.length > 0 && (
                <CSVLink
                  data={exportData()}
                  headers={csvHeaders}
                  filename={fileName + ".csv"}
                >
                  <i className="fas fa-file-download"></i>
                  下載選取頻道的 csv 檔案
                </CSVLink>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>
                      <Form.Check
                        type="checkbox"
                        inline="true"
                        checked={selectAll}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedChannels(
                              renderList.map((item) => item._id)
                            );
                          } else {
                            setSelectedChannels([]);
                          }

                          setSelectAll(e.target.checked);
                        }}
                      />
                      頻道名稱
                    </th>
                    <th>
                      {" "}
                      <Button
                        variant="outline-primary"
                        onClick={(e) =>
                          setSortByOption({
                            key: "ytsubscriber",
                            value:
                              sortByOption.value === "asc" ? "desc" : "asc",
                          })
                        }
                      >
                        粉絲
                        {sortByOption.key === "ytsubscriber" ? (
                          sortByOption.value === "asc" ? (
                            <i className="fas fa-sort-up ml-2"></i>
                          ) : (
                            <i className="fas fa-sort-down ml-2"></i>
                          )
                        ) : null}
                      </Button>{" "}
                    </th>
                    <th>
                      <Button
                        variant="outline-primary"
                        onClick={(e) =>
                          setSortByOption({
                            key: "lastThirtyVideoViews",
                            value:
                              sortByOption.value === "asc" ? "desc" : "asc",
                          })
                        }
                      >
                        平均觀看
                        {sortByOption.key === "lastThirtyVideoViews" ? (
                          sortByOption.value === "asc" ? (
                            <i className="fas fa-sort-up ml-2"></i>
                          ) : (
                            <i className="fas fa-sort-down ml-2"></i>
                          )
                        ) : null}
                      </Button>{" "}
                    </th>
                    {quoteCategories.map((q) => (
                      <th>{q}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {renderList
                    .sort((a, b) =>
                      sortByOption.value === "desc"
                        ? b[sortByOption.key] - a[sortByOption.key]
                        : a[sortByOption.key] - b[sortByOption.key]
                    )
                    .map((channel) => (
                      <tr key={`tr_${channel._id}`}>
                        <td>
                          <Form.Check
                            type="checkbox"
                            inline="true"
                            checked={selectedChannels.indexOf(channel._id) > -1}
                            onChange={(e) =>
                              e.target.checked
                                ? setSelectedChannels([
                                    ...selectedChannels,
                                    channel._id,
                                  ])
                                : setSelectedChannels(
                                    selectedChannels.filter(
                                      (sc) => sc !== channel._id
                                    )
                                  )
                            }
                          />
                          <Link to={`/quotes/kol/${channel._id}/view`}>
                            {channel.thumbnails ? (
                              <Image
                                src={channel.thumbnails}
                                roundedCircle
                                style={{ width: "50px" }}
                              />
                            ) : (
                              <i className="fas fa-user-alt img-placeholder"></i>
                            )}

                            <span className="ml-2 ">{channel.title}</span>
                          </Link>

                          {channel.noxUrl && (
                            <a href={channel.noxUrl} target="_blank">
                              <i className="fas fa-external-link-alt ml-2"></i>
                            </a>
                          )}
                        </td>
                        <td className="text-right">
                          {channel.ytsubscriber}
                        </td>
                        <td className="text-right">
                          {channel.estimateViews}
                        </td>
                        {quoteCategories.map((c, i) => (
                          <td key={`tdcate_${i}`}>
                            {quotes
                              .filter((q) => q._id.channel === channel._id)
                              .map((q) => formatPrice(q, c))}
                          </td>
                        ))}
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

export default QuotesKOLPriceScreen;
