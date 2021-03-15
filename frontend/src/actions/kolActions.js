import axios from "axios";
import {
  KOL_LIST_REQUEST,
  KOL_LIST_SUCCESS,
  KOL_LIST_FAIL,
} from "../constants/kolConstants";
import { logout } from "./userActions";

export const listKols = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: KOL_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/kol`, config);

    dispatch({
      type: KOL_LIST_SUCCESS,
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
      type: KOL_LIST_FAIL,
      payload: message,
    });
  }
};
