import axios from "axios";
import { uri } from "../Utils/constants";

export const fetchAllTemplates = (type, accessToken) => {
  return axios.get(uri.GET_ALL_TEMPLATES_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      type,
    },
  });
};

export const createTemplate = (template, type, accessToken) => {
  return axios.post(
    uri.CREATE_TEMPLATE_URL,
    {
      template,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        type,
      },
    }
  );
};

export const updateTemplate = (templateId, accessToken) => {
  return axios.post(
    uri.UPDATE_TEMPLATE_URL,
    {
      templateId,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
