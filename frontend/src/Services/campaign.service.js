import axios from "axios";
import { uri } from "../Utils/constants";

export const createCampaign = async (accessToken, campaignData, isSMS) => {
  try {
    console.log("inside controller createCampaign");
    const { data } = await axios.post(
      isSMS ? uri.CREATE_SMS_CAMPAIGN_URL : uri.CREATE_CAMPAIGN_URL,
      campaignData,
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

export const updateCampaign = async (accessToken, campaignData, id, isSMS) => {
  try {
    console.log(
      "inside controller updateCampaign with campaign Data",
      campaignData
    );
    const { data } = await axios.post(
      isSMS ? uri.UPDATE_SMS_CAMPAIGN_URL : uri.UPDATE_CAMPAIGN_URL,
      { ...campaignData, _id: id },
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

export const getAllCampaigns = async (accessToken, skip) => {
  try {
    console.log("inside controller getAllCampaigns");
    const { data } = await axios.get(uri.GET_ALL_CAMPAIGNS_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        skip,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const getAllSMSCampaigns = async (accessToken, skip) => {
  try {
    console.log("inside controller getAllCampaigns");
    const { data } = await axios.get(uri.GET_ALL_SMS_CAMPAIGNS_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        skip,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const getCampaignById = async (accessToken, id, isSMS) => {
  try {
    const { data } = await axios.get(
      (isSMS ? uri.GET_SMS_CAMPAIGN_BY_ID_URL : uri.GET_CAMPAIGN_BY_ID_URL) +
        "/" +
        id,
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

export const getCampignsStats = async (accessToken, ids) => {
  try {
    const { data } = await axios.post(
      uri.GET_CAMPAIGNS_STATS,
      {
        campaigns: ids,
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
