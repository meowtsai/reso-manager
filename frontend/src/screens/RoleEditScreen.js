import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { editRole, getRole } from "../actions/manageActions";

const RoleEditScreen = ({ match, history }) => {
  //console.log("match", match);

  const [roleName, setRoleName] = useState("");
  const [roleDesc, setRoleDesc] = useState("");
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const roleEdit = useSelector((state) => state.roleEdit);
  const { loading, role, error, success } = roleEdit;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (match.params.id) {
        if (!role || !role.roleName || role._id !== match.params.id) {
          dispatch(getRole(match.params.id));
        } else {
          setRoleName(role.roleName);
          setRoleDesc(role.roleDesc);
        }
      }
    }
  }, [dispatch, history, role]);

  const submitHandler = (e) => {
    e.preventDefault();
    // if (roleName === "") setErrors({ roleName: "請填入角色英文名稱" });
    // if (roleDesc === "") setErrors({ roleDesc: "請填入角色說明" });
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    // setMessage(null);
    const roleData = { roleName, roleDesc, id: match.params.id };

    dispatch(editRole(roleData));
  };

  // if (success) {
  //   history.push("/manage/role");
  // }
  return (
    <Row>
      <Col md={3}></Col>
      <Col md={9}>
        <h2>角色資料</h2>
        {error && <Message variant="danger">{error}</Message>}
        {}
        {success && <Message variant="success">資料已更新</Message>}
        {loading ? (
          <Loader />
        ) : (
          <Form noValidate validated={validated} onSubmit={submitHandler}>
            <Form.Group controlId="roleName">
              <Form.Label>角色名稱</Form.Label>
              <Form.Control
                type="text"
                placeholder="輸入英文角色名稱"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                請輸入角色名稱
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="roleDesc">
              <Form.Label>角色說明</Form.Label>
              <Form.Control
                type="text"
                value={roleDesc}
                onChange={(e) => setRoleDesc(e.target.value)}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                請輸入角色說明
              </Form.Control.Feedback>
            </Form.Group>
            <LinkContainer to="/manage/role">
              <Button type="button" variant="light">
                回列表
              </Button>
            </LinkContainer>

            <Button type="submit" variant="primary">
              確認送出
            </Button>
          </Form>
        )}
      </Col>
    </Row>
  );
};

export default RoleEditScreen;
