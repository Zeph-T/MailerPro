const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  DB_STRING: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};
