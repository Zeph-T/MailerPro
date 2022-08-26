const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    'DB_STRING': process.env.MONGODB_URI,
    'AWS_ACCESS_KEY': process.env.AWS_ACCESS_KEY,
    'AWS_SECRET_ACCESS_KEY': process.env.AWS_SECRET_ACCESS_KEY,
    'AWS_REGION': process.env.AWS_REGION,
    'TWILIO_ACCESS_KEY': process.env.TWILIO_ACCESS_KEY,
    'TWILIO_SECRET_ACCESS_KEY': process.env.TWILIO_SECRET_ACCESS_KEY,
    'TWILIO_SENDING_NUMBER': process.env.TWILIO_SENDING_NUMBER,
    'TWILIO_WEBHOOK_URL' : process.env.TWILIO_WEBHOOK,
    'PORT' : process.env.PORT
}