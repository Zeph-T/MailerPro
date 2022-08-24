import axios from "axios";
import { uri } from "../Utils/constants";

export const getContactsList = async (accessToken, skip) => {
  try {
    const { data } = await axios.get(uri.GET_ALL_CONTACTS_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        skip: skip,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};
