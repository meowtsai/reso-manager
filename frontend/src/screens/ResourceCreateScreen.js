import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { createResource, listResources } from "../actions/manageActions";

import { RESOURCE_CREATE_RESET } from "../constants/manageConstants";

const ResourceCreateScreen = ({ match, history }) => {
  const [resourceName, setResourceName] = useState("");
  const [resourceDesc, setResourceDesc] = useState("");
  const [operationList, setOperationList] = useState("");
  const [parent, setParent] = useState("");

  const dispatch = useDispatch();

  const resourceList = useSelector((state) => state.resourceList);
  const { resources } = resourceList;

  const resourceCreate = useSelector((state) => state.resourceCreate);
  const { loading, error, success } = resourceCreate;

  useEffect(() => {
    dispatch(listResources());
  }, []);

  useEffect(() => {
    if (success) {
      dispatch({ type: RESOURCE_CREATE_RESET });
      history.push("/manage/resourcelist");
    }
  }, [dispatch, history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createResource({
        resourceName,
        resourceDesc,
        operationList,
        parent,
      })
    );
  };

  return (
    <>
      <Link to="/manage/resourcelist" className="btn btn-light my-3">
        回列表
      </Link>
      <FormContainer>
        <h1>新增功能</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="resourceName">
              <Form.Label>功能</Form.Label>
              <Form.Control
                type="text"
                placeholder="功能(英文)"
                value={resourceName}
                onChange={(e) => setResourceName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="resourceDesc">
              <Form.Label>說明</Form.Label>
              <Form.Control
                type="text"
                placeholder="輸入說明"
                value={resourceDesc}
                onChange={(e) => setResourceDesc(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="operationList">
              <Form.Label>操作</Form.Label>
              <Form.Control
                type="text"
                placeholder="輸入操作"
                value={operationList}
                onChange={(e) => setOperationList(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="parent">
              <Form.Label>隸屬</Form.Label>
              <Form.Control
                as="select"
                value={parent}
                onChange={(e) => setParent(e.target.value)}
              >
                <option value="">選擇...</option>
                {resources &&
                  resources.length > 0 &&
                  resources.map((resource) => (
                    <option
                      value={resource._id}
                    >{`${resource.resourceName} ${resource.resourceDesc}`}</option>
                  ))}
              </Form.Control>
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

export default ResourceCreateScreen;
