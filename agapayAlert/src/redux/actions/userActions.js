import { axiosConfig, server } from "../store";
import axios from "axios";
import {
  EDIT_USER_INFO_REQUEST,
  EDIT_USER_INFO_SUCCESS,
  EDIT_USER_INFO_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERROR,
  CLEAR_AUTH_STATE,
} from "src/constants/actionTypes";
import { asyncHandler } from "@utils/asyncHandler";

const editUserInfoAsync = async (userId, userData) => {
  const formData = new FormData();
  for (const key in userData) {
    formData.append(key, userData[key]);
  }
  const { data } = await axios.put(
    `${server}/api/auth/editUserInfo/${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data.user;
};

const logoutAsync = async () => {
  await axios.post(`${server}/auth/logout`, {}, axiosConfig);
};

export const editUserInfo = asyncHandler( editUserInfoAsync, EDIT_USER_INFO_REQUEST, EDIT_USER_INFO_SUCCESS, EDIT_USER_INFO_FAIL );
export const logout = asyncHandler( logoutAsync, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL );
export const clearError = () => ({ type: CLEAR_ERROR });
export const clearAuthState = () => ({ type: CLEAR_AUTH_STATE });