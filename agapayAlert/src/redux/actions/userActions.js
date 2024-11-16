import { axiosConfig, server } from "../store";
import axios from "axios";
import {
  EDIT_USER_INFO_REQUEST,
  EDIT_USER_INFO_SUCCESS,
  EDIT_USER_INFO_FAIL,

  CLEAR_ERROR,
  CLEAR_AUTH_STATE,
} from "src/constants/actionTypes";

export const editUserInfo = (userId, formData) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_USER_INFO_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(`${server}/users/${userId}`, formData, config);
    console.log("Updated user data from backend:", data);

    dispatch({
      type: EDIT_USER_INFO_SUCCESS,
      payload: data, // Ensure the updated user data is returned here
    });

    return { payload: data }; // Return the data to be used in the component
  } catch (error) {
    dispatch({
      type: EDIT_USER_INFO_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
    throw error; // Re-throw the error to be caught in the component
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