import axios from "axios";
import {
  ROLE_LIST_FAIL,
  ROLE_LIST_SUCCESS,
  ROLE_LIST_REQUEST,
  ROLE_EDIT_REQUEST,
  ROLE_EDIT_SUCCESS,
  ROLE_EDIT_FAIL,
  ROLE_BY_ID_REQUEST,
  ROLE_BY_ID_SUCCESS,
  ROLE_BY_ID_FAIL,
  ROLE_DELETE_REQUEST,
  ROLE_DELETE_SUCCESS,
  ROLE_DELETE_FAIL,
  RESOURCE_LIST_FAIL,
  RESOURCE_LIST_SUCCESS,
  RESOURCE_LIST_REQUEST,
  RESOURCE_LIST_RESET,
  RESOURCE_DELETE_REQUEST,
  RESOURCE_DELETE_SUCCESS,
  RESOURCE_DELETE_FAIL,
  RESOURCE_DETAILS_FAIL,
  RESOURCE_DETAILS_REQUEST,
  RESOURCE_DETAILS_SUCCESS,
  RESOURCE_UPDATE_FAIL,
  RESOURCE_UPDATE_SUCCESS,
  RESOURCE_UPDATE_REQUEST,
  RESOURCE_CREATE_FAIL,
  RESOURCE_CREATE_SUCCESS,
  RESOURCE_CREATE_REQUEST,
  PERMISSIONS_BY_ROLEID_REQUEST,
  PERMISSIONS_BY_ROLEID_SUCCESS,
  PERMISSIONS_BY_ROLEID_FAIL,
  PERMISSIONS_CREATE_FAIL,
  PERMISSIONS_CREATE_SUCCESS,
  PERMISSIONS_CREATE_REQUEST,
  PERMISSIONS_CREATE_RESET,
} from "../constants/manageConstants";
import { logout } from "./userActions";

export const createResource = (resource) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESOURCE_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/manage/resource`, resource, config);

    dispatch({
      type: RESOURCE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: RESOURCE_CREATE_FAIL,
      payload: message,
    });
  }
};

//getResourceDetails, updateResource
export const updateResource = (resource) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESOURCE_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log("update resource", resource);

    const { data } = await axios.put(
      `/api/manage/resource/${resource._id}`,
      resource,
      config
    );

    dispatch({ type: RESOURCE_UPDATE_SUCCESS });

    dispatch({ type: RESOURCE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: RESOURCE_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const getResourceDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESOURCE_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/manage/resource/${id}`, config);

    dispatch({
      type: RESOURCE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: RESOURCE_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const listRoles = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ROLE_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/manage/role/list`, config);

    dispatch({
      type: ROLE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ROLE_LIST_FAIL,
      payload: message,
    });
  }
};

export const editRole = (role) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ROLE_EDIT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/manage/role`, role, config);

    dispatch({
      type: ROLE_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ROLE_EDIT_FAIL,
      payload: message,
    });
  }
};

export const getRole = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ROLE_BY_ID_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/manage/role/id/${id}`, config);

    dispatch({
      type: ROLE_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ROLE_BY_ID_FAIL,
      payload: message,
    });
  }
};

export const deleteRole = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ROLE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/manage/role/id/${id}`, config);

    dispatch({
      type: ROLE_DELETE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ROLE_DELETE_FAIL,
      payload: message,
    });
  }
};

export const listResources = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESOURCE_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/manage/resource`, config);

    dispatch({
      type: RESOURCE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: RESOURCE_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteResource = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESOURCE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/manage/resource/${id}`, config);

    dispatch({
      type: RESOURCE_DELETE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: RESOURCE_DELETE_FAIL,
      payload: message,
    });
  }
};

export const getPermissionsByRoleId = (id) => async (dispatch, getState) => {
  console.log("getPermissionsByRoleId", id);
  try {
    dispatch({
      type: PERMISSIONS_BY_ROLEID_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/manage/permission/${id}`, config);

    console.log(data);

    dispatch({
      type: PERMISSIONS_BY_ROLEID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PERMISSIONS_BY_ROLEID_FAIL,
      payload: message,
    });
  }
};

export const updateUserPermissions = ({ roleId, permissions }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PERMISSIONS_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/manage/permission/${roleId}`,
      permissions,
      config
    );

    dispatch({
      type: PERMISSIONS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PERMISSIONS_CREATE_FAIL,
      payload: message,
    });
  }
};
