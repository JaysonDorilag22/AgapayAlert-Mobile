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
  UPDATE_REPORT_STATUS_REQUEST,
  UPDATE_REPORT_STATUS_SUCCESS,
  UPDATE_REPORT_STATUS_FAIL,
} from "src/constants/actionTypes";


export const updateReportStatus = (reportId, status) => async (dispatch) => {
  dispatch({ type: UPDATE_REPORT_STATUS_REQUEST });
  try {
    const { data } = await axios.put(`${server}/reports/status/${reportId}`, { status }, axiosConfig);
    dispatch({ type: UPDATE_REPORT_STATUS_SUCCESS, payload: data.report });
  } catch (error) {
    dispatch({ type: UPDATE_REPORT_STATUS_FAIL, payload: error.message });
  }
};

export const getReports = () => async (dispatch) => {
  dispatch({ type: GET_REPORTS_REQUEST });
  try {
    const { data } = await axios.get(`${server}/reports/getall`, axiosConfig);
    dispatch({ type: GET_REPORTS_SUCCESS, payload: data.data }); // Ensure payload is the reports array
    console.log('Data:', data);
    return data; // Return the data
  } catch (error) {
    dispatch({ type: GET_REPORTS_FAIL, payload: error.message });
    throw error; // Throw the error to be caught in the component
  }
};

export const createReport = (formData) => async (dispatch) => {
  dispatch({ type: CREATE_REPORT_REQUEST });
  try {
    const { data } = await axios.post(`${server}/reports/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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