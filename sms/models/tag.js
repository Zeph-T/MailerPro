const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name missing!"]
  }
});

module.exports = mongoose.model('Tag', TagSchema);