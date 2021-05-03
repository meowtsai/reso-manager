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
  CHANNEL_DETAILS_RESET,
  CHANNEL_UPDATE_RESET,
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
  QUOTE_UPDATE_RESET,
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
  SOCIALDATA_UPDATE_RESET,
  SOCIALDATA_DELETE_REQUEST,
  SOCIALDATA_DELETE_SUCCESS,
  SOCIALDATA_DELETE_FAIL,
  PRICING_LIST_REQUEST,
  PRICING_LIST_SUCCESS,
  PRICING_LIST_FAIL,
} from "../constants/quotesConstants";

export const channelListReducer = (state = { channels: [] }, action) => {
  switch (action.type) {
    case CHANNEL_LIST_REQUEST:
      return { loading: true };
    case CHANNEL_LIST_SUCCESS:
      return { loading: false, channels: action.payload };
    case CHANNEL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const socialMediaListReducer = (
  state = { socialMedias: [] },
  action
) => {
  switch (action.type) {
    case SOCIALMEDIA_LIST_REQUEST:
      return { loading: true };
    case SOCIALMEDIA_LIST_SUCCESS:
      return { loading: false, socialMedias: action.payload };
    case SOCIALMEDIA_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const serviceCategoriesListReducer = (
  state = { serviceCategories: [] },
  action
) => {
  switch (action.type) {
    case CATEGORIES_LIST_REQUEST:
      return { ...state, loading: true };
    case CATEGORIES_LIST_SUCCESS:
      return { loading: false, serviceCategories: action.payload };
    case CATEGORIES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const channelCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANNEL_CREATE_REQUEST:
      return { loading: true };
    case CHANNEL_CREATE_SUCCESS:
      return { loading: false, channel: action.payload };
    case CHANNEL_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const channelDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANNEL_DELETE_REQUEST:
      return { loading: true };
    case CHANNEL_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CHANNEL_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const channelDetailsReducer = (state = { channel: {} }, action) => {
  switch (action.type) {
    case CHANNEL_DETAILS_REQUEST:
      return { ...state, loading: true };
    case CHANNEL_DETAILS_SUCCESS:
      return { loading: false, channel: action.payload };
    case CHANNEL_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case CHANNEL_DETAILS_RESET:
      return { channel: {} };
    default:
      return state;
  }
};

export const channelUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANNEL_UPDATE_REQUEST:
      return { loading: true };
    case CHANNEL_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case CHANNEL_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CHANNEL_UPDATE_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const quoteItemsListReducer = (state = { quoteItems: [] }, action) => {
  switch (action.type) {
    case QUOTEITEMS_LIST_REQUEST:
      return { loading: true };
    case QUOTEITEMS_LIST_SUCCESS:
      return { loading: false, quoteItems: action.payload };
    case QUOTEITEMS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const quoteCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUOTE_CREATE_REQUEST:
      return { loading: true };
    case QUOTE_CREATE_SUCCESS:
      return { loading: false, quote: action.payload, success: true };
    case QUOTE_CREATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const quotesListReducer = (state = { quotes: [] }, action) => {
  switch (action.type) {
    case QUOTES_LIST_REQUEST:
      return { loading: true };
    case QUOTES_LIST_SUCCESS:
      return { loading: false, quotes: action.payload };
    case QUOTES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const quoteUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUOTE_UPDATE_REQUEST:
      return { loading: true };
    case QUOTE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case QUOTE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case QUOTE_UPDATE_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const quoteDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case QUOTE_DELETE_REQUEST:
      return { loading: true };
    case QUOTE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case QUOTE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const channelTagsCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANNEL_TAGS_CREATE_REQUEST:
      return { loading: true };
    case CHANNEL_TAGS_CREATE_SUCCESS:
      return { loading: false, tags: action.payload, success: true };
    case CHANNEL_TAGS_CREATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const tagsListReducer = (state = { tags: [] }, action) => {
  switch (action.type) {
    case TAGS_LIST_REQUEST:
      return { loading: true };
    case TAGS_LIST_SUCCESS:
      return { loading: false, tags: action.payload };
    case TAGS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const socialDataCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SOCIALDATA_CREATE_REQUEST:
      return { loading: true };
    case SOCIALDATA_CREATE_SUCCESS:
      return { loading: false, socialData: action.payload, success: true };
    case SOCIALDATA_CREATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const socialDataListReducer = (
  state = { socialDataList: [] },
  action
) => {
  switch (action.type) {
    case SOCIALDATA_LIST_REQUEST:
      return { loading: true };
    case SOCIALDATA_LIST_SUCCESS:
      return { loading: false, socialDataList: action.payload };
    case SOCIALDATA_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const socialDataUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SOCIALDATA_UPDATE_REQUEST:
      return { loading: true };
    case SOCIALDATA_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case SOCIALDATA_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SOCIALDATA_UPDATE_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const socialDataDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SOCIALDATA_DELETE_REQUEST:
      return { loading: true };
    case SOCIALDATA_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SOCIALDATA_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const pricingListReducer = (
  state = { quotes: [], channels: [], quoteItems: [], noxData: [] },
  action
) => {
  switch (action.type) {
    case PRICING_LIST_REQUEST:
      return { loading: true };
    case PRICING_LIST_SUCCESS:
      return {
        loading: false,
        quotes: action.payload.quotes,
        channels: action.payload.channels,
        quoteItems: action.payload.quoteItems,
        noxData: action.payload.noxData,
      };
    case PRICING_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
