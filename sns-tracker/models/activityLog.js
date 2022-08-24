const mongoose = require('mongoose');
const Contact = require('./contact');
const Campaign = require("./campaign");


const ActivityLogSchema = new mongoose.Schema({
    subscriberId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Contacts' 
    },
    activityKey: { 
        type: String ,
        enum : ["SENT","CLICKED_LINK","FAILED","COMPLAIN","OPENED","BOUNCED","UNSUBSCRIBED"],
        required:  true
    },
    data: {},
    campaignId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Campaign'
    },
    createdOn: { 
        type: Date, 
        default: Date.now 
    }
})


module.exports = mongoose.model("ActivityLog", ActivityLogSchema)