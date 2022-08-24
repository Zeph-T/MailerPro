import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name missing!"],
  },
  isValid: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Tag", TagSchema);
