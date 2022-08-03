import mongoose from 'mongoose';

const ContactFieldSchema = new mongoose.Schema({
  fieldName: {
    type: String,
    required: [true, "Name missing!"]
  },
  fieldType : {
    type : String,
    enum : ["Text" , "Number" , "Date"],
    required : [true, "Field Type missing"]
  }
});

export default mongoose.model('Fields', ContactFieldSchema);