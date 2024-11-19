import { server, axiosConfig } from "../store";
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAIL,
  RESEND_VERIFICATION_CODE_REQUEST,
  RESEND_VERIFICATION_CODE_SUCCESS,
  RESEND_VERIFICATION_CODE_FAIL,
  CLEAR_ERROR,
  CLEAR_AUTH_STATE
} from "src/constants/actionTypes";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(
      `${server}/auth/login`,
      { email, password },
      axiosConfig
    );
    console.log("Login Success:", data);
    dispatch({ type: LOGIN_SUCCESS, payload: { user: data.user, token: data.token } });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response?.data?.message || error.message });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {
    console.log("Attempting to log out...");
    await axios.post(`${server}/auth/logout`, {}, axiosConfig);
    console.log("Logout successful");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    console.log("Logout failed:", error.response?.data?.message || error.message);
    dispatch({ type: LOGOUT_FAIL, payload: error.response?.data?.message || error.message });
  }
};



export const signup = (formData) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(`${server}/auth/signup`, formData, config);
    dispatch({ type: SIGNUP_SUCCESS, payload: data.data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: SIGNUP_FAIL, payload: errorMessage });
  }
};


export const verifyEmail = (email, code) => async (dispatch) => {
  dispatch({ type: VERIFY_EMAIL_REQUEST });
  try {
    const { data } = await axios.post(
      `${server}/auth/verify`,
      { email, code },
      axiosConfig
    );
    dispatch({ type: VERIFY_EMAIL_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: VERIFY_EMAIL_FAIL, payload: error.response?.data?.message || error.message });
  }
};

export const resendVerificationCode = (email) => async (dispatch) => {
  dispatch({ type: RESEND_VERIFICATION_CODE_REQUEST });
  try {
    const { data } = await axios.post(
      `${server}/auth/resend-verification`,
      { email },
      axiosConfig
    );
    dispatch({ type: RESEND_VERIFICATION_CODE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: RESEND_VERIFICATION_CODE_FAIL, payload: error.response?.data?.message || error.message });
  }
};

export const clearError = () => ({ type: CLEAR_ERROR });
export const clearAuthState = () => ({ type: CLEAR_AUTH_STATE });