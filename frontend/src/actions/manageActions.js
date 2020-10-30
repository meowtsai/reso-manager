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
} from "../constants/manageConstants";
import { logout } from "./userActions";

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
