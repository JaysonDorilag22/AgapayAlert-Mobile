import { axiosConfig, server } from "../store";
import axios from "axios";

export const editUserInfo = (userId, userData) => async (dispatch) => {
  try {
    dispatch({ type: "editUserInfoRequest" });

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
    dispatch({
      type: "editUserInfoSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "editUserInfoFail",
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });
    await axios.post(`${server}/auth/logout`, {}, axiosConfig);
    dispatch({ type: "logoutSuccess" });
  } catch (error) {
    dispatch({ type: "logoutFail", payload: error.response.data.message });
  }
};
