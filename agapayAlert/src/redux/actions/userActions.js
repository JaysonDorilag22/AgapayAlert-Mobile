import { axiosConfig, server } from "../store";
import axios from "axios";
import {
  EDIT_USER_INFO_REQUEST,
  EDIT_USER_INFO_SUCCESS,
  EDIT_USER_INFO_FAIL,

  CLEAR_ERROR,
  CLEAR_AUTH_STATE,
} from "src/constants/actionTypes";

export const editUserInfo = (userId, userData) => async (dispatch) => {
  dispatch({ type: EDIT_USER_INFO_REQUEST });
  try {
    const formData = new FormData();
    for (const key in userData) {
      formData.append(key, userData[key]);
    }
    const { data } = await axios.put(
      `${server}/api/auth/editUserInfo/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch({ type: EDIT_USER_INFO_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: EDIT_USER_INFO_FAIL, payload: error.response?.data?.message || error.message });
  }
};

export const getUserInfo = (userId) => async (dispatch) => {
  dispatch({ type: EDIT_USER_INFO_REQUEST });
  try {
    const { data } = await axios.get(`${server}/api/auth/${userId}`, axiosConfig);
    dispatch({ type: EDIT_USER_INFO_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: EDIT_USER_INFO_FAIL, payload: error.response?.data?.message || error.message });
  }
};


export const clearError = () => ({ type: CLEAR_ERROR });
export const clearAuthState = () => ({ type: CLEAR_AUTH_STATE });