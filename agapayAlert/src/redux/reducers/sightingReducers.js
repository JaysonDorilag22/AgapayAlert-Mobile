import { createReducer } from "@reduxjs/toolkit";
import {
    GET_SIGHTINGS_REQUEST,
    GET_SIGHTINGS_SUCCESS,
    GET_SIGHTINGS_FAIL,
    GET_SIGHTINGS_BY_USER_REQUEST,
    GET_SIGHTINGS_BY_USER_SUCCESS,
    GET_SIGHTINGS_BY_USER_FAIL,
    CREATE_SIGHTING_REQUEST,
    CREATE_SIGHTING_SUCCESS,
    CREATE_SIGHTING_FAIL,
    EDIT_SIGHTING_REQUEST,
    EDIT_SIGHTING_SUCCESS,
    EDIT_SIGHTING_FAIL,
    DELETE_SIGHTING_REQUEST,
    DELETE_SIGHTING_SUCCESS,
    DELETE_SIGHTING_FAIL,
    CLEAR_ERROR,
    CLEAR_SIGHTING_STATE,
} from "src/constants/actionTypes";

const initialState = {
    sightings: [],
    loading: false,
    error: null,
};

export const sightingReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(GET_SIGHTINGS_REQUEST, (state) => {
            state.loading = true;
        })
        .addCase(GET_SIGHTINGS_SUCCESS, (state, action) => {
            console.log('Sightings Fetched:', action.payload); // Log the payload
            state.loading = false;
            state.sightings = action.payload;
        })
        .addCase(GET_SIGHTINGS_FAIL, (state, action) => {
            console.log('Sightings Fetch Failed:', action.payload);
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(GET_SIGHTINGS_BY_USER_REQUEST, (state) => {
            state.loading = true;
        })
        .addCase(GET_SIGHTINGS_BY_USER_SUCCESS, (state, action) => {
            console.log('Sightings Fetched:', action.payload); // Log the payload
            state.loading = false;
            state.sightings = action.payload;
        })
        .addCase(GET_SIGHTINGS_BY_USER_FAIL, (state, action) => {
            console.log('Sightings Fetch Failed:', action.payload);
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(CREATE_SIGHTING_REQUEST, (state) => {
            console.log('Creating Sighting...');
            state.loading = true;
        })
        .addCase(CREATE_SIGHTING_SUCCESS, (state, action) => {
            state.loading = false;
            state.sightings.push(action.payload);
            console.log('Sighting Created:', action.payload); // Log the payload
        })
        .addCase(CREATE_SIGHTING_FAIL, (state, action) => {
            console.log('Sighting Creation Failed:', action.payload);
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(EDIT_SIGHTING_REQUEST, (state) => {
            state.loading = true;
        })
        .addCase(EDIT_SIGHTING_SUCCESS, (state, action) => {
            state.loading = false;
            state.sightings = state.sightings.map((sighting) =>
                sighting._id === action.payload._id ? action.payload : sighting
            );
            console.log('Sighting Edited:', action.payload); // Log the payload
        })
        .addCase(EDIT_SIGHTING_FAIL, (state, action) => {
            console.log('Sighting Edit Failed:', action.payload);
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(DELETE_SIGHTING_REQUEST, (state) => {
            state.loading = true;
        })
        .addCase(DELETE_SIGHTING_SUCCESS, (state, action) => {
            state.loading = false;
            state.sightings = state.sightings.filter((sighting) => sighting._id !== action.payload);
            console.log('Sighting Deleted:', action.payload); // Log the payload
        })
        .addCase(DELETE_SIGHTING_FAIL, (state, action
        ) => {
            console.log('Sighting Deletion Failed:', action.payload);
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(CLEAR_ERROR, (state) => {
            state.error = null;
        })
        .addCase(CLEAR_SIGHTING_STATE, (state) => {
            state.sightings = [];
        });
});

export default sightingReducer;