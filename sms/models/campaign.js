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
    template : {
        type : mongoose.Types.ObjectId,
        ref : 'Template'
    },
    status : {
        type : String,
        enum : ["Draft" , "Running" , "Scheduled" , "Aborted","Completed"],
        required: [true , "Status of Campaign Missing"]
    },
    isMarkedForImmediateSend : {
        type: Boolean,
        default : false,
        required : true
    },
    scheduledTime : {
        type : Date
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