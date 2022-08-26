const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name missing!"],
  },
  content: {
    type: String,
    required: [true, "Template Content Missing"],
  },
  templateType: {
    type: String,
    enum: ["SMS", "EMAIL"],
    required: true,
  },
  editorType: {
    type: String,
    default: "TextEditor",
    enum: ["Drag&Drop", "TextEditor"],
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
    ref: "User",
  },
});

module.exports = mongoose.model("Template", TemplateSchema);
