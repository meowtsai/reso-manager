import {
  H55CARD_LIST_FAIL,
  H55CARD_LIST_SUCCESS,
  H55CARD_LIST_REQUEST,
  H55CARD_DELETE_REQUEST,
  H55CARD_DELETE_SUCCESS,
  H55CARD_DELETE_FAIL,
  H55CARD_LIST_RESET,
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

export const teamListReducer = (
  state = { teams: [], cosplays: [] },
  action
) => {
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

export const cosplayListReducer = (
  state = { cosplays: [], updateLoading: false },
  action
) => {
  switch (action.type) {
    case H55COSPLAY_LIST_REQUEST:
      return { ...state, loading: true };
    case COSER_UPDATE_REQUEST:
      return { ...state, updateLoading: true };
    case SCORE_UPDATE_REQUEST:
      return { ...state, updateLoading: true, scoreUpdateSuccess: false };
    case SCORE_UPDATE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        scoreUpdateSuccess: true,
        scores:
          state.scores.filter(
            (s) => s._id.toString() === action.payload._id.toString()
          ).length <= 0
            ? [...state.scores, action.payload]
            : state.scores.map((s) =>
                action.payload._id.toString() === s._id ? action.payload : s
              ),
      };

    case H55COSPLAY_LIST_SUCCESS:
      return {
        error: null,
        loading: false,
        cosplays: action.payload.cosplays,
        scores: action.payload.scores,
        scores_all: action.payload.scores_all,

        fbvotes: action.payload.fbvotes,
      };
    case COSER_UPDATE_SUCCESS:
      return {
        error: null,
        updateLoading: false,
        cosplays: state.cosplays.map((coser) =>
          coser._id.toString() === action.payload._id.toString()
            ? { ...coser, ...action.payload }
            : coser
        ),
      };
    case H55COSPLAY_LIST_FAIL:
    case COSER_UPDATE_FAIL:
    case SCORE_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        updateLoading: false,
      };
    default:
      return state;
  }
};


export const cardListReducer = (
  state = { cards: [] },
  action
) => {
  switch (action.type) {
    case H55CARD_LIST_REQUEST:
      return { loading: true };
    case H55CARD_LIST_SUCCESS:
      return { loading: false, cards: action.payload };

    case H55CARD_LIST_FAIL:
      return { loading: false, error: action.payload };
    case H55CARD_LIST_RESET:
      return { cards: [] };
    case H55CARD_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case H55CARD_DELETE_REQUEST:
      return { ...state, loading: true };
    case H55CARD_DELETE_SUCCESS:
      return {
        ...state,
        cards: state.cards.filter((t) => t._id !== action.payload.deleted_id),
        loading: false,
      };

    default:
      return state;
  }
};