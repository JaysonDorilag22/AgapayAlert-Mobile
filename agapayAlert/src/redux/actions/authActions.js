import { server, axiosConfig } from "../store";
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
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
import { asyncHandler } from "@utils/asyncHandler";



const loginAsync = async (email, password) => {
  const { data } = await axios.post(
    `${server}/auth/login`,
    { email, password },
    axiosConfig
  );
  return data.message;
};

const signupAsync = async (userData) => {
  const { data } = await axios.post(
    `${server}/auth/signup`,
    userData,
    axiosConfig
  );
  return data.message;
};

const verifyEmailAsync = async (email, code) => {
  const { data } = await axios.post(
    `${server}/auth/verify`,
    { email, code },
    axiosConfig
  );
  return data.message;
}

const resendVerificationCodeAsync = async (email) => {
  const { data } = await axios.post(
    `${server}/auth/resend-verification`,
    { email },
    axiosConfig
  );
  return data.message;
}

// export const login = (email, password) => async (dispatch) => {
//   try {
//     dispatch({
//       type: LOGIN_REQUEST,
//     });
//     const { data } = await axios.post(
//       `${server}/auth/login`,
//       {
//         email,
//         password,
//       },
//       axiosConfig
//     );
//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: LOGIN_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// New signup action
// export const signup = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: SIGNUP_REQUEST });
//     const { data } = await axios.post(
//       `${server}/auth/`,
//       userData,
//       axiosConfig
//     );
//     dispatch({
//       type: SIGNUP_SUCCESS,
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: SIGNUP_FAIL,
//       payload: error.response?.data?.message,
//     });
//     console.log(error)
//   }
// };

// Verify email action
// export const verifyEmail = (email, code) => async (dispatch) => {
//   try {
//     dispatch({ type: VERIFY_EMAIL_REQUEST });
//     const { data } = await axios.post(
//       `${server}/auth/verify`,
//       { email, code },
//       axiosConfig

//     );
//     dispatch({
//       type: VERIFY_EMAIL_SUCCESS,
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: VERIFY_EMAIL_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Resend verification code action
// export const resendVerificationCode = (email) => async (dispatch) => {
//   try {
//     dispatch({ type: RESEND_VERIFICATION_CODE_REQUEST });
//     const { data } = await axios.post(
//       `${server}/auth/resend-verification`,
//       { email },
//       axiosConfig
//     );
//     dispatch({
//       type: RESEND_VERIFICATION_CODE_SUCCESS,
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: RESEND_VERIFICATION_CODE_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };


export const login = asyncHandler(loginAsync, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL);
export const signup = asyncHandler(signupAsync, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL);
export const verifyEmail = asyncHandler(verifyEmailAsync, VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAIL);
export const resendVerificationCode = asyncHandler(resendVerificationCodeAsync, RESEND_VERIFICATION_CODE_REQUEST, RESEND_VERIFICATION_CODE_SUCCESS, RESEND_VERIFICATION_CODE_FAIL);
export const clearError = () => ({ type: CLEAR_ERROR });
export const clearAuthState = () => ({ type: CLEAR_AUTH_STATE });