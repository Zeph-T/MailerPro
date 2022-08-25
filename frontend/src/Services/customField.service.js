import axios from "axios";
import { uri } from "../Utils/constants";

export const getAllCustomFields = async (accessToken) => {
  try {
    const { data } = await axios.get(uri.GET_ALL_CUSTOM_FIELDS_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const addCustomField = async (accessToken, customField) => {
  try {
    const { data } = await axios.post(
      uri.ADD_CUSTOM_FIELD_URL,
      {
        ...customField,
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

export const removeCustomField = async (accessToken, customFieldId) => {
  try {
    const { data } = await axios.post(
      uri.REMOVE_CUSTOM_FIELDS_URL,
      {
        id: customFieldId,
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
