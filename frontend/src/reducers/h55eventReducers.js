import {
  H55TEAM_LIST_FAIL,
  H55TEAM_LIST_SUCCESS,
  H55TEAM_LIST_REQUEST,
  H55TEAM_LIST_RESET,
  H55MATCH_LIST_REQUEST,
  H55MATCH_LIST_SUCCESS,
  H55MATCH_LIST_FAIL,
} from "../constants/h55eventConstants";

export const teamListReducer = (state = { teams: [] }, action) => {
  switch (action.type) {
    case H55TEAM_LIST_REQUEST:
      return { loading: true };
    case H55TEAM_LIST_SUCCESS:
      return { loading: false, teams: action.payload };
    case H55TEAM_LIST_FAIL:
      return { loading: false, error: action.payload };
    case H55TEAM_LIST_RESET:
      return { teams: [] };
    default:
      return state;
  }
};

export const matchListReducer = (state = { matches: [] }, action) => {
  switch (action.type) {
    case H55MATCH_LIST_REQUEST:
      return { loading: true };
    case H55MATCH_LIST_SUCCESS:
      return { loading: false, matches: action.payload };
    case H55MATCH_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
