import Tag from '../../../models/tag';
import isAuthenticated from '../../middlewares/isAuthenticated.jwt.js';
import ContactField from '../../../models/contactFields';
import mongoose from 'mongoose';

export class Controller {
    all(req, res) {
        isAuthenticated(req, res, async () => {
            try {
                let contactFieldsCount = await ContactField.countDocuments({ isValid: true });
                ContactField.find({ isValid: true })
                    .sort({ _id: -1 })
                    .then(r => res.json({
                        "data": {
                            total: contactFieldsCount,
                            contactFields: r,
                        }
                    }),
                        error => res.json({ error: error }))
            } catch (err) {
                res.json({ error: err });
            }
        });
    }

    create(req, res) {
        isAuthenticated(req, res, () => {
            try {
                if (req.body && req.body.fieldName && req.body.fieldType) {
                    let createdContactField = new ContactField(req.body);
                    createdContactField.save().then(
                        (r) => res.json({ data: r }),
                        (error) => res.json({ data: { error: error } })
                    );
                } else {
                    throw "Required Fields Missing"
                }
            } catch (err) {
                res.json({ data: { error: err } })
            }
        });
    }


    remove(req, res) {
        isAuthenticated(req, res, () => {
            let contactFieldId = req.body.id;
            ContactField.findOneAndUpdate({ _id: mongoose.Types.ObjectId(contactFieldId) },
                { $set: { isValid: false } },
                { new: true }).then(response =>
                    res.json({ "data": response })
                ).catch(err => res.json({ "data": { error: err } }))
        })
    }



}
export default new Controller();
