import axios from "axios";
import { uri } from "../Utils/constants";

export const register = async (userData) => {
  try {
    const { data } = await axios.post(uri.SIGNUP_URL, {
      ...userData,
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const login = async (userData) => {
  try {
    const { data } = await axios.post(uri.LOGIN_URL, {
      ...userData,
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const getUserData = async (accessToken) => {
  try {
    const { data } = await axios.get(uri.GET_USER_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};
