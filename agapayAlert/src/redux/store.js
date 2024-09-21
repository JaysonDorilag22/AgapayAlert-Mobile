import { configureStore } from '@reduxjs/toolkit';
import sampleReducer from './slices/sampleSlice';
import { authReducer } from './reducers/authReducers';

const store = configureStore({
  reducer: {
    sample: sampleReducer,
    auth: authReducer,
  },
});

// export const server = "http://192.168.254.150:5000/api/";
export const server = "https://agapayalert-api.onrender.com/api";

export default store;