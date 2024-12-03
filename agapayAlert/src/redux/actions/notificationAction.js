import axios from "axios";
import { axiosConfig, server } from "@redux/store";
import {
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAIL,
  SEND_PUSH_NOTIFICATION_REQUEST,
  SEND_PUSH_NOTIFICATION_SUCCESS,
  SEND_PUSH_NOTIFICATION_FAIL,
} from "src/constants/actionTypes";

// Action to send email notification
export const sendEmailNotification = (emailData) => async (dispatch) => {
  dispatch({ type: SEND_EMAIL_REQUEST });
  try {
    const { data } = await axios.post(`${server}/notifications/email`, emailData, axiosConfig);
    dispatch({ type: SEND_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SEND_EMAIL_FAIL, payload: error.message });
  }
};

// Action to send push notification
export const sendPushNotification = (pushData) => async (dispatch) => {
  dispatch({ type: SEND_PUSH_NOTIFICATION_REQUEST });
  try {
    const { data } = await axios.post(`${server}/notifications/create`, pushData, axiosConfig);
    dispatch({ type: SEND_PUSH_NOTIFICATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SEND_PUSH_NOTIFICATION_FAIL, payload: error.message });
  }
};