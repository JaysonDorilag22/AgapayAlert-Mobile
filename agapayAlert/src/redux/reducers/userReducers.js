import { createReducer } from "@reduxjs/toolkit";
import {
  EDIT_USER_INFO_REQUEST,
  EDIT_USER_INFO_SUCCESS,
  EDIT_USER_INFO_FAIL,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAIL,
  CLEAR_ERROR,
  CLEAR_MESSAGE,
  CLEAR_AUTH_STATE,
} from "src/constants/actionTypes";

const initialState = {
  loading: false,
  user: null,
  token: null, // Add token to the initial state
  error: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GET_USER_INFO_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(GET_USER_INFO_SUCCESS, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(GET_USER_INFO_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(EDIT_USER_INFO_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(EDIT_USER_INFO_SUCCESS, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(EDIT_USER_INFO_FAIL, (state, action) => {
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
      state.loading = false;
      state.user = null;
      state.token = null; // Clear token
      state.error = null;
    });
});

export default userReducer;