import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducers';
import { userReducer } from './reducers/userReducers';
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

//bahay
// export const server = "http://192.168.254.157:5000/api";


//kapehan
// export const server = "http://192.168.68.107:5000/api";


//phone ko
export const server = "http://192.168.115.191:5000/api";


// export const server = "https://agapayalert-api.onrender.com/api";


export const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export default store;