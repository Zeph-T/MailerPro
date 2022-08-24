import axios from "axios";
import { uri } from "../Utils/constants";

export const getAllTags = async (accessToken) => {
  try {
    const { data } = await axios.get(uri.GET_ALL_TAGS_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};
