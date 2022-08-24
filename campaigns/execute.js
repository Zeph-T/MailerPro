const aws = require('aws-sdk');
const mongoose = require('mongooose');
const Q = require('q');
const Contacts = require('models/contact');
const Campaign = require('models/campaign');
const aws = require('aws-sdk');
const env = require('./env');

class Node {
    constructor(element){
        this.contact = element;
        this.next = null;
    }
}


class LinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    add(element){
        let node = new Node(element);

        if(this.head == null){
            this.head = node;
            this.tail = node;
        }
        else{
            this.tail.next = node;
            this.tail = this.tail.next;
        }
        this.size++;
    }

    length(){
        return this.size;
    }

    printItems(){
        let current = this.head;
        while(current){
            console.log(current.contact);
            current = current.next;
        }
    }

    pop_front(){
        let node = this.head;
        this.head = node.next;
        this.size--;
        return node;
    }
}


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


let sendEmail = function(contact,ses,template,senderEmail,subject,replyMails){
    // send email
    let bodyTemplate = Handlebars.compile(template,{noEscape: true});
    let mailTextForReciever = bodyTemplate(contact);
    let subjectTemplate = Handlebars.compile(subject,{noEscape: true});
    let recieverSubject = subjectTemplate(contact);


    ses.sendEmail({
        Source : senderEmail,
        Destination : {
            ToAddresses : [contact.email]
        },
        Message : {
            Subject : {
                Data : recieverSubject
            },
            Body : {
                Html : {
                    Data : mailTextForReciever
                }
            }
        },
        ReplyToAddresses: replyMails
    },function(err){
        if(err.code == 'Throttling'){
            if(error.message == 'Daily message quota exceeded')return 'ABORT!';
            else if(error.message == 'Maximum sending rate exceeded')return 'THROTTLE';
            else{
                console.log('Error Occured while sending Emails');
                return 'ABORT';
            }
        }
    })

}


let smtpInfo = async function(ses){
    let deferred = Q.defer();
    try{
        const oSendQuota = await ses.getSendQuota({});
        deferred.resolve({ses,oSendQuota})
    }catch(err){
        deferred.reject(err);
    }

    return deferred.promise;
}


let getAWSConfig = async function(){
    let deferred = Q.defer();
    try{
        aws.config.update({
            'accesskeyId' : env.AWS_ACCESS_KEY,
            'secretAccessKey' : env.AWS_SECRET_ACCESS_KEY,
            region : env.AWS_REGION
        })
        let ses = new aws.SES({apiVersion : '2010-12-01'});
        deferred.resolve(smtpInfo(ses));
    }catch(err){
        deferred.reject(err);
    }
    return deferred.promise;
}

let runEmailCampaign = async function(campaign,contactList){
    try{
        let list = new LinkedList();
        for(let i = 0 ; i < contactList.length ; i++)list.add(contactList[i]);
        let {ses , maxSendRate} = await getAWSConfig();
        let nMaxSendRate = Math.floor(maxSendRate * 0.8);
        let delay = Math.ceil(1000/nMaxSendRate);
        let templateText = campaign.mailContent;
        let senderMailAddress = campaign.senderMailAddress
        let templateSubject = campaign.Subject;

        let sendEmail = function(template,senderEmail,subject,replyMails){
            // send email
            let contact = list.pop_front();
            let bodyTemplate = Handlebars.compile(template,{noEscape: true});
            let mailTextForReciever = bodyTemplate(contact);
            let subjectTemplate = Handlebars.compile(subject,{noEscape: true});
            let recieverSubject = subjectTemplate(contact);
        
        
            ses.sendEmail({
                Source : senderEmail,
                Destination : {
                    ToAddresses : [contact.email]
                },
                Message : {
                    Subject : {
                        Data : recieverSubject
                    },
                    Body : {
                        Html : {
                            Data : mailTextForReciever
                        }
                    }
                },
                configurationSetName : "mailerpro",
                ReplyToAddresses: replyMails
            },function(err){
                if(err.code == 'Throttling'){
                    if(error.message == 'Daily message quota exceeded')deferred.reject('Daily message quota exceeded');
                    else if(error.message == 'Maximum sending rate exceeded')list.push_back(contact);
                    else{
                        console.log('Error Occured while sending Emails');
                        deferred.reject('Error Occured while sending Emails')
                    }
                }
            })
        
        }


        let intervalId = setInterval(function(){
            if(list.length() != 0){
                sendEmail(templateText,senderMailAddress,templateSubject);
            }else{
                clearInterval(intervalId);
            }
        },delay);
    }catch(err){
        console.log(err);
        deferred.reject(err);
    }
}

let runSMSCampaign = function(campaign , contactList){
    let list = new LinkedList();
    for(let i = 0 ; i < contactList.length ; i++)list.add(contactList[i]);

}

let executeCampaign = async function(document){
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


module.exports = executeCampaign;