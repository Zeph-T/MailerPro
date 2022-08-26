const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "Name missing!"]
    },
    note : {
        type : String
    },
    template : {
        type : mongoose.Types.ObjectId,
        ref : 'Template'
    },
    status : {
        type : String,
        enum : ["Draft" , "Running" , "Scheduled" , "Aborted"],
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
    },
    createdBy : {
        type :  mongoose.Types.ObjectId,
        ref : "User"
    }
})


module.exports =  mongoose.model("smsCampaign" , CampaignSchema)