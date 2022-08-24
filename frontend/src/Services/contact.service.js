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

export const addContact = async (accessToken, contact) => {
  try {
    const { data } = await axios.post(uri.ADD_CONTACT_URL, contact, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const updateContact = async (accessToken, contact) => {
  try {
    const { data } = await axios.post(uri.UPDATE_CONTACT_URL, contact, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};
