import mongoose from "mongoose";

const User = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email missing!"],
  },
  name: {
    type: String,
    required: [true, "Name missing!"],
  },
  salt: {
    type: String,
    required: [true, "Salt must be generated before saving"],
  },
  hash: {
    type: String,
    required: [true, "Hash must be generated before saving"],
  },
  unSubscriptionForm: {
    type: String,
    required: [true, "UnSubscriptionForm must be generated before saving"],
    default: "Sorry to see you go!",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", User);
