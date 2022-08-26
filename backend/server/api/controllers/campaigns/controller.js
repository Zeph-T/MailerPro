import Campaign from "../../../models/campaign";
import isAuthenticated from "../../middlewares/isAuthenticated.jwt.js";
import mongoose from "mongoose";
import ActivityLog from "../../../models/activityLog";
const { MongoCron } = require("mongodb-cron");

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
let collection = {};
collection = db.collection("jobs");

db.once("open", function callback() {
  collection = db.collection("jobs");
  /*eslint-disable no-unused-vars*/
  const cron = new MongoCron({
    collection,
  });
});

const oSubscriberActivityKeys = {
  SUBSCRIBER_UNSUBSCRIBED: "EMAIL_UNSUBSCRIBED",
  SUBSCRIBER_OPENED_EMAIL: "EMAIL_OPENED",
  SUBSCRIBER_EMAIL_BOUNCED: "EMAIL_BOUNCED",
  SUBSCRIBER_CLICKED_EMAIL_LINK: "EMAIL_CLICKED_LINK", //A Message and campaign link
  SUSBCRIBER_ACTIVITY_LOG_ERROR: "Error while Inserting Subscribe activity log",
  SUBSCRIBER_EMAIL_COMPLAINED: "EMAIL_COMPLAINED",
  SUBSCRIBER_EMAIL_SENT: "EMAIL_SENT",
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
          .sort({_id:  -1})
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
    isAuthenticated(req, res, () => {
      let createdCampaignData = {
        name: req.body.campaignName,
        note: req.body.notes,
        Subject: req.body.subject,
        ReplyMail: req.body.replyTo,
        SenderName: req.body.fromName,
        senderMailAddress: req.body.fromEmail,
        status: "Draft",
        targetAudience: {
          audienceType: "ALL",
          tags: [],
        },
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
        {_id:req.body._id},
        req.body.info.campaignName ? { name: req.body.info.campaignName } : {},
        req.body.info.notes ? { note: req.body.info.notes } : {},
        req.body.info.subject ? { Subject: req.body.info.subject } : {},
        req.body.info.replyTo ? { ReplyMail: req.body.info.replyTo } : {},
        req.body.info.fromName ? { SenderName: req.body.info.fromName } : {},
        req.body.info.fromEmail
          ? { senderMailAddress: req.body.info.fromEmail }
          : {},
        req.body.template ? { template: mongoose.Types.ObjectId(req.body.template) } : {},
        req.body.status ? { status: req.body.status } : {},
        req.body.audience
          ? { targetAudience: req.body.audience }
          : {},
        req.body.schedule.value==="later"
          ? { isMarkedForImmediateSend: false }
          : { isMarkedForImmediateSend: true },
        req.body.schedule.time
          ? { scheduledTime: new Date(req.body.schedule.time) , status : "Scheduled" }
          : { scheduledTime: "" },
      );
      updateData.targetAudience.tags = updateData.targetAudience.tags.map(oTag=>oTag._id)
      Campaign.findByIdAndUpdate(mongoose.Types.ObjectId(updateData._id), updateData, { new: true })
        .then(async (r) => {
          if (r.isMarkedForImmediateSend) {
            r.status = "Running";
            try {
              await collection.deleteOne({
                campaignId: r._id,
              });
              await collection.insert({
                campaignId: r._id,
                campaignType: "EMAIL",
                sleepUntil: new Date(),
              });
              await r.save();
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
                sleepUntil: new Date(r.scheduledTime),
              });
            } catch (err) {}
          }
          res.json({ data: r });
        })
        .catch((error) =>{
          console.log(error);
          res.json({ data: { error: error } });
        })
    });
  }
  catch(err) {
    console.log(err);
    res.status(400);
    return res.send({ data: { error: err } });
  }

  getCampaignById(req,res){
    isAuthenticated(req, res, () => {
      try {
        Campaign.find({_id : mongoose.Types.ObjectId(req.params.id)})
          .then(
            (r) =>
              res.json({
                data: r
              }),
            (error) => res.json({ error: error })
          );
      } catch (err) {
        return res.json({ error: err });
      }
    })
  }

  getCampaignStatisticsByIds(req, res) {
    isAuthenticated(req, res, () => {
      try {
        let aCampaigns = [];
        req.body.campaigns.map((sCampaignId) => {
          aCampaigns.push(mongoose.Types.ObjectId(sCampaignId));
        });
        let query = [
          {
            $match: {
              "data.campaignId": { $in: aCampaigns },
            },
          },
          {
            $group: {
              _id: {
                _id: "$data.campaignId",
                eventType: "$activityKey",
              },
              subscribers: {
                $addToSet: "$subscriberId",
              },
            },
          },
          {
            $group: {
              _id: "$_id._id",
              aggregatedSendStatistics: {
                $push: {
                  k: {
                    $ifNull: ["$_id.eventType", "q"],
                  },
                  v: {
                    $size: "$subscribers",
                  },
                },
              },
            },
          },
          {
            $project: {
              _id: 1,
              aggregatedSendStatistics: {
                $arrayToObject: "$aggregatedSendStatistics",
              },
            },
          },
        ];
        return ActivityLog.aggregate(query, function (err, aStatistics) {
          if (!err) {
            res.status(200);
            let data = aStatistics.map((aStat) => {
              return {
                _id: aStat._id,
                stats: {
                  sent: aStat.aggregatedSendStatistics[
                    oSubscriberActivityKeys.SUBSCRIBER_EMAIL_SENT
                  ]
                    ? aStat.aggregatedSendStatistics[
                        oSubscriberActivityKeys.SUBSCRIBER_EMAIL_SENT
                      ]
                    : 0,
                  unsubscribe: aStat.aggregatedSendStatistics[
                    oSubscriberActivityKeys.SUBSCRIBER_UNSUBSCRIBED_FROM_LINK
                  ]
                    ? aStat.aggregatedSendStatistics[
                        oSubscriberActivityKeys
                          .SUBSCRIBER_UNSUBSCRIBED_FROM_LINK
                      ]
                    : 0,
                  open: aStat.aggregatedSendStatistics[
                    oSubscriberActivityKeys.SUBSCRIBER_OPENED_EMAIL
                  ]
                    ? aStat.aggregatedSendStatistics[
                        oSubscriberActivityKeys.SUBSCRIBER_OPENED_EMAIL
                      ]
                    : 0,
                  click: aStat.aggregatedSendStatistics[
                    oSubscriberActivityKeys.SUBSCRIBER_CLICKED_EMAIL_LINK
                  ]
                    ? aStat.aggregatedSendStatistics[
                        oSubscriberActivityKeys.SUBSCRIBER_CLICKED_EMAIL_LINK
                      ]
                    : 0,
                  bounce: aStat.aggregatedSendStatistics[
                    oSubscriberActivityKeys.SUBSCRIBER_EMAIL_BOUNCED
                  ]
                    ? aStat.aggregatedSendStatistics[
                        oSubscriberActivityKeys.SUBSCRIBER_EMAIL_BOUNCED
                      ]
                    : 0,
                },
              };
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
    });
  }
}
export default new Controller();
