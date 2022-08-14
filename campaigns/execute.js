const aws = require('aws-sdk');
const mongoose = require('mongooose');
const Q = require('q');
const Contacts = require('models/contact');
const Campaign = require('models/campaign');

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

let runEmailCampaign = function(campaign,contactList){
    let list = new LinkedList();
    for(let i = 0 ; i < contactList.length ; i++)list.add(contactList[i]);
    while(list.length() != 0){
        let contact = list.pop();
        console.log(contact);
    }
}

let runSMSCampaign = function(campaign , contactList){

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