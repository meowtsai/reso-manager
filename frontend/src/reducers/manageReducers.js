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
  RESOURCE_DETAILS_RESET,
  RESOURCE_UPDATE_FAIL,
  RESOURCE_UPDATE_SUCCESS,
  RESOURCE_UPDATE_REQUEST,
  RESOURCE_UPDATE_RESET,
  RESOURCE_CREATE_FAIL,
  RESOURCE_CREATE_SUCCESS,
  RESOURCE_CREATE_REQUEST,
  RESOURCE_CREATE_RESET,
  PERMISSIONS_BY_ROLEID_REQUEST,
  PERMISSIONS_BY_ROLEID_SUCCESS,
  PERMISSIONS_BY_ROLEID_FAIL,
  PERMISSIONS_CREATE_FAIL,
  PERMISSIONS_CREATE_SUCCESS,
  PERMISSIONS_CREATE_REQUEST,
  PERMISSIONS_CREATE_RESET,
} from "../constants/manageConstants";

export const resourceCreateReducer = (state = { resource: {} }, action) => {
  switch (action.type) {
    case RESOURCE_CREATE_REQUEST:
      return { loading: true };
    case RESOURCE_CREATE_SUCCESS:
      return { loading: false, success: true };
    case RESOURCE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case RESOURCE_CREATE_RESET:
      return {
        resource: {},
      };
    default:
      return state;
  }
};

export const resourceDetailsReducer = (state = { resource: {} }, action) => {
  switch (action.type) {
    case RESOURCE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case RESOURCE_DETAILS_SUCCESS:
      return { loading: false, resource: action.payload };
    case RESOURCE_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case RESOURCE_DETAILS_RESET:
      return { resource: {} };
    default:
      return state;
  }
};

export const resourceUpdateReducer = (state = { resource: {} }, action) => {
  switch (action.type) {
    case RESOURCE_UPDATE_REQUEST:
      return { loading: true };
    case RESOURCE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case RESOURCE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case RESOURCE_UPDATE_RESET:
      return {
        resource: {},
      };
    default:
      return state;
  }
};

export const resourceListReducer = (state = { resources: [] }, action) => {
  switch (action.type) {
    case RESOURCE_LIST_REQUEST:
      return { loading: true };
    case RESOURCE_LIST_SUCCESS:
      return { loading: false, resources: action.payload };
    case RESOURCE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case RESOURCE_LIST_RESET:
      return { resources: [] };
    default:
      return state;
  }
};

export const resourceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case RESOURCE_DELETE_REQUEST:
      return { loading: true };
    case RESOURCE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case RESOURCE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

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

export const rolePermissionsReducer = (
  state = { permission: {}, permissions: [], resources: [], role: {} },
  action
) => {
  switch (action.type) {
    case PERMISSIONS_BY_ROLEID_REQUEST:
    case PERMISSIONS_CREATE_REQUEST:
      return { ...state, loading: true };

    case PERMISSIONS_CREATE_SUCCESS:
      return { ...state, loading: false, permissions: action.payload };

    case PERMISSIONS_BY_ROLEID_SUCCESS:
      return {
        loading: false,
        permissions: action.payload.permissions,
        resources: action.payload.resources,
        role: action.payload.role,
      };

    case PERMISSIONS_BY_ROLEID_FAIL:
    case PERMISSIONS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case RESOURCE_CREATE_RESET:
      return {
        permissions: {},
      };
    default:
      return state;
  }
};
