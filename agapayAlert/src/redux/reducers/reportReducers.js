import { createReducer } from '@reduxjs/toolkit';
import {
  GET_REPORTS_REQUEST,
  GET_REPORTS_SUCCESS,
  GET_REPORTS_FAIL,
  CREATE_REPORT_REQUEST,
  CREATE_REPORT_SUCCESS,
  CREATE_REPORT_FAIL,
  EDIT_REPORT_REQUEST,
  EDIT_REPORT_SUCCESS,
  EDIT_REPORT_FAIL,
  DELETE_REPORT_REQUEST,
  DELETE_REPORT_SUCCESS,
  DELETE_REPORT_FAIL,
  CLEAR_ERROR,
  CLEAR_REPORT_STATE,
} from "src/constants/actionTypes";

const initialState = {
  reports: [],
  loading: false,
  error: null,
};

export const reportReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GET_REPORTS_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(GET_REPORTS_SUCCESS, (state, action) => {
      console.log('Reports Fetched:', action.payload); // Log the payload
      state.loading = false;
      state.reports = action.payload;
    })
    .addCase(GET_REPORTS_FAIL, (state, action) => {
      console.log('Reports Fetch Failed:', action.payload);
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(CREATE_REPORT_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(CREATE_REPORT_SUCCESS, (state, action) => {
      state.loading = false;
      state.reports.push(action.payload);
    })
    .addCase(CREATE_REPORT_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(EDIT_REPORT_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(EDIT_REPORT_SUCCESS, (state, action) => {
      state.loading = false;
      state.reports = state.reports.map((report) =>
        report._id === action.payload._id ? action.payload : report
      );
    })
    .addCase(EDIT_REPORT_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(DELETE_REPORT_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(DELETE_REPORT_SUCCESS, (state, action) => {
      state.loading = false;
      state.reports = state.reports.filter((report) => report._id !== action.payload);
    })
    .addCase(DELETE_REPORT_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(CLEAR_ERROR, (state) => {
      state.error = null;
    })
});

export default reportReducer;