import Campaign from "../../../models/smsCampaign";
import isAuthenticated from "../../middlewares/isAuthenticated.jwt.js";
import mongoose from "mongoose";
import ActivityLog from "../../../models/activityLog";
const { MongoCron } = require("mongodb-cron");

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
let collection = {};
collection = db.collection("sjobs");

db.once("open", function callback() {
  collection = db.collection("sjobs");
  /*eslint-disable no-unused-vars*/
  const cron = new MongoCron({
    collection,
  });
});

// const oSubscriberActivityKeys = {
//   SUBSCRIBER_UNSUBSCRIBED: "EMAIL_UNSUBSCRIBED",
//   SUBSCRIBER_OPENED_EMAIL: "EMAIL_OPENED",
//   SUBSCRIBER_EMAIL_BOUNCED: "EMAIL_BOUNCED",
//   SUBSCRIBER_CLICKED_EMAIL_LINK: "EMAIL_CLICKED_LINK", //A Message and campaign link
//   SUSBCRIBER_ACTIVITY_LOG_ERROR: "Error while Inserting Subscribe activity log",
//   SUBSCRIBER_EMAIL_COMPLAINED: "EMAIL_COMPLAINED",
//   SUBSCRIBER_EMAIL_SENT: "EMAIL_SENT",
// };

export class Controller {
  all(req, res) {
    isAuthenticated(req, res, async () => {
      try {
        let query = { isValid: true };
        req.isAdmin ? null : (query.createdBy = req.user);
        let campaignsCount = await Campaign.countDocuments(query);
        var page = req.query.page ? parseInt(req.query.page) : 1;
        var limit = req.query.limit ? parseInt(req.query.limit) : 10;
        Campaign.find(query)
          .limit(limit)
          .skip((page - 1) * limit)
          .sort({ _id: -1 })
          .then(
            (r) =>
              res.json({
                data: {
                  total: campaignsCount,
                  campaigns: r,
                },
              }),
            (error) => res.status(400).json({ error: error })
          );
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    });
  }

  create(req, res) {
    isAuthenticated(req, res, () => {
      let createdCampaignData = {
        name: req.body.campaignName,
        note: req.body.notes,
        Subject: req.body.subject,
        status: "Draft",
        targetAudience: {
          audienceType: "ALL",
          tags: [],
        },
        createdBy: req.user,
      };

      let createdCampaign = new Campaign(createdCampaignData);
      createdCampaign.save().then(
        (r) => res.json({ data: r }),
        (error) => {
          console.log(error);
          res.status(400).json({ data: { error: error } });
        }
      );
    });
  }

  update(req, res) {
    isAuthenticated(req, res, () => {
      let updateData = {};
      Object.assign(
        updateData,
        { _id: req.body._id },
        req.body.info.campaignName ? { name: req.body.info.campaignName } : {},
        req.body.info.notes ? { note: req.body.info.notes } : {},
        req.body.template
          ? { template: mongoose.Types.ObjectId(req.body.template) }
          : {},
        req.body.status ? { status: req.body.status } : {},
        req.body.audience ? { targetAudience: req.body.audience } : {},
        req.body.schedule.value === "later"
          ? { isMarkedForImmediateSend: false }
          : { isMarkedForImmediateSend: true },
        req.body.schedule.time
          ? {
              scheduledTime: new Date(req.body.schedule.time),
              status: "Scheduled",
            }
          : { scheduledTime: "" }
      );
      updateData.targetAudience.tags = updateData.targetAudience.tags.map(
        (oTag) => oTag._id
      );
      updateData.createdBy = req.user;
      Campaign.findByIdAndUpdate(
        mongoose.Types.ObjectId(updateData._id),
        updateData,
        { new: true }
      )
        .lean()
        .then(async (r) => {
          if (r.isMarkedForImmediateSend) {
            r.status = "Running";
            try {
              await collection.deleteOne({
                campaignId: r._id,
              });
              await collection.insert({
                campaignId: r._id,
                campaignType: "SMS",
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
                campaignType: "SMS",
                sleepUntil: new Date(r.scheduledTime),
              });
            } catch (err) {}
          }
          res.json({ data: r });
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json({ data: { error: error } });
        });
    });
  }
  catch(err) {
    console.log(err);
    res.status(400);
    return res.send({ data: { error: err } });
  }

  getCampaignById(req, res) {
    isAuthenticated(req, res, () => {
      try {
        Campaign.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }).then(
          (r) =>
            res.json({
              data: r,
            }),
          (error) => res.status(400).json({ error: error })
        );
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    });
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
                  sent: aStat.aggregatedSendStatistics.SMS_SENT
                    ? aStat.aggregatedSendStatistics.SMS_SENT
                    : 0,
                  failed: aStat.aggregatedSendStatistics.SMS_FAILED
                    ? aStat.aggregatedSendStatistics.SMS_FAILED
                    : 0,
                  queued: aStat.aggregatedSendStatistics.SMS_QUEUED
                    ? aStat.aggregatedSendStatistics.SMS_QUEUED
                    : 0,
                  delivered: aStat.aggregatedSendStatistics.SMS_DELIVERED
                    ? aStat.aggregatedSendStatistics.SMS_DELIVERED
                    : 0,
                },
              };
            });
            return res.send(data);
          } else {
            console.log(err);
            res.status(400);
            return res.status(400).send({ data: { error: err } });
          }
        });
      } catch (err) {
        console.log(err);
        res.status(400);
        return res.status(400).send({ data: { error: err } });
      }
    });
  }
}
export default new Controller();
