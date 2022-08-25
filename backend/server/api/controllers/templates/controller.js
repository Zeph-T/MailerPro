import isAuthenticated from "../../middlewares/isAuthenticated.jwt.js";
import mongoose from "mongoose";
import Template from "../../../models/template";

export class Controller {
  all(req, res) {
    isAuthenticated(req, res, async () => {
      try {
        let templatesCount = await Template.countDocuments();
        Template.find({ isValid: true, templateType: req.params.type }).then(
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
        res.json({ error: err });
      }
    });
  }

  createTemplate(req, res) {
    isAuthenticated(req, res, () => {
      Template.create({ ...req.body, templateType: req.params.type }).then(
        (r) => res.json({ data: r }),
        (error) => res.json({ data: { error: error } })
      );
    });
  }

  updateTemplate(req, res) {
    isAuthenticated(req, res, () => {
      try {
        if (req.body && req.body._id) {
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
}
export default new Controller();
