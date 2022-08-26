import Tag from "../../../models/tag";
import isAuthenticated from "../../middlewares/isAuthenticated.jwt.js";
import ContactField from "../../../models/contactFields";
import mongoose from "mongoose";

export class Controller {
  all(req, res) {
    isAuthenticated(req, res, async () => {
      try {
        let query = { isValid: true };
        req.isAdmin ? null : (query.createdBy = req.user);
        let contactFieldsCount = await ContactField.countDocuments({
          query,
        });
        ContactField.find(query)
          .sort({ _id: -1 })
          .then(
            (r) =>
              res.json({
                data: {
                  total: contactFieldsCount,
                  contactFields: r,
                },
              }),
            (error) => res.status(400).json({ error: error })
          );
      } catch (err) {
        res.status(400).json({ error: err });
      }
    });
  }

  create(req, res) {
    isAuthenticated(req, res, () => {
      try {
        if (req.body && req.body.fieldName && req.body.fieldType) {
          req.body.createdBy = req.user;
          let createdContactField = new ContactField(req.body);
          createdContactField.save().then(
            (r) => res.json({ data: r }),
            (error) => res.status(400).json({ data: { error: error } })
          );
        } else {
          throw "Required Fields Missing";
        }
      } catch (err) {
        res.status(400).json({ data: { error: err } });
      }
    });
  }

  remove(req, res) {
    isAuthenticated(req, res, () => {
      let contactFieldId = req.body.id;
      ContactField.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(contactFieldId) },
        { $set: { isValid: false } },
        { new: true }
      )
        .then((response) => res.json({ data: response }))
        .catch((err) => res.status(400).json({ data: { error: err } }));
    });
  }
}
export default new Controller();
