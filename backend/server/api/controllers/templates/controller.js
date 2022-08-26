import isAuthenticated from "../../middlewares/isAuthenticated.jwt.js";
import mongoose from "mongoose";
import Template from "../../../models/template";

export class Controller {
  all(req, res) {
    isAuthenticated(req, res, async () => {
      try {
        let query = { isValid: true };
        req.isAdmin ? null : (query.createdBy = req.user);
        let templatesCount = await Template.countDocuments({
          ...query,
          templateType: req.params.type,
        });
        let limit = 10,
          skip = req.query.skip;
        Template.find({ ...query, templateType: req.params.type })
          .skip(skip * 10)
          .limit(limit)
          .then(
            (r) =>
              res.json({
                data: {
                  total: templatesCount,
                  templates: r,
                },
              }),
            (error) => res.json({ error: error })
          );
      } catch (err) {
        res.status(400).json({ error: err });
      }
    });
  }

  createTemplate(req, res) {
    isAuthenticated(req, res, () => {
      req.body.templateType = req.params.type;
      req.body.createdBy = req.user;
      Template.create(req.body).then(
        (r) => res.json({ data: r }),
        (error) => res.status(400).status(404).json({ data: { error: error } })
      );
    });
  }

  updateTemplate(req, res) {
    isAuthenticated(req, res, () => {
      try {
        if (req.body && req.body._id) {
          req.body.createdBy = req.user;
          Template.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.body._id) },
            req.body,
            { new: true }
          )
            .then((r) => res.json({ data: r }))
            .catch((err) => res.status(400).json({ data: { error: err } }));
        } else {
          throw "NO ID found!";
        }
      } catch (err) {
        return res.status(400).json({ data: { error: err } });
      }
    });
  }

  deleteTemplate(req, res) {
    isAuthenticated(req, res, () => {
      try {
        if (req.body && req.body.templateId) {
          let templateId = req.body.templateId;
          Template.deleteOne({ _id: mongoose.Types.ObjectId(templateId) })
            .then(() => res.json({ data: { success: true } }))
            .catch((err) => res.status(400).json({ data: { error: err } }));
        } else {
          throw "NO ID found!";
        }
      } catch (err) {
        res.status(400).json({ data: { error: err } });
      }
    });
  }

  getTemplate(req, res) {
    isAuthenticated(req, res, () => {
      try {
        const templateId = req.params.templateId;
        if (templateId) {
          Template.findOne({ _id: templateId })
            .then((r) => res.json({ data: r }))
            .catch((err) => res.status(400).json({ data: { error: err } }));
        } else {
          throw "NO ID found!";
        }
      } catch (err) {
        res.status(400).json({ data: { error: err } });
      }
    });
  }
}

export default new Controller();
