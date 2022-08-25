const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  DB_STRING: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  BACKEND_URL : process.env.BACKEND_URL,
  ADD_TAGS_TO_IMPORT_CONTACT_URL : process.env.ADD_TAGS_TO_IMPORT_CONTACT_URL
};

