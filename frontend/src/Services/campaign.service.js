import axios from "axios";
import { uri } from "../Utils/constants";

export const createCampaign = async (accessToken,campaignData) => {
  try {
    console.log("inside controller")
    const { data } = await axios.post(uri.CREATE_CAMPAIGN_URL,campaignData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};
