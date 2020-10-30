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

export const roleListReducer = (state = { roles: [] }, action) => {
  switch (action.type) {
    case ROLE_LIST_REQUEST:
    case ROLE_DELETE_REQUEST:
      return { ...state, loading: true };
    case ROLE_LIST_SUCCESS:
      return { loading: false, roles: action.payload };
    case ROLE_DELETE_SUCCESS:
      return {
        loading: false,
        roles: state.roles.filter((role) => role._id !== action.payload),
      };
    case ROLE_LIST_FAIL:
    case ROLE_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload.message };

    default:
      return state;
  }
};

export const roleEditReducer = (state = { role: {} }, action) => {
  switch (action.type) {
    case ROLE_EDIT_REQUEST:
      return { loading: true, success: false };
    case ROLE_EDIT_SUCCESS:
      return { loading: false, success: true };
    case ROLE_EDIT_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ROLE_BY_ID_REQUEST:
      return { loading: true, success: false };
    case ROLE_BY_ID_SUCCESS:
      return {
        loading: false,
        role: action.payload,
      };
    case ROLE_BY_ID_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
