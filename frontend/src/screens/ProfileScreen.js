import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("確認密碼不一致");
    } else {
      setMessage(null);
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}></Col>
      <Col md={9}>
        <h2>個人資料</h2>
        {message && <Message variant="danger">{message}</Message>}
        {}
        {success && <Message variant="success">資料已更新</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>姓名</Form.Label>
              <Form.Control
                type="name"
                placeholder="輸入顯示姓名"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="輸入 email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>密碼</Form.Label>
              <Form.Control
                type="password"
                placeholder="輸入密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>確認密碼</Form.Label>
              <Form.Control
                type="password"
                placeholder="再輸入一次密碼"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              確認更新
            </Button>
          </Form>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
