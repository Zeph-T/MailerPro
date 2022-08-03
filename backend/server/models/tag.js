import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name missing!"]
  }
});

export default mongoose.model('Tag', TagSchema);