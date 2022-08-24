import Tag from '../../../models/tag';
import isAuthenticated from '../../middlewares/isAuthenticated.jwt.js';
import Contact from '../../../models/contact';
import mongoose from 'mongoose';

export class Controller {
  all(req, res) {
    isAuthenticated(req, res, async () => {
      try {
        let tagsCount = await Tag.countDocuments();
        Tag.find({ isValid: true }).then(
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
      };

      let createdTag = Tag.create(createdTagData).then(
        (r) => res.json({ data: r }),
        (error) => res.json({ data: { error: error } })
      );
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
            .catch((err) => res.json({ data: { error: err } }))
        )
        .catch((err) => res.json({ data: { error: err } }));
    });
  }
}
export default new Controller();
