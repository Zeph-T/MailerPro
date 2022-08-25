const mongoose = require("mongoose");
const Contact = require("./contact");
const Campaign = require("./campaign");

const ActivityLogSchema = new mongoose.Schema({
  subscriberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contacts",
  },
  activityKey: {
    type: String,
    enum: [
      "EMAIL_SENT",
      "EMAIL_CLICKED_LINK",
      "EMAIL_FAILED",
      "EMAIL_COMPLAIN",
      "EMAIL_OPENED",
      "EMAIL_BOUNCED",
      "EMAIL_UNSUBSCRIBED",
      "SMS_SENT",
      "SMS_QUEUED",
      "SMS_FAILED",
    ],
    required: true,
  },
  data: {},
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ActivityLog", ActivityLogSchema);
