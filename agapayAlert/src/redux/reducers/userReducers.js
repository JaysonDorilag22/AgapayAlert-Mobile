import { createReducer } from "@reduxjs/toolkit";
import { 
    EDIT_USER_INFO_REQUEST,
    EDIT_USER_INFO_SUCCESS,
    EDIT_USER_INFO_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERROR,
    CLEAR_MESSAGE,
    CLEAR_AUTH_STATE,
 } from "src/constants/actionTypes";
const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const userReducer = createReducer(initialState, (builder) => {
    builder 
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
    .addCase(LOGOUT_REQUEST, (state) => {
        state.loading = true;
        })
    .addCase(LOGOUT_SUCCESS, (state) => {
        state.loading = false;
        state.user = null;
        })
    .addCase(LOGOUT_FAIL, (state, action) => {
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
        state.error = null;
        })
});    


export default userReducer;