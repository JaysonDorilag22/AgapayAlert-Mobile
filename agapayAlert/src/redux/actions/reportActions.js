import { axiosConfig, server } from "@redux/store";
import axios from "axios";
import {
  GET_REPORTS_REQUEST,
  GET_REPORTS_SUCCESS,
  GET_REPORTS_FAIL,
  CREATE_REPORT_REQUEST,
  CREATE_REPORT_SUCCESS,
  CREATE_REPORT_FAIL,
  EDIT_REPORT_FAIL,
  EDIT_REPORT_REQUEST,
  EDIT_REPORT_SUCCESS,
  DELETE_REPORT_REQUEST,
  DELETE_REPORT_SUCCESS,
  DELETE_REPORT_FAIL,
  CLEAR_ERROR,
  CLEAR_REPORT_STATE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
} from "src/constants/actionTypes";

export const getReports = () => async (dispatch) => {
  dispatch({ type: GET_REPORTS_REQUEST });
  try {
    const { data } = await axios.get(`${server}/reports/getall`, axiosConfig);
    console.log('Fetched Data:', data);
    dispatch({ type: GET_REPORTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_REPORTS_FAIL, payload: error.message });
  }
};

export const addReport = (reportData) => async (dispatch) => {
  dispatch({ type: CREATE_REPORT_REQUEST });
  try {
    const { data } = await axios.post(`${server}/reports/create`, reportData, axiosConfig);
    dispatch({ type: CREATE_REPORT_SUCCESS, payload: data.report });
  } catch (error) {
    dispatch({ type: CREATE_REPORT_FAIL, payload: error.message });
  }
};

export const updateReport = (reportData) => async (dispatch) => {
  dispatch({ type: EDIT_REPORT_REQUEST });
  try {
    const { data } = await axios.put(`${server}/reports/edit/${reportData._id}`, reportData, axiosConfig);
    dispatch({ type: EDIT_REPORT_SUCCESS, payload: data.report });
  } catch (error) {
    dispatch({ type: EDIT_REPORT_FAIL, payload: error.message });
  }
};

export const deleteReport = (reportId) => async (dispatch) => {
  dispatch({ type: DELETE_REPORT_REQUEST });
  try {
    await axios.delete(`${server}/reports/${reportId}`, axiosConfig);
    dispatch({ type: DELETE_REPORT_SUCCESS, payload: reportId });
  } catch (error) {
    dispatch({ type: DELETE_REPORT_FAIL, payload: error.message });
  }
};

export const postToFacebook = (reportId) => async (dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST });
  try {
    const { data } = await axios.post(`${server}/reports/${reportId}`, axiosConfig);
    dispatch({ type: CREATE_POST_SUCCESS, payload: data.report });
  } catch (error) {
    dispatch({ type: CREATE_POST_FAIL, payload: error.message });
  }
};

export const clearError = () => ({ type: CLEAR_ERROR });
export const clearReportState = () => ({ type: CLEAR_REPORT_STATE });