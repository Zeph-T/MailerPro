const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
const BASE_IMPORTS_URL =
  import.meta.env.VITE_BACKEND_IMPORTS_URL || "http://localhost:4040";

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
  UPDATE_USER_URL: BASE_URL + "/users/updateUser",
  CHANGE_PASSWORD_URL: BASE_URL + "/users/changePassword",
  UPLOAD_CONTACTS_URL: BASE_IMPORTS_URL + "/importContacts",
  GET_ALL_TEMPLATES_URL: BASE_URL + "/template/all",
  CREATE_TEMPLATE_URL: BASE_URL + "/template/create",
  UPDATE_TEMPLATE_URL: BASE_URL + "/template/update",
  REMOVE_TEMPLATE_URL: BASE_URL + "/template/remove",
};
