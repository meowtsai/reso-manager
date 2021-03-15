import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Row, Col, Image, Button } from "react-bootstrap";
import { listSocialMedias } from "../../actions/quotesActions";

import { LinkContainer } from "react-router-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const SocialMediaListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const socialList = useSelector((state) => state.socialMedias);
  const { loading, error, socialMedias = [] } = socialList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listSocialMedias());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);
  return (
    <>
      <h1>社交媒體列表</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col xs={12}>
            <LinkContainer to={`/quotes/socialmedias/create`}>
              <Button size="sm">新增媒體</Button>
            </LinkContainer>

            <Row>
              <Col>共 {socialMedias.length} 筆資料</Col>
            </Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>名稱</th>
                  <th>網址</th>
                </tr>
              </thead>
              <tbody>
                {socialMedias.map((media) => (
                  <tr>
                    <td>
                      <Image
                        src={`/images/social/${media.icon}`}
                        roundedCircle
                        style={{ width: "50px" }}
                      />
                      <span className="ml-2"> {media.name} </span>
                    </td>
                    <td>{media.website}</td>
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

export default SocialMediaListScreen;
