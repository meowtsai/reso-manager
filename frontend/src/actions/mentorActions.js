import axios from "axios";
import {
  GAME_LIST_FAIL,
  GAME_LIST_SUCCESS,
  GAME_LIST_REQUEST,
  MENTOR_LIST_REQUEST,
  MENTOR_LIST_SUCCESS,
  MENTOR_LIST_FAIL,
  MENTOR_DETAILS_FAIL,
  MENTOR_DETAILS_SUCCESS,
  MENTOR_DETAILS_REQUEST,
  MENTOR_UPDATE_REQUEST,
  MENTOR_UPDATE_SUCCESS,
  MENTOR_UPDATE_FAIL,
  COURSE_REGISTER_LIST_REQUEST,
  COURSE_REGISTER_LIST_SUCCESS,
  COURSE_REGISTER_LIST_FAIL,
  REGISTER_UPDATE_REQUEST,
  REGISTER_UPDATE_SUCCESS,
  REGISTER_UPDATE_FAIL,
} from "../constants/mentorsConstants";
import { logout } from "./userActions";

export const updateRegister = (register) => async (dispatch, getState) => {
  //console.log("updateRegister", register);
  try {
    dispatch({
      type: REGISTER_UPDATE_REQUEST,
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

    const { data } = await axios.post(
      `/api/mentors/register/${register._id}`,
      register,
      config
    );

    dispatch({ type: REGISTER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: REGISTER_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const listRegisters = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_REGISTER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/mentors/registers`, config);

    dispatch({
      type: COURSE_REGISTER_LIST_SUCCESS,
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
      type: COURSE_REGISTER_LIST_FAIL,
      payload: message,
    });
  }
};

export const listGames = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GAME_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/mentors/games`, config);

    dispatch({
      type: GAME_LIST_SUCCESS,
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
      type: GAME_LIST_FAIL,
      payload: message,
    });
  }
};

export const listMentors = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MENTOR_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/mentors`, config);

    dispatch({
      type: MENTOR_LIST_SUCCESS,
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
      type: MENTOR_LIST_FAIL,
      payload: message,
    });
  }
};

export const getMentorDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MENTOR_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/mentors/${id}`, config);

    dispatch({
      type: MENTOR_DETAILS_SUCCESS,
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
      type: MENTOR_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateMentor = (mentor) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MENTOR_UPDATE_REQUEST,
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

    const { data } = await axios.put(
      `/api/mentors/${mentor._id}`,
      mentor,
      config
    );

    dispatch({ type: MENTOR_UPDATE_SUCCESS });

    dispatch({ type: MENTOR_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: MENTOR_UPDATE_FAIL,
      payload: message,
    });
  }
};
