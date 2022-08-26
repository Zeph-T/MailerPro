import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name missing!"],
  },
  content: {
    type: String,
    required: [true, "Template Content Missing"],
  },
  design: {
    type: Object,
  },
  editorType: {
    type: String,
    default: "TextEditor",
    enum: ["Drag&Drop", "TextEditor"],
  },
  templateType: {
    type: String,
    enum: ["SMS", "EMAIL"],
    required: true,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    default: "",
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
});

export default mongoose.model("Template", TemplateSchema);
