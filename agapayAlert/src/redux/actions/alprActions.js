import { axiosConfig, server } from "@redux/store";
import axios from 'axios';
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

// Action to create ALPR
export const createALPR = (alprData) => async (dispatch) => {
  dispatch({ type: CREATE_ALPR_REQUEST });
  try {
    const { data } = await axios.post(`${server}/alprs`, alprData, axiosConfig);
    dispatch({ type: CREATE_ALPR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_ALPR_FAIL, payload: error.message });
  }
};

// Action to get ALPR by ID
export const getALPR = (id) => async (dispatch) => {
  dispatch({ type: GET_ALPR_REQUEST });
  try {
    const { data } = await axios.get(`${server}/alprs/${id}`, axiosConfig);
    dispatch({ type: GET_ALPR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALPR_FAIL, payload: error.message });
  }
};

// Action to recognize plate
export const recognizePlate = (image) => async (dispatch) => {
  dispatch({ type: RECOGNIZE_PLATE_REQUEST });
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      type: image.type,
      name: image.name,
    });

    const { data } = await axios.post(`${server}/alprs/recognize`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({ type: RECOGNIZE_PLATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RECOGNIZE_PLATE_FAIL, payload: error.message });
  }
};