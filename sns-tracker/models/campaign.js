const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "Name missing!"]
    },
    note : {
        type : String
    },
    Subject : {
        type : String,
        required:  true
    },
    ReplyMail  : {
        type : String,
        required : false
    },
    SenderName : {
        type : String,
        required : [true , "Sender Name Missing"]
    },
    senderMailAddress : {
        type : String,
        required : [true,"Sender Email Missing"]
    },
    mailContent : {
        type : String,
        required:  ["true","Email Content Missing"]
    },
    status : {
        type : String,
        enum : ["Draft" , "Running" , "Scheduled" , "Aborted"],
        required: [true , "Status of Campaign Missing"]
    },
    targetAudience : {
        audienceType : {
            type : String,
            enum : ["ALL" , "TAGS"]
        },
        tags : []
    }
})


module.exports =  mongoose.model("Campaign" , CampaignSchema)