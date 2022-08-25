import axios from "axios";
import { uri } from "../Utils/constants";

export const createCampaign = async (accessToken,campaignData) => {
  try {
    console.log("inside controller createCampaign")
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

export const updateCampaign = async (accessToken,campaignData,id) => {
  try {
    console.log("inside controller updateCampaign with campaign Data",campaignData)
    const { data } = await axios.post(uri.UPDATE_CAMPAIGN_URL,{...campaignData,_id:id}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }

}
