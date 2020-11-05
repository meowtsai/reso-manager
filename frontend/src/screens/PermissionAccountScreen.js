import React, { useState, useEffect, Fragment } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
  getRole,
  listResources,
  getPermissionsByRoleId,
  updateUserPermissions,
} from "../actions/manageActions";

const PermissionAccountScreen = ({ match, history }) => {
  const roleId = match.params.id;

  const [permissions, setPermissions] = useState([]);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const roleEdit = useSelector((state) => state.roleEdit);
  const { loading, role, error, success } = roleEdit;

  const resourceList = useSelector((state) => state.resourceList);
  const { resources } = resourceList;

  const rolePermissionsState = useSelector((state) => state.rolePermissions);
  const {
    permissions: rolePermissions,
    loading: rolePermissionsLoading,
  } = rolePermissionsState;

  console.log("rolePermissions", rolePermissions);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!role || !role.roleName || role._id !== match.params.id) {
        if (!loading && !rolePermissionsLoading) {
          dispatch(listResources());
          dispatch(getRole(roleId));
          dispatch(getPermissionsByRoleId(roleId));
        }
      }
    }
  }, [dispatch, history, role, roleId]);

  useEffect(() => {
    if (rolePermissions && rolePermissions.length > 0) {
      setPermissions(
        rolePermissions.map((r) => ({
          resource: r.resource,
          operations: r.operations.split(","),
        }))
      );
    }
  }, [rolePermissions]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUserPermissions({ roleId: roleId, permissions }));

    console.log("submitHandler");
  };

  const handleSingleCheck = (e) => {
    const { name, checked } = e.target;
    const existedPermission = permissions.filter(
      (p) => p.resource === name.split(":")[0]
    );
    let newPermission = {};

    if (existedPermission.length > 0) {
      if (checked) {
        existedPermission[0].operations.push(name.split(":")[1]);
      } else {
        existedPermission[0].operations = existedPermission[0].operations.filter(
          (op) => op !== name.split(":")[1]
        );
      }
      newPermission = existedPermission[0];
    } else {
      newPermission.resource = name.split(":")[0];
      newPermission.operations = [name.split(":")[1]];
    }

    setPermissions([
      ...permissions.filter((p) => p.resource !== name.split(":")[0]),
      newPermission,
    ]);
    console.log("permissions", permissions);
    //[{ resource: "manage", operations:"read"}]

    // if (isChecked.includes(name)) {
    //   setIsChecked(isChecked.filter(checked_name => checked_name !== name));
    //   return setAllChecked(false);
    // }
    // isChecked.push(name);
    // setIsChecked([...isChecked]);
    // setAllChecked(isChecked.length === formData.length)
  };

  function checkPermission(rolePermissions, id, op) {
    console.log("checkPermission called", id, op);
    const perm = rolePermissions.filter((r) => r.resource === id);
    if (perm.length > 0) {
      console.log(perm);
      console.log(op);

      if (perm[0].operations.indexOf(op) > -1) {
        return true;
      }
    }
    return false;
  }

  return (
    <>
      <Link to="/manage/role" className="btn btn-light my-3">
        回列表
      </Link>
      {loading || rolePermissionsLoading ? (
        <Loader />
      ) : (
        <FormContainer>
          <h4>{role.roleDesc} 權限設定</h4>
          <Form onSubmit={submitHandler}>
            <Table bordered responsive className="table-sm text-dark">
              <thead>
                <tr>
                  <th>功能</th>
                  <th>權限</th>
                </tr>
              </thead>
              <tbody>
                {resources
                  .filter((r) => r.parent === "" || !r.parent)
                  .map((ParentResource) => (
                    <Fragment key={ParentResource._id}>
                      <tr>
                        <td>
                          {ParentResource.resourceName}
                          <small className="text-sucess">
                            {ParentResource.resourceDesc}
                          </small>
                        </td>
                        <td>{ParentResource.operationList}</td>
                      </tr>

                      {resources
                        .filter((r) => r.parent === ParentResource._id)
                        .map((childResource) => (
                          <tr key={childResource._id}>
                            <td>
                              {childResource.resourceName}
                              <small className="text-sucess">
                                {childResource.resourceDesc}
                              </small>{" "}
                            </td>
                            <td>
                              {childResource.operationList
                                .split(",")
                                .map((op) => (
                                  <Form.Check
                                    inline
                                    type="checkbox"
                                    key={`${childResource._id}:${op}`}
                                    id={`${childResource._id}:${op}`}
                                    name={`${childResource._id}:${op}`}
                                    label={`${op}`}
                                    onChange={handleSingleCheck}
                                    defaultChecked={checkPermission(
                                      rolePermissions,
                                      childResource._id,
                                      op
                                    )}
                                  />
                                ))}
                            </td>
                          </tr>
                        ))}
                    </Fragment>
                  ))}
              </tbody>
            </Table>
            <hr />
            <Button type="submit" variant="primary">
              更新
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default PermissionAccountScreen;
