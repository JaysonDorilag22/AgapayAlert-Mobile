// src/redux/reducers/reportReducers.js
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
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  CLEAR_ERROR,
  CLEAR_REPORT_STATE,
  UPDATE_REPORT_STATUS_REQUEST,
  UPDATE_REPORT_STATUS_SUCCESS,
  UPDATE_REPORT_STATUS_FAIL,
} from "src/constants/actionTypes";

const initialState = {
  reports: [],
  loading: false,
  error: null,
  success: false,
};

const reportReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GET_REPORTS_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(GET_REPORTS_SUCCESS, (state, action) => {
      state.loading = false;
      state.reports = action.payload.reports; // Ensure this matches the structure of the fetched data
    })
    .addCase(GET_REPORTS_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(CREATE_REPORT_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(CREATE_REPORT_SUCCESS, (state, action) => {
      state.loading = false;
      state.reports.push(action.payload);
      state.success = true;
    })
    .addCase(CREATE_REPORT_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(EDIT_REPORT_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(EDIT_REPORT_SUCCESS, (state, action) => {
      state.loading = false;
      state.reports = state.reports.map((report) =>
        report._id === action.payload._id ? action.payload : report
      );
      state.success = true;
    })
    .addCase(EDIT_REPORT_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(DELETE_REPORT_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(DELETE_REPORT_SUCCESS, (state, action) => {
      state.loading = false;
      state.reports = state.reports.filter((report) => report._id !== action.payload);
      state.success = true;
    })
    .addCase(DELETE_REPORT_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(CREATE_POST_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(CREATE_POST_SUCCESS, (state) => {
      state.loading = false;
      state.success = true;
    })
    .addCase(CREATE_POST_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(UPDATE_REPORT_STATUS_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(UPDATE_REPORT_STATUS_SUCCESS, (state, action) => {
      state.loading = false;
      state.reports = state.reports.map((report) =>
        report._id === action.payload._id ? action.payload : report
      );
      state.success = true;
    })
    .addCase(UPDATE_REPORT_STATUS_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(CLEAR_ERROR, (state) => {
      state.error = null;
    })
    .addCase(CLEAR_REPORT_STATE, () => initialState);
});

export default reportReducer;