import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    fname : {
        type : String
    },
    mname : {
        type : String
    },
    lname : {
        type : String
    },
    phone : {
        type : String
    },
    email  : {
        type : String
    },
    dob : {
        type : String,
        default : ""
    },
    isValid : {
        type : Boolean,
        default : true
    },
    status : {
        type : String,
        default : "Subscribed" ,
        enum   : ["Subscribed" , "Unsubscribed"]
    },
    createdOn : {
        type : Date,
        default : Date.now
    },
    updatedOn : {
        type : Date,
        default : Date.now
    },
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    tags : []
},{
    strict : false
});

export default mongoose.model('Contact', ContactSchema);