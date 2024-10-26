import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const userReducer = createReducer(initialState, (builder) => {
    builder 
    .addCase("editUserInfoRequest", (state) => {
      state.loading = true;
    })
    .addCase("editUserInfoSuccess", (state, action) => {
        state.loading = false;
        state.user = action.payload;
        })
    .addCase("editUserInfoFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
        })
    .addCase("logoutRequest", (state) => {
        state.loading = true;
        })
    .addCase("logoutSuccess", (state) => {
        state.loading = false;
        state.user = null;
        })
    .addCase("logoutFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
        })
});    


export default userReducer;