import Users from "../../../models/UserModel";
import isAuthenticated from "../../middlewares/isAuthenticated.jwt";
import AuthenticationService from "../../services/authentication.service";
import PasswordService from "../../services/password.service";
import aws from "aws-sdk";
import env from "../../../config/env";

async function verifyEmailIdentity(email) {
  return new Promise((resolve, reject) => {
    aws.config.update({
      accesskeyId: env.AWS_ACCESS_KEY,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      region: env.AWS_REGION,
    });
    var params = {
      EmailAddress: email,
    };
    let ses = new aws.SES({ apiVersion: "2010-12-01" });
    ses.verifyEmailAddress(params, function (err, data) {
      if (err) reject(err);
      else resolve({ success: true, sendVerification: true });
    });
  });
}

export class Controller {
  async getUser(req, res) {
    isAuthenticated(req, res, async () => {
      try {
        Users.findById(req.user)
          .then((user) => {
            if (!user) {
              return res
                .status(401)
                .json({ data: { error: "User does not exist" } });
            }
            user = JSON.parse(JSON.stringify(user));
            delete user.hash;
            delete user.salt;

            return res.status(200).json({
              data: user,
            });
          })
          .catch((err) => {
            res.status(400).json({ data: { error: err } });
          });
      } catch (err) {
        res.status(400).json({ error: err });
      }
    });
  }

  async updateUser(req, res) {
    isAuthenticated(req, res, async () => {
      try {
        let { email, name, unSubscriptionForm } = req.body;
        Users.findById(req.user)
          .then((user) => {
            if (!user) {
              return res
                .status(401)
                .json({ data: { error: "User does not exist" } });
            }
            if (!email && !name && !unSubscriptionForm) {
              return res
                .status(401)
                .json({ data: { error: "Nothing to update" } });
            }
            if (email) user.email = email;
            if (name) user.name = name;
            if (unSubscriptionForm)
              user.unSubscriptionForm = unSubscriptionForm;
            user.save().then(
              () =>
                res.json({
                  data: {
                    message: "User updated successfully",
                  },
                }),
              (error) => res.json({ data: { error: error } })
            );
          })
          .catch((err) => {
            res.status(400).json({ data: { error: err } });
          });
      } catch (err) {
        res.status(400).json({ error: err });
      }
    });
  }

  async changePassword(req, res) {
    isAuthenticated(req, res, async () => {
      try {
        const { password, newPassword, newConfirmPassword } = req.body;
        Users.findById(req.user)
          .then((user) => {
            if (!user) {
              return res
                .status(401)
                .json({ data: { error: "User does not exist" } });
            } else if (
              !PasswordService.checkPassword(password, user.hash, user.salt)
            ) {
              return res
                .status(401)
                .json({ data: { error: "Invalid Password" } });
            }
            if (newPassword !== newConfirmPassword) {
              return res.status(401).json({
                data: {
                  error: "New Password and Confirm Password do not match",
                },
              });
            }
            let { salt, hash } = PasswordService.createPassword(newPassword);
            user.salt = salt;
            user.hash = hash;
            user.save().then(
              () =>
                res.json({
                  data: {
                    message: "Password changed successfully",
                  },
                }),
              (error) => res.json({ data: { error: error } })
            );
          })
          .catch((err) => {
            res.status(401).json({ data: { error: err } });
          });
      } catch (err) {
        res.json({ error: err });
      }
    });
  }

  async addAdmin(req, res) {
    isAuthenticated(req, res, async () => {
      try {
        if (req.adminRole !== "superAdmin") {
          return res
            .status(401)
            .json({ data: { error: "You are not authorized to add admin" } });
        }
        let { adminEmail } = req.body;
        Users.findOne({ email: adminEmail })
          .then((user) => {
            if (!user) {
              return res
                .status(401)
                .json({ data: { error: "User does not exist" } });
            }
            user.isAdmin = "admin";
            user.save().then(
              () =>
                res.json({
                  data: {
                    message: "admin added successfully",
                  },
                }),
              (error) => res.json({ data: { error: error } })
            );
          })
          .catch((err) => {
            res.status(401).json({ data: { error: err } });
          });
      } catch (err) {
        res.json({ error: err });
      }
    });
  }

  async removeAdmin(req, res) {
    isAuthenticated(req, res, async () => {
      try {
        if (req.adminRole !== "superAdmin") {
          return res.status(401).json({
            data: { error: "You are not authorized to remove admin" },
          });
        }
        let { adminEmail } = req.body;
        Users.findOne({ email: adminEmail })
          .then((user) => {
            if (!user) {
              return res

                .status(401)
                .json({ data: { error: "User does not exist" } });
            }
            user.isAdmin = "user";
            user.save().then(
              () =>
                res.json({
                  data: {
                    message: "Admin removed successfully",
                  },
                }),
              (error) => res.json({ data: { error: error } })
            );
          })
          .catch((err) => {
            res.status(401).json({ data: { error: err } });
          });
      } catch (err) {
        res.json({ error: err });
      }
    });
  }

  async getAdmins(req, res) {
    isAuthenticated(req, res, async () => {
      try {
        if (req.adminRole !== "superAdmin") {
          return res.status(401).json({
            data: { error: "You are not authorized to get admins" },
          });
        }
        Users.find({ isAdmin: "admin" })
          .then((users) => {
            return res.status(200).json({
              data: users ? users : [],
            });
          })
          .catch((err) => {
            res.status(401).json({ data: { error: err } });
          });
      } catch (err) {
        res.json({ error: err });
      }
    });
  }

  async register(req, res) {
    try {
      let duplicateUser = await Users.findOne({ email: req.body.email });
      if (duplicateUser) {
        res.status(409).json({ data: { error: "Email Already Exists" } });
      } else {
        let { salt, hash } = PasswordService.createPassword(req.body.password);
        let user = new Users({
          email: req.body.email,
          name: req.body.name,
          salt: salt,
          hash: hash,
        });
        user.save(async (err, user) => {
          if (err) res.status(400).json({ data: { error: err } });
          else {
            try {
              if (user.email) await verifyEmailIdentity(user.email);
              res.json({
                data: user,
                token: AuthenticationService.generateToken(
                  user._id,
                  user.isAdmin
                ),
                sentVerification: true,
              });
            } catch (err) {
              res.status(400).json({ data: { error: err } });
            }
          }
        });
      }
    } catch (err) {
      res.status(400).json({ data: { error: err } });
    }
  }

  login(req, res) {
    Users.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          res
            .status(401)
            .json({ data: { error: "Invalid Email or Password" } });
        } else if (
          !PasswordService.checkPassword(
            req.body.password,
            user.hash,
            user.salt
          )
        ) {
          res
            .status(401)
            .json({ data: { error: "Invalid Email or Password" } });
        } else {
          res.status(200).json({
            data: {
              token: AuthenticationService.generateToken(
                user._id,
                user.isAdmin
              ),
            },
          });
        }
      })
      .catch((err) => {
        res.status(400).json({ data: { error: err } });
      });
  }
}
export default new Controller();
