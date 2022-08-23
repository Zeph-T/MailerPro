import Campaign from '../../../models/campaign'
import isAuthenticated from '../../middlewares/isAuthenticated.jwt.js'

export class Controller {
    all(req, res) {
        isAuthenticated(req, res, async () => {
            try{
                let campaignsCount = await Campaign.countDocuments();
                var page = req.query.page ? parseInt(req.query.page) : 1;
                var limit = req.query.limit ? parseInt(req.query.limit) : 10;
                Campaign.find({}).limit(limit).skip((page - 1) * limit)
                    .then(r => res.json({ "data": {
                        total: campaignsCount,
                        campaigns: r,
                    } }),
                        error => res.json({ error: error }))
            }catch(err){
                return res.json({error : err});
            }
        });
    }

    create(req, res) {
        isAuthenticated(req, res, () => {
            let createdCampaignData = {
                name: req.body.name,
                note: req.body.note,
                Subject: req.body.Subject,
                ReplyMail: req.body.ReplyMail,
                SenderName: req.body.SenderName,
                senderMailAddress: req.body.senderMailAddress,
                mailContent: req.body.mailContent,
                status: "Draft",
                targetAudience: req.body.targetAudience
            };

            let createdCampaign = new Campaign(createdCampaignData);
            createdCampaign.save()
                .then(r => res.json({ "data": r }),
                    error => res.json({ "data": { error: error } }));
        });
    }

    update(req, res) {
        isAuthenticated(req, res, () => {
            let updateData = {};
            Object.assign(updateData,
                req.body.name ? { name: req.body.name } : {},
                req.body.note ? { note: req.body.note } : {},
                req.body.Subject ? { Subject: req.body.Subject } : {},
                req.body.ReplyMail ? { ReplyMail: req.body.ReplyMail } : {},
                req.body.SenderName ? { SenderName: req.body.SenderName } : {},
                req.body.senderMailAddress ? { senderMailAddress: req.body.senderMailAddress } : {},
                req.body.mailContent ? { mailContent: req.body.mailContent } : {},
                req.body.status ? { status: req.body.status } : {},
                req.body.targetAudience ? { targetAudience: req.body.targetAudience } : {});

            Campaign.findByIdAndUpdate(req.body.id, updateData, { new: true })
                .then(r => res.json({ "data": r }),
                    error => res.json({ "data": { error: error } }));
        });
    }
}
export default new Controller();