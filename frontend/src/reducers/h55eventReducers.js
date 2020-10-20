import {
  H55TEAM_LIST_FAIL,
  H55TEAM_LIST_SUCCESS,
  H55TEAM_LIST_REQUEST,
  H55TEAM_LIST_RESET,
  H55MATCH_LIST_REQUEST,
  H55MATCH_LIST_SUCCESS,
  H55MATCH_LIST_FAIL,
  MEMBER_UPDATE_GAMEID_REQUEST,
  MEMBER_UPDATE_GAMEID_REQUEST_SUCCESS,
  MEMBER_UPDATE_GAMEID_REQUEST_FAIL,
  TEAM_DELETE_REQUEST,
  TEAM_DELETE_SUCCESS,
  TEAM_DELETE_FAIL,
} from "../constants/h55eventConstants";

export const teamListReducer = (state = { teams: [] }, action) => {
  console.log(state);
  switch (action.type) {
    case H55TEAM_LIST_REQUEST:
      return { loading: true };
    case H55TEAM_LIST_SUCCESS:
      return { loading: false, teams: action.payload };
    case H55TEAM_LIST_FAIL:
      return { loading: false, error: action.payload };
    case H55TEAM_LIST_RESET:
      return { teams: [] };
    case MEMBER_UPDATE_GAMEID_REQUEST:
      return { ...state, loading: true };
    case MEMBER_UPDATE_GAMEID_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        teams: state.teams.map((t) =>
          t._id === action.payload._id ? action.payload : t
        ),
      };
    case MEMBER_UPDATE_GAMEID_REQUEST_FAIL:
    case TEAM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case TEAM_DELETE_REQUEST:
      return { ...state, loading: true };
    case TEAM_DELETE_SUCCESS:
      return {
        ...state,
        teams: state.teams.filter((t) => t._id !== action.payload.deleted_id),
        loading: false,
      };

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
