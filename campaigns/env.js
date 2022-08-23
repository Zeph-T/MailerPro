const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    'DB_STRING' :  process.env.MONGODB_URI,
    'AWS_ACCESS_KEY' : process.env.AWS_ACCESS_KEY,
    'AWS_SECRET_ACCESS_KEY' : process.env.AWS_SECRET_ACCESS_KEY,
    'AWS_REGION' : process.env.AWS_REGION
}