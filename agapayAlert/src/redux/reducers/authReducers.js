import { createReducer } from "@reduxjs/toolkit";
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
  CLEAR_MESSAGE,
  CLEAR_AUTH_STATE,
} from "src/constants/actionTypes";

const initialState = {
  loading: false,
  isAuthenticated: false,
  isSignedUp: false,
  user: null, // Add user to the initial state
  token: null, // Add token to the initial state
  message: null,
  error: null,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(LOGIN_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(LOGIN_SUCCESS, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user; // Set user data
      state.token = action.payload.token; // Set token
      state.message = action.payload.message;
    })
    .addCase(LOGIN_FAIL, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase(LOGOUT_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(LOGOUT_SUCCESS, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null; // Clear user data
      state.token = null; // Clear token
      state.error = null; // Clear any existing errors
    })
    .addCase(LOGOUT_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(SIGNUP_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(SIGNUP_SUCCESS, (state, action) => {
      state.loading = false;
      state.isSignedUp = true;
      state.message = action.payload;
    })
    .addCase(SIGNUP_FAIL, (state, action) => {
      state.loading = false;
      state.isSignedUp = false;
      state.error = action.payload;
    })
    .addCase(VERIFY_EMAIL_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(VERIFY_EMAIL_SUCCESS, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(VERIFY_EMAIL_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(RESEND_VERIFICATION_CODE_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(RESEND_VERIFICATION_CODE_SUCCESS, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(RESEND_VERIFICATION_CODE_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(CLEAR_ERROR, (state) => {
      state.error = null;
    })
    .addCase(CLEAR_MESSAGE, (state) => {
      state.message = null;
    })
    .addCase(CLEAR_AUTH_STATE, (state) => {
      state.isAuthenticated = false;
      state.user = null; // Clear user data
      state.token = null; // Clear token
      state.error = null;
    });
});

export default authReducer;