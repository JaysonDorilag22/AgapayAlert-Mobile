import axios from 'axios';
import { server, axiosConfig } from "@redux/store";

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

// Create Feedback
export const createFeedback = (feedbackData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_FEEDBACK_REQUEST });

    const response = await axios.post(`${server}/feedbacks/create`, feedbackData, axiosConfig);

    if (response.status !== 201) {
      throw new Error('Failed to create feedback');
    }

    dispatch({
      type: CREATE_FEEDBACK_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error creating feedback:', error); // Log the error
    dispatch({
      type: CREATE_FEEDBACK_FAIL,
      payload: error.message,
    });
  }
};

// Get Feedback by ID
export const getFeedback = (feedbackId) => async (dispatch) => {
  try {
    dispatch({ type: GET_FEEDBACK_REQUEST });

    const response = await axios.get(`${server}/feedbacks/${feedbackId}`, axiosConfig);

    dispatch({
      type: GET_FEEDBACK_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_FEEDBACK_FAIL,
      payload: error.message,
    });
  }
};

// Get All Feedbacks
// Get All Feedbacks
export const getAllFeedback = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_FEEDBACK_REQUEST });

    const response = await axios.get(`${server}/feedbacks`, axiosConfig);

    // Convert the object to an array
    const feedbackArray = Object.values(response.data);

    dispatch({
      type: GET_ALL_FEEDBACK_SUCCESS,
      payload: feedbackArray,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_FEEDBACK_FAIL,
      payload: error.message,
    });
  }
};

// Get User Feedbacks
// Get User Feedbacks
export const getUserFeedback = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_FEEDBACK_REQUEST });

    const response = await axios.get(`${server}/feedbacks/user/${userId}`, axiosConfig);

    // Convert the object to an array
    const feedbackArray = Object.values(response.data);

    dispatch({
      type: GET_USER_FEEDBACK_SUCCESS,
      payload: feedbackArray,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      dispatch({
        type: GET_USER_FEEDBACK_SUCCESS,
        payload: [],
      });
    } else {
      dispatch({
        type: GET_USER_FEEDBACK_FAIL,
        payload: error.message,
      });
    }
  }
};
// Update Feedback
export const updateFeedback = (feedbackId, feedbackData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_FEEDBACK_REQUEST });

    const response = await axios.put(`${server}/feedbacks/${feedbackId}`, feedbackData, axiosConfig);

    dispatch({
      type: UPDATE_FEEDBACK_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_FEEDBACK_FAIL,
      payload: error.message,
    });
  }
};

// Delete Feedback
export const deleteFeedback = (feedbackId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_FEEDBACK_REQUEST });

    await axios.delete(`${server}/feedbacks/delete/${feedbackId}`, axiosConfig);

    dispatch({
      type: DELETE_FEEDBACK_SUCCESS,
      payload: feedbackId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_FEEDBACK_FAIL,
      payload: error.message,
    });
  }
};

// Get Overall Ratings
export const getOverallRatings = () => async (dispatch) => {
  try {
    dispatch({ type: GET_OVERALL_RATINGS_REQUEST });

    const response = await axios.get(`${server}/feedbacks/overall-ratings`, axiosConfig);

    dispatch({
      type: GET_OVERALL_RATINGS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_OVERALL_RATINGS_FAIL,
      payload: error.message,
    });
  }
};