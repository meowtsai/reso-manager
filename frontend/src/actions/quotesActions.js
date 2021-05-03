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
  CHANNEL_DELETE_REQUEST,
  CHANNEL_DELETE_SUCCESS,
  CHANNEL_DELETE_FAIL,
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
  CHANNEL_TAGS_CREATE_REQUEST,
  CHANNEL_TAGS_CREATE_SUCCESS,
  CHANNEL_TAGS_CREATE_FAIL,
  TAGS_LIST_REQUEST,
  TAGS_LIST_SUCCESS,
  TAGS_LIST_FAIL,
  SOCIALDATA_CREATE_REQUEST,
  SOCIALDATA_CREATE_SUCCESS,
  SOCIALDATA_CREATE_FAIL,
  SOCIALDATA_LIST_REQUEST,
  SOCIALDATA_LIST_SUCCESS,
  SOCIALDATA_LIST_FAIL,
  SOCIALDATA_UPDATE_REQUEST,
  SOCIALDATA_UPDATE_SUCCESS,
  SOCIALDATA_UPDATE_FAIL,
  SOCIALDATA_DELETE_REQUEST,
  SOCIALDATA_DELETE_SUCCESS,
  SOCIALDATA_DELETE_FAIL,
  PRICING_LIST_REQUEST,
  PRICING_LIST_SUCCESS,
  PRICING_LIST_FAIL,
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

export const listChannels = (tagId = "") => async (dispatch, getState) => {
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

    const { data } = await axios.get(
      `/api/quotes/channel?tagId=${tagId}`,
      config
    );

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

export const createChannelTags = (requestData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: CHANNEL_TAGS_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { channelId, tags } = requestData;

    const { data } = await axios.post(
      `/api/quotes/channel/${channelId}/tags`,
      requestData,
      config
    );

    dispatch({
      type: CHANNEL_TAGS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHANNEL_TAGS_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTags = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TAGS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/quotes/tags`, config);

    dispatch({
      type: TAGS_LIST_SUCCESS,
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
      type: TAGS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createSocialData = (requestData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SOCIALDATA_CREATE_REQUEST,
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
      `/api/quotes/socialdata/`,
      requestData,
      config
    );

    dispatch({
      type: SOCIALDATA_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SOCIALDATA_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSocialDataByCondition = (condition) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: SOCIALDATA_LIST_REQUEST,
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
      `/api/quotes/socialdata/${condition.channel}/query`,
      condition,
      config
    );

    dispatch({
      type: SOCIALDATA_LIST_SUCCESS,
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
      type: SOCIALDATA_LIST_FAIL,
      payload: message,
    });
  }
};

export const updateSocialData = (socialData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SOCIALDATA_UPDATE_REQUEST,
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
      `/api/quotes/socialdata/${socialData._id}`,
      socialData,
      config
    );

    dispatch({ type: SOCIALDATA_UPDATE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SOCIALDATA_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const deleteSocialData = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SOCIALDATA_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/quotes/socialdata/${id}`, config);

    dispatch({ type: SOCIALDATA_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SOCIALDATA_DELETE_FAIL,
      payload: message,
    });
  }
};

export const getPricingData = (condition) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRICING_LIST_REQUEST,
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
      `/api/quotes/pricing/`,
      condition,
      config
    );

    dispatch({
      type: PRICING_LIST_SUCCESS,
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
      type: PRICING_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteChannel = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHANNEL_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/quotes/channel/${id}`, config);

    dispatch({ type: CHANNEL_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CHANNEL_DELETE_FAIL,
      payload: message,
    });
  }
};
