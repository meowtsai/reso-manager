import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";

const SocialMediaCreateScreen = ({ match, history }) => {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Link to="/quotes/socialmedias/list" className="btn btn-light my-3">
        回列表
      </Link>
      <FormContainer>
        <h1>新增媒體</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="mediaName">
              <Form.Label>名稱</Form.Label>
              <Form.Control
                type="text"
                placeholder="媒體名稱"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="mediaWebsite">
              <Form.Label>說明</Form.Label>
              <Form.Control
                type="text"
                placeholder="輸入網址"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="mediaIcon">
              <Form.Label>圖示</Form.Label>
              <Form.Control
                type="text"
                placeholder="圖檔名稱"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              更新
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default SocialMediaCreateScreen;
