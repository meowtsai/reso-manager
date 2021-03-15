import axios from "axios";
import {
  SOCIALMEDIA_LIST_REQUEST,
  SOCIALMEDIA_LIST_SUCCESS,
  SOCIALMEDIA_LIST_FAIL,
  CATEGORIES_LIST_REQUEST,
  CATEGORIES_LIST_SUCCESS,
  CATEGORIES_LIST_FAIL,
  CHANNEL_CREATE_REQUEST,
  CHANNEL_CREATE_SUCCESS,
  CHANNEL_CREATE_FAIL,
  CHANNEL_LIST_REQUEST,
  CHANNEL_LIST_SUCCESS,
  CHANNEL_LIST_FAIL,
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  CHANNEL_UPDATE_FAIL,
  CHANNEL_UPDATE_SUCCESS,
  CHANNEL_UPDATE_REQUEST,
  QUOTEITEMS_LIST_REQUEST,
  QUOTEITEMS_LIST_SUCCESS,
  QUOTEITEMS_LIST_FAIL,
  QUOTE_CREATE_REQUEST,
  QUOTE_CREATE_SUCCESS,
  QUOTE_CREATE_FAIL,
  QUOTES_LIST_REQUEST,
  QUOTES_LIST_SUCCESS,
  QUOTES_LIST_FAIL,
  QUOTE_UPDATE_REQUEST,
  QUOTE_UPDATE_SUCCESS,
  QUOTE_UPDATE_FAIL,
  QUOTE_DELETE_REQUEST,
  QUOTE_DELETE_SUCCESS,
  QUOTE_DELETE_FAIL,
} from "../constants/quotesConstants";
import { logout } from "./userActions";

export const updateChannel = (channel) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHANNEL_UPDATE_REQUEST,
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
      `/api/quotes/channel/${channel._id}`,
      channel,
      config
    );

    dispatch({ type: CHANNEL_UPDATE_SUCCESS });

    dispatch({ type: CHANNEL_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CHANNEL_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const getChannelDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHANNEL_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/quotes/channel/${id}`, config);

    dispatch({
      type: CHANNEL_DETAILS_SUCCESS,
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
      type: CHANNEL_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const listChannels = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHANNEL_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/quotes/channel`, config);

    dispatch({
      type: CHANNEL_LIST_SUCCESS,
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
      type: CHANNEL_LIST_FAIL,
      payload: message,
    });
  }
};

export const listCategories = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORIES_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/quotes/categories`, config);

    dispatch({
      type: CATEGORIES_LIST_SUCCESS,
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
      type: CATEGORIES_LIST_FAIL,
      payload: message,
    });
  }
};

export const createChannel = (newChannel) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHANNEL_CREATE_REQUEST,
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
      "/api/quotes/channel",
      newChannel,
      config
    );

    dispatch({
      type: CHANNEL_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHANNEL_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSocialMedias = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SOCIALMEDIA_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/quotes/socialmedias`, config);

    dispatch({
      type: SOCIALMEDIA_LIST_SUCCESS,
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
      type: SOCIALMEDIA_LIST_FAIL,
      payload: message,
    });
  }
};

export const listQuoteItems = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUOTEITEMS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/quotes/quoteitem`, config);

    dispatch({
      type: QUOTEITEMS_LIST_SUCCESS,
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
      type: QUOTEITEMS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createQuote = (newQuote) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUOTE_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/quotes", newQuote, config);

    dispatch({
      type: QUOTE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUOTE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listQuotesByCondition = (condition) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: QUOTES_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/quotes/query`, condition, config);

    dispatch({
      type: QUOTES_LIST_SUCCESS,
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
      type: QUOTES_LIST_FAIL,
      payload: message,
    });
  }
};

export const updateQuote = (quote) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUOTE_UPDATE_REQUEST,
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
      `/api/quotes/detail/${quote._id}`,
      quote,
      config
    );

    dispatch({ type: QUOTE_UPDATE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: QUOTE_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const deleteQuote = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUOTE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/quotes/detail/${id}`, config);

    dispatch({ type: QUOTE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: QUOTE_DELETE_FAIL,
      payload: message,
    });
  }
};
