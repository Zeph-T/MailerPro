import Tag from "../../../models/tag";
import isAuthenticated from "../../middlewares/isAuthenticated.jwt.js";
import Contact from "../../../models/contact";
import mongoose from "mongoose";

export class Controller {
  all(req, res) {
    isAuthenticated(req, res, async () => {
      try {
        let query = { isValid: true };
        req.isAdmin ? null : (query.createdBy = req.user);
        let tagsCount = await Tag.countDocuments(query);
        Tag.find(query).then(
          (r) =>
            res.json({
              data: {
                total: tagsCount,
                tags: r,
              },
            }),
          (error) => res.json({ error: error })
        );
      } catch (err) {
        res.json({ error: err });
      }
    });
  }

  create(req, res) {
    isAuthenticated(req, res, () => {
      let createdTagData = {
        name: req.body.name,
        createdBy: req.user,
      };

      let createdTag = Tag.create(createdTagData).then(
        (r) => res.json({ data: r }),
        (error) => res.json({ data: { error: error } })
      );
    });
  }

  update(req, res) {
    isAuthenticated(req, res, () => {
      req.body.createdBy = req.user;
      Tag.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.body._id) },
        req.body,
        { new: true }
      )
        .then((r) => res.json({ data: r }))
        .catch((err) => res.json({ data: { error: err } }));
    });
  }

  addTagToContact(req, res) {
    isAuthenticated(req, res, () => {
      let contactId = req.body._id;
      let tagId = req.body.tagId;
      Contact.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(contactId) },
        { $push: { tags: tagId } },
        { new: true }
      )
        .then((response) => res.json({ data: response }))
        .catch((err) => res.json({ data: { error: err } }));
    });
  }

  deleteTag(req, res) {
    isAuthenticated(req, res, () => {
      let tagId = req.body.tagId;
      Contact.updateMany({ tags: { $in: tagId } }, { $pull: { tags: tagId } })
        .then(() =>
          Tag.deleteOne({ _id: mongoose.Types.ObjectId(tagId) })
            .then((response) => res.json({ data: response }))
            .catch((err) => {
              console.log(err);
              res.json({ data: { error: err } });
            })
        )
        .catch((err) => {
          console.log(err);
          res.json({ data: { error: err } });
        });
    });
  }
}
export default new Controller();
