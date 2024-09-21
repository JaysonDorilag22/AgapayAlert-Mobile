import { server } from "../store";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    const { data } = await axios.post(
      `${server}/auth/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: "loginSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "loginFail",
      payload: error.response.data.message,
    });
  }
};

// New signup action
export const signup = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "signupRequest" });

    const { data } = await axios.post(
      `${server}/auth/`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: "signupSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "signupFail",
      payload: error.response?.data?.message || "Something went wrong",
    });
    console.log(error)
  }
};