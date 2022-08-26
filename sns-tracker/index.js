const mongoose = require("mongoose");
const Base58 = require('base-58');
const ActivityLog = require("./models/activityLog");

const clientPromise = mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
);



async function recordSendStatisticsForCampagin(oNotificationInfo) {
    try {
        let sSNSEvent = oNotificationInfo.eventType.toLowerCase();
        if (oNotificationInfo.mail.tags.campaignId) {
            if (oNotificationInfo.mail.tags.fname) {
                let oFnameBuffer = Buffer.from(Base58.decode(oNotificationInfo.mail.tags.fname[0]));
                oNotificationInfo.mail.tags.fname[0] = oFnameBuffer.toString('utf-8');
            }
            if (oNotificationInfo.mail.tags.lname) {
                let oLnameBuffer = Buffer.from(Base58.decode(oNotificationInfo.mail.tags.lname[0]));
                oNotificationInfo.mail.tags.lname[0] = oLnameBuffer.toString('utf-8');
            }

            if (oNotificationInfo.mail.tags.subscriber) {
                let oSubscriberBuffer = Buffer.from(Base58.decode(oNotificationInfo.mail.tags.subscriber[0]));
                oNotificationInfo.mail.tags.subscriber[0] = oSubscriberBuffer.toString('utf-8');
            }
            if (oNotificationInfo.mail.tags.input) {
                oNotificationInfo.mail.tags.input[0] = sInputType;
                if(sSNSEvent === "sent"){
                    await insertSubscriberActivityLog(oNotificationInfo.mail.tags.subscriber[0], oSubscriberActivityKeys.SUBSCRIBER_EMAIL_SENT, { campaignId: mongoose.Types.ObjectId(oNotificationInfo.mail.tags.campaignId[0]), link: oNotificationInfo.click.link });
                } else if (sSNSEvent === "click") {
                    await insertSubscriberActivityLog(oNotificationInfo.mail.tags.subscriber[0], oSubscriberActivityKeys.SUBSCRIBER_CLICKED_EMAIL_LINK, { campaignId: mongoose.Types.ObjectId(oNotificationInfo.mail.tags.campaignId[0]), link: oNotificationInfo.click.link });
                } else if (sSNSEvent === "open") {
                    await insertSubscriberActivityLog(oNotificationInfo.mail.tags.subscriber[0], oSubscriberActivityKeys.SUBSCRIBER_OPENED_EMAIL, { campaignId: mongoose.Types.ObjectId(oNotificationInfo.mail.tags.campaignId[0]) });
                } else if (sSNSEvent === "bounce") {
                    await insertSubscriberActivityLog(oNotificationInfo.mail.tags.subscriber[0], oSubscriberActivityKeys.SUBSCRIBER_EMAIL_BOUNCED, { campaignId: mongoose.Types.ObjectId(oNotificationInfo.mail.tags.campaignId[0]) });
                    if (oNotificationInfo.bounce.bounceType === "Permanent") {
                        let data = await Directory.updateOne({ _id: mongoose.Types.ObjectId(oNotificationInfo.mail.tags.subscriber[0]) }, { $set: { status: "Unsubscribed", unsubscribedBy: "BounceEvent" } });
                        if (data) {
                            // await sendToSuppressionList(oNotificationInfo.mail.destination[0], sSNSEvent);
                            await insertSubscriberActivityLog(oNotificationInfo.mail.tags.subscriber[0], oSubscriberActivityKeys.SUBSCRIBER_UNSUBSCRIBED, { campaignId: mongoose.Types.ObjectId(oNotificationInfo.mail.tags.campaignId[0]), unsubscribedBy: "BounceEvent" });
                        }
                    }
                    // else if (oNotificationInfo.bounce.bounceType === "Transient") {
                    //     let data = Directory.updateOne({ _id: mongoose.Types.ObjectId(oNotificationInfo.mail.tags.subscriber[0]), isValid: true }, { $inc: { softBounceCount: 1 } }, { new: true });
                    //     if (data && data.softBounceCount > 7) {
                    //         await Directory.updateOne({ _id: oNotificationInfo.mail.tags.subscriber[0], isValid: true }, {$set :{ status: "Unsubscribed", unsubscribedBy: "BounceEvent" }});
                    //         // await sendToSuppressionList(oNotificationInfo.mail.destination[0], sSNSEvent);
                    //         await insertSubscriberActivityLog(oNotificationInfo.mail.tags.subscriber[0], oSubscriberActivityKeys.SUBSCRIBER_UNSUBSCRIBED, { campaignId: mongoose.Types.ObjectId(oNotificationInfo.mail.tags.campaignId[0]), unsubscribedBy: "BounceEvent" });
                    //     }
                    // }
                } else if (sSNSEvent === "complaint") {
                    await insertSubscriberActivityLog(oNotificationInfo.mail.tags.subscriber[0], oSubscriberActivityKeys.SUBSCRIBER_EMAIL_COMPLAINED, { campaignId: mongoose.Types.ObjectId(oNotificationInfo.mail.tags.campaignId[0]) });
                    let data = Directory.updateOne({ _id: mongoose.Types.ObjectId(oNotificationInfo.mail.tags.subscriber[0]) }, { $set: { status: "Unsubscribed", unsubscribedBy: "ComplaintEvent" } });
                    if (data) {
                        // await sendToSuppressionList(oNotificationInfo.mail.destination[0], sSNSEvent);
                        await insertSubscriberActivityLog(oNotificationInfo.mail.tags.subscriber[0], oSubscriberActivityKeys.SUBSCRIBER_UNSUBSCRIBED, { campaignId: mongoose.Types.ObjectId(oNotificationInfo.mail.tags.campaignId[0]), unsubscribedBy: "ComplaintEvent" });
                    }
                }
            }
        }

    } catch (err) {
        console.log(err);
    }
}

async function insertSubscriberActivityLog(userId = '', activityKey = '', data = {}) {
    try {
        await ActivityLog.insertOne({
            subscriberId: mongoose.Types.ObjectId(userId),
            activityKey: activityKey,
            data: data,
            createdOn: Date.now()
        });
        return;
    } catch (err) {
        console.log(err);
    }
}

const oSubscriberActivityKeys = {
    SUBSCRIBER_UNSUBSCRIBED: 'UNSUBSCRIBED', //A message (data from source Admin/Link etc) //unsubscribecontact, find1update
    SUBSCRIBER_OPENED_EMAIL: 'OPENED', //A Message and campaign id //recordsendstats
    SUBSCRIBER_EMAIL_BOUNCED: 'BOUNCED', //A Message and campaign id //recordsendstats
    SUBSCRIBER_CLICKED_EMAIL_LINK: 'CLICKED_LINK', //A Message and campaign link
    SUSBCRIBER_ACTIVITY_LOG_ERROR: 'Error while Inserting Subscribe activity log',
    SUBSCRIBER_EMAIL_COMPLAINED: 'SUBSCRIBER EMAIL_COMPLAINED',
    SUBSCRIBER_EMAIL_SENT: 'SENT'
};

// Handler
module.exports.handler = async function (event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    // Get a MongoClient.
    // const client = await connectToDatabase();
    const client = await clientPromise;
    // Use the connection to return the name of the connected database.
    //list all the required collections;




    // async function sendToSuppressionList(emailAddress, reason) {
    //     await SuppressionList.insertOne({ email: emailAddress, reason: reason });
    // }

    if (event.Records && event.Records.length > 0) {
        for (let i = 0; i < event.Records.length; i++) {
            let oRecord = event.Records[i];
            const userAgent = oRecord.EventSource;
            if (userAgent !== "aws:sns") {
                return "not from sns";
            }
            let oSnsData = oRecord.Sns;
            try {
                let oMessage = JSON.parse(oSnsData.Message);
                switch (oSnsData.Type) {
                    case "SubscriptionConfirmation":
                        const accountNumber = oMessage.TopicArn.split(":")[4];
                        if (process.env.AWS_ACCOUNT_NUMBER_ARRAY.includes(accountNumber)) {
                            request(oMessage.SubscribeURL, (error, response, body) => {
                                console.log(`Added a new SNS Topic ${oMessage.Message}`);
                            });
                        }
                        break;
                    case "Notification":
                        try {
                            let sEventType = oMessage.eventType;
                            if (["bounce", "complaint", "open", "click", "sent"].includes(sEventType.toLowerCase()))
                                await recordSendStatisticsForCampagin(oMessage);
                        } catch (err) {
                            console.log(err);
                        }
                    case "UnsubscribeConfirmation":
                        break;
                    default:
                }
            } catch (err) {
                console.log(err);
                console.log("cannot log message", oSnsData.Message);
            }
        }
    }

    return "logged";
};