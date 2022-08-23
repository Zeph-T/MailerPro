const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  DB_STRING: process.env.MONGO_STRING,
};
