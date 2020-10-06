import axios from "axios";
import {
  H55TEAM_LIST_FAIL,
  H55TEAM_LIST_SUCCESS,
  H55TEAM_LIST_REQUEST,
  H55MATCH_LIST_REQUEST,
  H55MATCH_LIST_SUCCESS,
  H55MATCH_LIST_FAIL,
} from "../constants/h55eventConstants";
import { logout } from "./userActions";

export const listTeams = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: H55TEAM_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/h55event/teams`, config);

    dispatch({
      type: H55TEAM_LIST_SUCCESS,
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
      type: H55TEAM_LIST_FAIL,
      payload: message,
    });
  }
};

export const listMatch = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: H55MATCH_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/h55event/match`, config);

    dispatch({
      type: H55MATCH_LIST_SUCCESS,
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
      type: H55MATCH_LIST_FAIL,
      payload: message,
    });
  }
};
