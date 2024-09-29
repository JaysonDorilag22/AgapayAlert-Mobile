import axios from "axios";
import { server } from "../store";

export const editUserInfo = (userId, userData) => async (dispatch) => {
    try {
      dispatch({ type: "editUserInfoRequest" });
  
      const formData = new FormData();
      for (const key in userData) {
        formData.append(key, userData[key]);
      }
  
      const { data } = await axios.put(`/api/auth/editUserInfo/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
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
  export const getUserInfo = (userId)