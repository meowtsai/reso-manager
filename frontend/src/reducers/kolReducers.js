import {
  KOL_LIST_REQUEST,
  KOL_LIST_SUCCESS,
  KOL_LIST_FAIL,
} from "../constants/kolConstants";

export const kolListReducer = (
  state = { kols: [], KolTrackingLogYesterday: [] },
  action
) => {
  switch (action.type) {
    case KOL_LIST_REQUEST:
      return { loading: true };
    case KOL_LIST_SUCCESS:
      return {
        loading: false,
        kols: action.payload.kols,
        KolTrackingLogYesterday: action.payload.KolTrackingLogYesterday,
      };
    case KOL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
