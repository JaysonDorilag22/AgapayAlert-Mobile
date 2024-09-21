// redux/reducers/authReducer.js
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  isSignedUp: false,
  message: null,
  error: null,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("loginRequest", (state) => {
      state.loading = true;
    })
    .addCase("loginSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.message = action.payload;
    })
    .addCase("loginFail", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase("signupRequest", (state) => {
      state.loading = true;
    })
    .addCase("signupSuccess", (state, action) => {
      state.loading = false;
      state.isSignedUp = true;
      state.message = action.payload;
    })
    .addCase("signupFail", (state, action) => {
      state.loading = false;
      state.isSignedUp = false;
      state.error = action.payload;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    })
    .addCase("clearMessage", (state) => {
      state.message = null;
    });
});