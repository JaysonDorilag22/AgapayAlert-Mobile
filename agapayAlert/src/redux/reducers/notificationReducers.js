import { createReducer } from '@reduxjs/toolkit';
import {
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAIL,
  SEND_PUSH_NOTIFICATION_REQUEST,
  SEND_PUSH_NOTIFICATION_SUCCESS,
  SEND_PUSH_NOTIFICATION_FAIL,
} from "src/constants/actionTypes";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const emailNotificationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SEND_EMAIL_REQUEST, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    })
    .addCase(SEND_EMAIL_SUCCESS, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    })
    .addCase(SEND_EMAIL_FAIL, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
});

export const pushNotificationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SEND_PUSH_NOTIFICATION_REQUEST, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    })
    .addCase(SEND_PUSH_NOTIFICATION_SUCCESS, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    })
    .addCase(SEND_PUSH_NOTIFICATION_FAIL, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
});