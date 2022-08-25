import axios from "axios";
import { uri } from "../Utils/constants";

export const uploadContacts = async (accessToken, file, selectedTags) => {
  const formData = new FormData();
  formData.append("file", file);

  formData.append("tags", JSON.stringify(selectedTags));

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
