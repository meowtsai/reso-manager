import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listRoles, deleteRole } from "../actions/manageActions";

const RoleListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const roleList = useSelector((state) => state.roleList);
  const { loading, error, roles } = roleList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listRoles());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const handleDelete = (id, name) => {
    if (window.confirm("確定要刪除[" + name + "]這筆資料嗎?")) {
      dispatch(deleteRole(id));
    }
  };

  return (
    <>
      <h1>管理/ 角色管理</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <LinkContainer to={`/manage/role/create`}>
            <Button size="sm">新增角色</Button>
          </LinkContainer>

          <Row>
            <Col>共 {roles.length} 筆資料</Col>
          </Row>

          <Table
            striped
            bordered
            hover
            responsive
            className="table-sm text-dark"
          >
            <thead>
              <tr>
                <th>角色</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={`r-${role._id}`}>
                  <td>
                    <Link to={`/manage/role/edit/${role._id}`}>
                      {role.roleName}
                      <small className="text-success"> {role.roleDesc}</small>
                    </Link>
                    <br />
                  </td>
                  <td>
                    <LinkContainer to={`/manage/role/edit/${role._id}`}>
                      <Button size="sm"> 編輯</Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(role._id, role.roleName)}
                    >
                      {" "}
                      刪除{" "}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default RoleListScreen;
