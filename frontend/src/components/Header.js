import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

import { logout } from "../actions/userActions";

const Header = () => {
  console.log("header");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>呼聲管理</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {userInfo &&
                (userInfo.isAdmin ||
                  checkPermissions(
                    userInfo.permissions,
                    "cosplay",
                    "read"
                  )) && (
                  <NavDropdown title="第五Cosplay" id="cosplay">
                    <LinkContainer to="/h55event/cosplaylist">
                      <NavDropdown.Item>參賽者列表</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              {userInfo &&
                (userInfo.isAdmin ||
                  checkPermissions(
                    userInfo.permissions,
                    "mentors",
                    "read"
                  )) && (
                  <NavDropdown title="帶練課程" id="mentors">
                    <LinkContainer to="/mentors/recordlist">
                      <NavDropdown.Item>預約管理</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/mentors/gamelist">
                      <NavDropdown.Item>課程管理</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/mentors/mentorlist">
                      <NavDropdown.Item>導師管理</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              {userInfo && (
                <NavDropdown title="萬聖狂歡盃" id="h55menu">
                  <LinkContainer to="/h55event/teamlist">
                    <NavDropdown.Item>報名隊伍</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/h55event/matchlist">
                    <NavDropdown.Item>媒合報名</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="後台管理" id="manage">
                  <LinkContainer to="/manage/role">
                    <NavDropdown.Item>角色職務管理</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/manage/userlist">
                    <NavDropdown.Item>使用者管理</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/manage/resourcelist">
                    <NavDropdown.Item>權限功能設定</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>個人檔案</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    登出
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> 登入
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

// [
//   {
//     "operations": "read,modify,delete",
//     "_id": "5fadf4ab69337922834ee7cb",
//     "role": "5fadf1e369337922834ee7c6",
//     "resource": {
//       "_id": "5fadf48869337922834ee7ca",
//       "resourceName": "cosplay"
//     },
//     "__v": 0
//   }
// ]
const checkPermissions = (permissions, resource, op) => {
  //return true;
  const filteredPerm = permissions.filter(
    (perm) => perm.resource.resourceName === resource
  )[0];
  console.log("checkPermissions", filteredPerm);
  if (filteredPerm && filteredPerm.operations.indexOf(op) > -1) {
    return true;
  }
  return false;
};
