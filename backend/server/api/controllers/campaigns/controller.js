import Campaign from "../../../models/campaign";
import isAuthenticated from "../../middlewares/isAuthenticated.jwt.js";
import mongoose from "mongoose";
const { MongoCron } = require("mongodb-cron");

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
let collection = {};
collection = db.collection("jobsz");

db.once("open", function callback() {
  collection = db.collection("jobs");
  /*eslint-disable no-unused-vars*/
  const cron = new MongoCron({
    collection,
  });
});

const oSubscriberActivityKeys = {
  SUBSCRIBER_UNSUBSCRIBED: 'EMAIL_UNSUBSCRIBED',
  SUBSCRIBER_OPENED_EMAIL: 'EMAIL_OPENED',
  SUBSCRIBER_EMAIL_BOUNCED: 'EMAIL_BOUNCED',
  SUBSCRIBER_CLICKED_EMAIL_LINK: 'EMAIL_CLICKED_LINK', //A Message and campaign link
  SUSBCRIBER_ACTIVITY_LOG_ERROR: 'Error while Inserting Subscribe activity log',
  SUBSCRIBER_EMAIL_COMPLAINED: 'EMAIL_COMPLAINED',
  SUBSCRIBER_EMAIL_SENT: 'EMAIL_SENT'
};

export class Controller {
  all(req, res) {
    isAuthenticated(req, res, async () => {
      try {
        let campaignsCount = await Campaign.countDocuments();
        var page = req.query.page ? parseInt(req.query.page) : 1;
        var limit = req.query.limit ? parseInt(req.query.limit) : 10;
        Campaign.find({})
          .limit(limit)
          .skip((page - 1) * limit)
          .then(
            (r) =>
              res.json({
                data: {
                  total: campaignsCount,
                  campaigns: r,
                },
              }),
            (error) => res.json({ error: error })
          );
      } catch (err) {
        return res.json({ error: err });
      }
    });
  }

    create(req, res) {
        console.log("create api in progress")
        isAuthenticated(req, res, () => {
            let createdCampaignData = {
                name: req.body.campaignName,
                note: req.body.notes,
                Subject: req.body.subject,
                ReplyMail: req.body.replyTo,
                SenderName: req.body.fromName,
                senderMailAddress: req.body.fromEmail,
                mailContent: "This is default mail content",
                status: "Draft",
                targetAudience: {
                    audienceType: "ALL",
                    tags:[]
                }
            };

      let createdCampaign = new Campaign(createdCampaignData);
      createdCampaign.save().then(
        (r) => res.json({ data: r }),
        (error) => res.json({ data: { error: error } })
      );
    });
  }

  update(req, res) {
    isAuthenticated(req, res, () => {
      let updateData = {};
      Object.assign(
        updateData,
        req.body.name ? { name: req.body.name } : {},
        req.body.note ? { note: req.body.note } : {},
        req.body.Subject ? { Subject: req.body.Subject } : {},
        req.body.ReplyMail ? { ReplyMail: req.body.ReplyMail } : {},
        req.body.SenderName ? { SenderName: req.body.SenderName } : {},
        req.body.senderMailAddress
          ? { senderMailAddress: req.body.senderMailAddress }
          : {},
        req.body.mailContent ? { mailContent: req.body.mailContent } : {},
        req.body.status ? { status: req.body.status } : {},
        req.body.targetAudience ? { targetAudience: req.body.targetAudience } : {},
        req.body.isMarkedForImmediateSend ? { isMarkedForImmediateSend: true } : { isMarkedForImmediateSend: false },
        req.body.scheduledTime ? { scheduledTime: req.body.scheduledTime } : { scheduledTime: "" },
      );

      Campaign.findByIdAndUpdate(req.body.id, updateData, { new: true })
        .then(async (r) => {
          if (r.isMarkedForImmediateSend) {
            try {
              await collection.deleteOne({
                campaignId: r._id,
              });
              collection.insert({
                campaignId: r._id,
                campaignType: "EMAIL",
                sleepUntil: new Date(),
              });
            } catch (err) {
              console.log(err);
            }
          } else if (r.status === "Scheduled") {
            try {
              await collection.deleteOne({
                campaignId: r._id,
              });

              await collection.insert({
                campaignId: r._id,
                campaignType: "EMAIL",
                sleepUntil: new Date(r.scheduledDate),
              });
            } catch (err) {}
          }
          res.json({ data: r });
        })
        .catch((error) => res.json({ data: { error: error } }));
    });
      } catch (err) {
        console.log(err);
        res.status(400);
        return res.send({ data: { error: err } });
  }

  getCampaignStatisticsByIds(req, res) {
    isAuthenticated(req, res, () => {
      try {
        let aCampaigns = [];
        req.body.campaigns.map(sCampaignId => {
          aCampaigns.push(mongoose.Types.ObjectId(sCampaignId));
        });
        let query = [
          {
            $match: {
              'data.campaignId': { '$in': aCampaigns }
            }
          },
          {
            $group: {
              '_id': {
                '_id': '$data.campaignId',
                'eventType': '$activityKey'
              },
              'subscribers': {
                $addToSet: '$subscriberId'
              }
            }
          },
          {
            $group:
            {
              '_id': '$_id._id',
              'aggregatedSendStatistics': {
                '$push': {
                  'k': {
                    '$ifNull': [
                      '$_id.eventType', 'q'
                    ]
                  },
                  'v': {
                    '$size': '$subscribers'
                  }
                }
              }
            }
          }, {
            $project: {
              '_id': 1,
              'aggregatedSendStatistics': {
                '$arrayToObject': '$aggregatedSendStatistics'
              }
            }
          }
        ];
        return activityLog.aggregate(query, function (err, aStatistics) {
          if (!err) {
            res.status(200);
            let data = aStatistics.map(aStat => {
              return ({
                _id: aStat._id,
                aggregatedSendStatistics: {
                  sent: aStat.aggregatedSendStatistics[oSubscriberActivityKeys.SUBSCRIBER_EMAIL_SENT] ? aStat.aggregatedSendStatistics[oSubscriberActivityKeys.SUBSCRIBER_EMAIL_SENT] : 0,
                  unsubscribe: aStat.aggregatedSendStatistics[oSubscriberActivityKeys.SUBSCRIBER_UNSUBSCRIBED_FROM_LINK] ? aStat.aggregatedSendStatistics[oSubscriberActivityKeys.SUBSCRIBER_UNSUBSCRIBED_FROM_LINK] : 0,
                  open: aStat.aggregatedSendStatistics[oSubscriberActivityKeys.SUBSCRIBER_OPENED_EMAIL] ? aStat.aggregatedSendStatistics[oSubscriberActivityKeys.SUBSCRIBER_OPENED_EMAIL] : 0,
                  click: aStat.aggregatedSendStatistics[oSubscriberActivityKeys.SUBSCRIBER_CLICKED_EMAIL_LINK] ? aStat.aggregatedSendStatistics[oSubscriberActivityKeys.SUBSCRIBER_CLICKED_EMAIL_LINK] : 0,
                  bounce: aStat.aggregatedSendStatistics[oSubscriberActivityKeys.SUBSCRIBER_EMAIL_BOUNCED] ? aStat.aggregatedSendStatistics[oSubscriberActivityKeys.SUBSCRIBER_EMAIL_BOUNCED] : 0
                }
              });
            });
            return res.send(data);
          } else {
            console.log(err);
            res.status(400);
            return res.send({ data: { error: err } });
          }
        });
      } catch (err) {
        console.log(err);
        res.status(400);
        return res.send({ data: { error: err } });
      }

    })
  };


}
export default new Controller();
