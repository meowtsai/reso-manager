import axios from "axios";
import {
  H55CARD_LIST_FAIL,
  H55CARD_LIST_SUCCESS,
  H55CARD_LIST_REQUEST,
  H55CARD_DELETE_REQUEST,
  H55CARD_DELETE_SUCCESS,
  H55CARD_DELETE_FAIL,

  H55TEAM_LIST_FAIL,
  H55TEAM_LIST_SUCCESS,
  H55TEAM_LIST_REQUEST,
  H55MATCH_LIST_REQUEST,
  H55MATCH_LIST_SUCCESS,
  H55MATCH_LIST_FAIL,
  MEMBER_UPDATE_GAMEID_REQUEST,
  MEMBER_UPDATE_GAMEID_REQUEST_SUCCESS,
  MEMBER_UPDATE_GAMEID_REQUEST_FAIL,
  TEAM_DELETE_REQUEST,
  TEAM_DELETE_SUCCESS,
  TEAM_DELETE_FAIL,
  H55COSPLAY_LIST_REQUEST,
  H55COSPLAY_LIST_SUCCESS,
  H55COSPLAY_LIST_FAIL,
  COSER_UPDATE_REQUEST,
  COSER_UPDATE_SUCCESS,
  COSER_UPDATE_FAIL,
  SCORE_UPDATE_REQUEST,
  SCORE_UPDATE_SUCCESS,
  SCORE_UPDATE_FAIL,

} from "../constants/h55eventConstants";
import { logout } from "./userActions";

export const updateScoreById = (scoreData, action) => async (
  dispatch,
  getState
) => {
  //console.log("updateScoreById", action, scoreData);
  try {
    dispatch({
      type: SCORE_UPDATE_REQUEST,
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

    const { data } =
      action === "add"
        ? await axios.post(
            `/api/cosplay/${scoreData.coser_id}/score`,
            scoreData,
            config
          )
        : await axios.put(
            `/api/cosplay/${scoreData.coser_id}/score`,
            scoreData,
            config
          );

    dispatch({
      type: SCORE_UPDATE_SUCCESS,
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
      type: SCORE_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const updateApplyById = (apply) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COSER_UPDATE_REQUEST,
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
      `/api/cosplay/${apply._id}`,
      { apply },
      config
    );

    dispatch({
      type: COSER_UPDATE_SUCCESS,
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
      type: COSER_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const listCosplays = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: H55COSPLAY_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/cosplay`, config);

    dispatch({
      type: H55COSPLAY_LIST_SUCCESS,
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
      type: H55COSPLAY_LIST_FAIL,
      payload: message,
    });
  }
};

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

export const updateMemberGameId = (newMemberGameId) => async (
  dispatch,
  getState
) => {
  console.log("updateMemberGameId", newMemberGameId);
  try {
    dispatch({
      type: MEMBER_UPDATE_GAMEID_REQUEST,
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
      `/api/h55event/update_game_id`,
      newMemberGameId,
      config
    );

    dispatch({
      type: MEMBER_UPDATE_GAMEID_REQUEST_SUCCESS,
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
      type: MEMBER_UPDATE_GAMEID_REQUEST_FAIL,
      payload: message,
    });
  }
};

export const deleteTeam = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEAM_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/h55event/${id}`, config);

    dispatch({ type: TEAM_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TEAM_DELETE_FAIL,
      payload: message,
    });
  }
};


export const listCards = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: H55CARD_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/h55card/list`, config);

    dispatch({
      type: H55CARD_LIST_SUCCESS,
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
      type: H55CARD_LIST_FAIL,
      payload: message,
    });
  }
};


export const deleteCard = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: H55CARD_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/h55card/${id}`, config);

    dispatch({ type: H55CARD_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: H55CARD_DELETE_FAIL,
      payload: message,
    });
  }
};