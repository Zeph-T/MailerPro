import dotenv from "dotenv";

dotenv.config();

module.exports = {
  DB_STRING: process.env.MONGODB_URI,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  JWT_SECRET: process.env.JWT_SECRET,
  APP_ID: process.env.APP_ID,
  PORT: process.env.PORT,
  LOG_LEVEL: process.env.LOG_LEVEL,
  REQUEST_LIMIT: process.env.REQUEST_LIMIT,
  OPENAPI_SPEC: process.env.OPENAPI_SPEC,
  OPENAPI_ENABLE_RESPONSE_VALIDATION:
  process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION,
};
