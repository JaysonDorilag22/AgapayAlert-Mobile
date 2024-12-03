import { createReducer } from '@reduxjs/toolkit';
import {
  CREATE_ALPR_REQUEST,
  CREATE_ALPR_SUCCESS,
  CREATE_ALPR_FAIL,
  GET_ALPR_REQUEST,
  GET_ALPR_SUCCESS,
  GET_ALPR_FAIL,
  RECOGNIZE_PLATE_REQUEST,
  RECOGNIZE_PLATE_SUCCESS,
  RECOGNIZE_PLATE_FAIL,
} from 'src/constants/actionTypes';

const initialState = {
  loading: false,
  alprData: null,
  plateData: null,
  error: null,
};

export const alprReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(CREATE_ALPR_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(CREATE_ALPR_SUCCESS, (state, action) => {
      state.loading = false;
      state.alprData = action.payload;
    })
    .addCase(CREATE_ALPR_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(GET_ALPR_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(GET_ALPR_SUCCESS, (state, action) => {
      state.loading = false;
      state.alprData = action.payload;
    })
    .addCase(GET_ALPR_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(RECOGNIZE_PLATE_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(RECOGNIZE_PLATE_SUCCESS, (state, action) => {
      state.loading = false;
      state.plateData = action.payload;
    })
    .addCase(RECOGNIZE_PLATE_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});