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

export const createTag = async (accessToken, tag) => {
  try {
    const { data } = await axios.post(
      uri.CREATE_TAG_URL,
      {
        ...tag,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return data;
  } catch (err) {
    throw err;
  }
};

export const updateTag = async (accessToken, tag) => {
  try {
    const { data } = await axios.post(
      uri.UPDATE_TAG_URL,
      {
        ...tag,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return data;
  } catch (err) {
    throw err;
  }
};
