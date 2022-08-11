const aws = require('aws-sdk');
const mongoose = require('mongooose');
const Q = require('q');
const Contacts = require('models/contact');
const Campaign = require('models/campaign');


const getContactList = async function(targetAudience){
    let deferred = Q.defer();
    try{
        let contacts = [];
        if(targetAudience.audienceType === 'ALL'){
            contacts = await Contacts.find({isValid : true , status : 'Subscribed'});
            deferred.resolve(contacts);
        }else if(targetAudience.audienceType === 'TAGS'){
            contacts = await Contacts.find({isValid : true , status : 'Subscribed' , tags : {$in : targetAudience.tags}});
            deferred.resolve(contacts);
        }else{
            deferred.reject('Invalid Audience Type ' ,targetAudience.audienceType);
        }
    }catch(err){
        deferred.reject(err);
    }
}


// const approveEmailTemplate = function(template){

// }

let runEmailCampaign = function(campaign,contactList){

}

let runSMSCampaign = function(campaign , contactList){

}

const executeCampaign = async function(document){
    try{
        let deferred = Q.defer();
        if(document.campaignId){
            let campaignType = document.campaignType;
            let campaignId = document.campaignId;
            let campaign = await Campaign.findById(campaign);
            let contactList = await getContactList(campaign.targetAudience);
            switch (campaignType) {
                case 'EMAIL' :
                        runEmailCampaign(campaign,contactList);
                    break;
                case 'SMS' : 
                        runSMSCampaign(campaign,contactList);
                    break;
            } 

        }else{
            deferred.reject('No campaignId found!');
        }    
    }catch(err){
        deferred.reject(err);
    }
    return deferred.promise;

}