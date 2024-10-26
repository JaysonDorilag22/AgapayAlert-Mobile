import { server, axiosConfig } from "../store";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });
    const { data } = await axios.post(
      `${server}/auth/login`,
      {
        email,
        password,
      },
      axiosConfig
    );
    dispatch({
      type: "loginSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "loginFail",
      payload: error.response.data.message,
    });
  }
};

// New signup action
export const signup = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "signupRequest" });
    const { data } = await axios.post(
      `${server}/auth/`,
      userData,
      axiosConfig
    );
    dispatch({
      type: "signupSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "signupFail",
      payload: error.response?.data?.message,
    });
    console.log(error)
  }
};

// Verify email action
export const verifyEmail = (email, code) => async (dispatch) => {
  try {
    dispatch({ type: "verifyEmailRequest" });
    const { data } = await axios.post(
      `${server}/auth/verify`,
      { email, code },
      axiosConfig

    );
    dispatch({
      type: "verifyEmailSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "verifyEmailFail",
      payload: error.response.data.message,
    });
  }
};

// Resend verification code action
export const resendVerificationCode = (email) => async (dispatch) => {
  try {
    dispatch({ type: "resendVerificationCodeRequest" });
    const { data } = await axios.post(
      `${server}/auth/resend-verification`,
      { email },
      axiosConfig
    );
    dispatch({
      type: "resendVerificationCodeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "resendVerificationCodeFail",
      payload: error.response.data.message,
    });
  }
};