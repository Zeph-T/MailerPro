import Users from "../../../models/UserModel";
import Contact from "../../../models/contact";
import mongoose from "mongoose";
import isAuthenticated from "../../middlewares/isAuthenticated.jwt";

export class Controller {
  async all(req, res) {
    isAuthenticated(req, res, () => {
      let skip = req.query.skip,
        limit = 10;
      let countPromise = Contact.countDocuments({ isValid: true });
      let unSubscribedCountPromise = Contact.countDocuments({
        status: "Unsubscribed",
        isValid: true,
      });
      let contactPromise = Contact.find({ isValid: true })
        .sort({ _id: -1 })
        .skip(skip * 10)
        .limit(limit);

      Promise.all([countPromise, contactPromise, unSubscribedCountPromise])
        .then(([totalCount, contacts, countUnSubscribed]) => {
          res.json({
            data: {
              count: {
                total: totalCount,
                totalUnsubscribed: countUnSubscribed,
              },
              contacts: contacts,
            },
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send({ data: { error: err } });
        });
    });
  }
  async addContact(req, res) {
    isAuthenticated(req, res, async () => {
      try {
        if (req.body && (req.body.email || req.body.phone)) {
          let contact = await Contact.create(req.body);
          // newContact.save((err,contact)=>{
          //   if (contact) {
          // return res.status(400).send({ data: { error: err } });
          //   } else {
          return res.status(200).send({ data: contact });
          //   }
          // })
        } else throw "Request Body error!";
      } catch (err) {
        return res.status(400).send({ data: { errror: err } });
      }
    });
  }
  async removeContact(req, res) {
    isAuthenticated(req, res, () => {
      try {
        if (req.body && req.body.id) {
          Contact.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.body.id) },
            { $set: { isValid: false } }
          )
            .then(() => res.status(200).json({ data: { Status: "Success" } }))
            .catch((err) => {
              console.log(err);
              return res.status(400).send({ data: { error: err } });
            });
        } else throw "Request Body error!";
      } catch (err) {
        console.log(err);
        return res.status(400).send({ data: { error: err } });
      }
    });
  }

  async updateContact(req, res) {
    isAuthenticated(req, res, () => {
      try {
        if (req.params && req.body._id) {
          Contact.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.body._id) },
            req.body,
            { upsert: true, setDefaultsOnInsert: true }
          )
            .then((contact) => {
              res.status(200).send({ data: contact });
            })
            .catch((err) => {
              console.log(err);
              return res.status(400).send({ data: { error: err } });
            });
        } else {
          throw "Contact ID not found!";
        }
      } catch (err) {
        console.log(err);
        return res.status(400).send({ data: { error: err } });
      }
    });
  }
  
  async unSubscribeFromLink(req,res){
    try{
      if (req.params && req.params.contactId) {
        Contact.findOneAndUpdate(
          { _id: mongoose.Types.ObjectId(req.params.contactId) },
          {status : "Unsubscribed" },
          { upsert: true, setDefaultsOnInsert: true }
        )
          .then((contact) => {
            res.status(200).send({success : true});
          })
          .catch((err) => {
            console.log(err);
            return res.status(400).send({ data: { error: err } });
          });
      } else {
        throw "Contact ID not found!";
      }
    }catch(err){
      return res.status(400).send({ data: { error: err } });
    }
  }

}
export default new Controller();
