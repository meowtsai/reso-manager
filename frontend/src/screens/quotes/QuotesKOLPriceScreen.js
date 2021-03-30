import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Row, Col, Image } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getPricingData } from "../../actions/quotesActions";
import { socials } from "./quotesConfig";
import { Link } from "react-router-dom";
const QuotesKOLPriceScreen = ({ history }) => {
  const dispatch = useDispatch();

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

  const formatPrice = (quoteData, category) => {
    const item = quoteItems.filter((qi) => qi._id === quoteData._id.item)[0];

    if (item.name === category) {
      if (socials.map((s) => s.id).indexOf(item.platform) > -1) {
        return (
          <div>
            {" "}
            <i className={`fab fa-${item.platform} mr-2 text-light`}></i>{" "}
            {quoteData.latest}{" "}
          </div>
        );
      } else {
        return <div> {quoteData.latest} </div>;
      }
    } else {
      return null;
    }
  };

  return (
    <>
      {" "}
      <h1>KOL 報價表</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col>
            <Table striped bordered hover variant="dark" size="sm">
              <thead>
                <tr>
                  <th>頻道名稱</th>
                  {quoteCategories.map((q) => (
                    <th>{q}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {channels.map((channel) => (
                  <tr>
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

                        <span className="ml-2 text-light">{channel.title}</span>
                      </Link>

                      {channel.socials?.youtube && (
                        <a
                          href={`https://tw.noxinfluencer.com/youtube/channel/${channel.socials.youtube}`}
                          target="_blank"
                        >
                          <i className="fas fa-external-link-alt ml-2"></i>
                        </a>
                      )}
                    </td>

                    {quoteCategories.map((c) => (
                      <td>
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
      )}
    </>
  );
};

export default QuotesKOLPriceScreen;
