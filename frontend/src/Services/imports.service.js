import axios from "axios";
import { uri } from "../Utils/constants";

export const uploadContacts = async (accessToken, file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await axios.post(uri.UPLOAD_CONTACTS_URL, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};
