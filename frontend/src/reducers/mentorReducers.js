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
  MENTOR_DETAILS_RESET,
  MENTOR_UPDATE_REQUEST,
  MENTOR_UPDATE_SUCCESS,
  MENTOR_UPDATE_FAIL,
  MENTOR_UPDATE_RESET,
  COURSE_REGISTER_LIST_REQUEST,
  COURSE_REGISTER_LIST_SUCCESS,
  COURSE_REGISTER_LIST_FAIL,
  REGISTER_UPDATE_REQUEST,
  REGISTER_UPDATE_SUCCESS,
  REGISTER_UPDATE_FAIL,
} from "../constants/mentorsConstants";

export const gameListReducer = (state = { games: [], mentors: [] }, action) => {
  switch (action.type) {
    case GAME_LIST_REQUEST:
      return { loading: true };
    case GAME_LIST_SUCCESS:
      return {
        loading: false,
        games: action.payload.games,
        mentors: action.payload.mentors,
      };
    case GAME_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mentorListReducer = (state = { mentors: [] }, action) => {
  switch (action.type) {
    case MENTOR_LIST_REQUEST:
      return { loading: true };
    case MENTOR_LIST_SUCCESS:
      return {
        loading: false,
        mentors: action.payload,
      };
    case MENTOR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mentorDetailsReducer = (state = { mentor: {} }, action) => {
  switch (action.type) {
    case MENTOR_DETAILS_REQUEST:
      return { ...state, loading: true };
    case MENTOR_DETAILS_SUCCESS:
      return { loading: false, mentor: action.payload };
    case MENTOR_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case MENTOR_DETAILS_RESET:
      return { mentor: {} };
    default:
      return state;
  }
};

export const mentorUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case MENTOR_UPDATE_REQUEST:
      return { loading: true };
    case MENTOR_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case MENTOR_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case MENTOR_UPDATE_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const registerListReducer = (
  state = { games: [], mentors: [], registers: [], wirereports: [] },
  action
) => {
  //console.log("registerListReducer", action.type, action.payload);
  switch (action.type) {
    case COURSE_REGISTER_LIST_REQUEST:
    case REGISTER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case COURSE_REGISTER_LIST_SUCCESS:
      return {
        loading: false,
        registers: action.payload.registers,
        games: action.payload.games,
        mentors: action.payload.mentors,
        wirereports: action.payload.wirereports,
      };
    case REGISTER_UPDATE_SUCCESS:
      return {
        ...state,
        updateError: null,
        loading: false,
        record: action.payload,
        registers: state.registers.map((r) =>
          r._id === action.payload._id ? action.payload : r
        ),
      };
    case COURSE_REGISTER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case REGISTER_UPDATE_FAIL:
      return { ...state, loading: false, updateError: action.payload };

    default:
      return state;
  }
};
