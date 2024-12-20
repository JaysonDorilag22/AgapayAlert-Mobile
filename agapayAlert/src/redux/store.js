import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducers';
import { userReducer } from './reducers/userReducers';
import { reportReducer } from './reducers/reportReducers';
import { pushNotificationReducer } from './reducers/notificationReducers';
import { alprReducer } from './reducers/alprReducers';
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    report: reportReducer,
    notification: pushNotificationReducer,
    alpr: alprReducer,
  },
});

//bahay
// export const server = "http://192.168.254.157:5000/api";


//kapehan
// export const server = "http://192.168.68.113:5000/api";

// jm haus
// export const server = "http://192.168.0.57:5000/api";

//phone ko
// export const server = "http://192.168.115.191:5000/api";

// wanel haus
export const server = "http://192.168.169.191:5000/api";

//wanel cp
// export const server = "http://192.168.43.129:5000/api";


// export const server = "https://agapayalert-api.onrender.com/api";


export const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export default store;