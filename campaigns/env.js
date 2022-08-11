const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    'DB_STRING' :  process.env.DB_CONN_STRING
}