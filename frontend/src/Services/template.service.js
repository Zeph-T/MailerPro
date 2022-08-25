import axios from "axios";
import { uri } from "../Utils/constants";

export const fetchAllTemplates = (type, accessToken, skip) => {
  return axios.get(uri.GET_ALL_TEMPLATES_URL + `/${type}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      skip,
    },
  });
};

export const createTemplate = (template, type, accessToken) => {
  return axios.post(uri.CREATE_TEMPLATE_URL + `/${type}`, template, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateTemplate = (template, accessToken) => {
  return axios.post(uri.UPDATE_TEMPLATE_URL, template, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteTemplate = (templateId, accessToken) => {
  return axios.post(
    uri.REMOVE_TEMPLATE_URL,
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

export const getTemplate = (templateId, accessToken) => {
  return axios.get(uri.GET_TEMPLATE_URL + `/${templateId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
