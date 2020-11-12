import React, { useEffect } from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listResources, deleteResource } from "../actions/manageActions";

const ResourceListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const resourceList = useSelector((state) => state.resourceList);
  const { loading, error, resources } = resourceList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listResources());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const handleDelete = (id, name) => {
    if (window.confirm("確定要刪除[" + name + "]這筆資料嗎?")) {
      dispatch(deleteResource(id));
    }
  };

  return (
    <>
      <h1>功能管理</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <LinkContainer to={`/manage/resource/create`}>
            <Button size="sm">新增功能</Button>
          </LinkContainer>

          <Row>
            <Col>共 {resources.length} 筆資料</Col>
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
              {resources.map((resource) => (
                <tr key={`r-${resource._id}`}>
                  <td>
                    <Link to={`/manage/resource/${resource._id}/edit`}>
                      {resource.resourceName}
                      <small className="text-success">
                        {" "}
                        {resource.resourceDesc}
                      </small>
                    </Link>
                    <br />
                  </td>
                  <td>
                    <LinkContainer to={`/manage/resource/${resource._id}/edit`}>
                      <Button size="sm"> 編輯</Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        handleDelete(resource._id, resource.resourceName)
                      }
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

export default ResourceListScreen;
