const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name missing!"]
  },
  createdBy : {
    type : mongoose.Types.ObjectId,
    ref : 'User'
},
});

module.exports = mongoose.model('Tag', TagSchema);