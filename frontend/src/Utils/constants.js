const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const uri = {
  SIGNUP_URL: BASE_URL + "/users/register",
  LOGIN_URL: BASE_URL + "/users/login",
  GET_USER_URL: BASE_URL + "/users/",
  GET_ALL_TAGS_URL: BASE_URL + "/tags/all",
  CREATE_TAG_URL: BASE_URL + "/tags/create",
  UPDATE_TAG_URL: BASE_URL + "/tags/update",
  ADD_TAG_TO_CONTACT_URL: BASE_URL + "/tags/addTagToContact",
  REMOVE_TAG_URL: BASE_URL + "/tags/remove",
  GET_ALL_CONTACTS_URL: BASE_URL + "/contact/all",
  ADD_CONTACT_URL: BASE_URL + "/contact/add",
  UPDATE_CONTACT_URL: BASE_URL + "/contact/update",
  REMOVE_CONTACT_URL: BASE_URL + "/contact/remove",
  GET_ALL_CONTACT_FIELDS_URL: BASE_URL + "/contactFields/all",
  CREATE_CONTACT_FIELD_URL: BASE_URL + "/contactFields/create",
  REMOVE_CONTACT_FIELD_URL: BASE_URL + "/contactFields/remove",
  CREATE_CAMPAIGN_URL: BASE_URL + "/campaigns/create",
  UPDATE_CAMPAIGN_URL: BASE_URL + "/campaigns/update",
  GET_ALL_CAMPAIGNS_URL: BASE_URL + "/campaigns",
};
