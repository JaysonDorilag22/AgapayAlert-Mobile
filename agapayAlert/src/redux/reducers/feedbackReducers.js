import { createReducer } from '@reduxjs/toolkit';
import {
  CREATE_FEEDBACK_REQUEST,
  CREATE_FEEDBACK_SUCCESS,
  CREATE_FEEDBACK_FAIL,
  GET_FEEDBACK_REQUEST,
  GET_FEEDBACK_SUCCESS,
  GET_FEEDBACK_FAIL,
  GET_ALL_FEEDBACK_REQUEST,
  GET_ALL_FEEDBACK_SUCCESS,
  GET_ALL_FEEDBACK_FAIL,
  GET_USER_FEEDBACK_REQUEST,
  GET_USER_FEEDBACK_SUCCESS,
  GET_USER_FEEDBACK_FAIL,
  UPDATE_FEEDBACK_REQUEST,
  UPDATE_FEEDBACK_SUCCESS,
  UPDATE_FEEDBACK_FAIL,
  DELETE_FEEDBACK_REQUEST,
  DELETE_FEEDBACK_SUCCESS,
  DELETE_FEEDBACK_FAIL,
  GET_OVERALL_RATINGS_REQUEST,
  GET_OVERALL_RATINGS_SUCCESS,
  GET_OVERALL_RATINGS_FAIL
} from "src/constants/actionTypes";

const initialState = {
  feedback: [],
  userFeedback: [],
  overallRatings: null,
  loading: false,
  error: null,
};

export const feedbackReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(CREATE_FEEDBACK_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(CREATE_FEEDBACK_SUCCESS, (state, action) => {
      state.loading = false;
      state.feedback.push(action.payload);
    })
    .addCase(CREATE_FEEDBACK_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(GET_FEEDBACK_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(GET_FEEDBACK_SUCCESS, (state, action) => {
      state.loading = false;
      state.feedback = action.payload;
    })
    .addCase(GET_FEEDBACK_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(GET_ALL_FEEDBACK_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(GET_ALL_FEEDBACK_SUCCESS, (state, action) => {
      console.log('Feedback Fetched:', action.payload); // Log the payload
      state.loading = false;
      state.feedback = action.payload;
    })
    .addCase(GET_ALL_FEEDBACK_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(GET_USER_FEEDBACK_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(GET_USER_FEEDBACK_SUCCESS, (state, action) => {
      console.log('User Feedback Fetched:', action.payload); // Log the payload
      state.loading = false;
      state.userFeedback = action.payload;
    })
    .addCase(GET_USER_FEEDBACK_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(UPDATE_FEEDBACK_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(UPDATE_FEEDBACK_SUCCESS, (state, action) => {
      state.loading = false;
      state.feedback = state.feedback.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    })
    .addCase(UPDATE_FEEDBACK_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(DELETE_FEEDBACK_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(DELETE_FEEDBACK_SUCCESS, (state, action) => {
      state.loading = false;
      state.feedback = state.feedback.filter((item) => item._id !== action.payload);
    })
    .addCase(DELETE_FEEDBACK_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(GET_OVERALL_RATINGS_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(GET_OVERALL_RATINGS_SUCCESS, (state, action) => {
      console.log('Overall Ratings Fetched:', action.payload); // Log the payload
      state.loading = false;
      state.overallRatings = action.payload;
    })
    .addCase(GET_OVERALL_RATINGS_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});