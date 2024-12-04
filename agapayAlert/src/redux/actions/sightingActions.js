import { axiosConfig, server } from "@redux/store";
import axios from "axios";
import {
    GET_SIGHTINGS_REQUEST,
    GET_SIGHTINGS_SUCCESS,
    GET_SIGHTINGS_FAIL,
    GET_SIGHTINGS_BY_USER_REQUEST,
    GET_SIGHTINGS_BY_USER_SUCCESS,
    GET_SIGHTINGS_BY_USER_FAIL,
    GET_SINGLE_SIGHTING_REQUEST,
    GET_SINGLE_SIGHTING_SUCCESS,
    GET_SINGLE_SIGHTING_FAIL,
    CREATE_SIGHTING_REQUEST,
    CREATE_SIGHTING_SUCCESS,
    CREATE_SIGHTING_FAIL,
    EDIT_SIGHTING_FAIL,
    EDIT_SIGHTING_REQUEST,
    EDIT_SIGHTING_SUCCESS,
    DELETE_SIGHTING_REQUEST,
    DELETE_SIGHTING_SUCCESS,
    CLEAR_ERROR,
    CLEAR_SIGHTING_STATE,
} from "src/constants/actionTypes";

export const getSightings = () => async (dispatch) => {
    dispatch({ type: GET_SIGHTINGS_REQUEST });
    try {
        const { data } = await axios.get(`${server}/sightings/getall`, axiosConfig);
        console.log('Fetched Data:', data);
        dispatch({ type: GET_SIGHTINGS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_SIGHTINGS_FAIL, payload: error.message });
    }
};

export const getSightingsByUser = () => async (dispatch) => {
    dispatch({ type: GET_SIGHTINGS_BY_USER_REQUEST });
    try {
        const { data } = await axios.get(`${server}/sightings/byuser`, axiosConfig);
        console.log('Fetched Data:', data);
        dispatch({ type: GET_SIGHTINGS_BY_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_SIGHTINGS_BY_USER_FAIL, payload: error.message });
    }
};

export const getSingleSighting = (sightingId) => async (dispatch) => {
    dispatch({ type: GET_SINGLE_SIGHTING_REQUEST });
    try {
        const { data } = await axios.get(`${server}/sightings/get/${sightingId}`, axiosConfig);
        console.log('Fetched Data:', data);
        dispatch({ type: GET_SINGLE_SIGHTING_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_SINGLE_SIGHTING_FAIL, payload: error.message });
    }
};
    

export const addSighting = (formData) => async (dispatch) => {
    dispatch({ type: CREATE_SIGHTING_REQUEST });
    try {
        /* const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }; */

        console.log('Sending request to:', `${server}/sightings/create`);

        const response = await axios.post(`${server}/sightings/create`, formData, axiosConfig);

        console.log('Response:', response);
        if (response.status === 201) {
            dispatch({ type: CREATE_SIGHTING_SUCCESS, payload: response.data });
        } else {
            console.error('Unexpected response status:', response.status);
            dispatch({ type: CREATE_SIGHTING_FAIL, payload: 'Failed to create sighting' });
        }
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({ type: CREATE_SIGHTING_FAIL, payload: errorMessage});
    }  
};

export const updateSighting = (formData) => async (dispatch) => {
    dispatch({ type: EDIT_SIGHTING_REQUEST });
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        console.log('Sending request to:', `${server}/sightings/update/${formData.get('sightingId')}`);

        const response = await axios.put(`${server}/sightings/update/${formData.get('sightingId')}`, formData, config);

        console.log('Response:', response);
        if (response.status === 200) {
            dispatch({ type: EDIT_SIGHTING_SUCCESS, payload: response.data });
        } else {
            console.error('Unexpected response status:', response.status);
            dispatch({ type: EDIT_SIGHTING_FAIL, payload: 'Failed to update sighting' });
        }
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({ type: EDIT_SIGHTING_FAIL, payload: error.message });
    }
};

export const deleteSighting = (sightingId) => async (dispatch) => {
    dispatch({ type: DELETE_SIGHTING_REQUEST });
    try {
        await axios.delete(`${server}/sightings/delete/${sightingId}`, axiosConfig);
        dispatch({ type: DELETE_SIGHTING_SUCCESS, payload: sightingId });
    } catch (error) {
        dispatch({ type: DELETE_SIGHTING_FAIL, payload: error.message });
    }
};

export const clearError = () => ({ type: CLEAR_ERROR });
export const clearReportState = () => ({ type: CLEAR_SIGHTING_STATE });