import Users from '../../../models/UserModel'
import Contact from '../../../models/contact';
import mongoose from 'mongoose';

export class Controller {
    async all(req,res){
            isAuthenticated(req,res , ()=> {

            Contact.find({isValid : true}).then(oContacts=>res.json({data : oContacts}))
            .catch(err=>{
                console.log(err);
                res.status(400).send({data : {error : err}})
            })
        })
    }
    async addContact(req,res){
            isAuthenticated(req,res , ()=> {
            try{
                if(req.body && (req.body.email || req.body.phone)){
                    let newContact = new Contact(req.body);
                    newContact.save((err,contact)=>{
                        if(err){
                            return res.status(400).send({data : {error : err}});
                        }else{
                            return res.status(200).send({data : contact});
                        }
                    })
                }else throw 'Request Body error!';
            }catch(err){
                return res.status(400).send({data : {errror : err}});
            }
        })
    }
    async removeContact(req,res){
        isAuthenticated(req,res , ()=> {
            try{
                if(req.body && req.body.id){
                    Contact.findOneAndUpdate({_id : mongoose.Types.ObjectId(req.body.id)},{$set : {isValid : false}})
                    .then(()=>res.status(200).json({"data" : {"Status" : "Success"}}))
                    .catch(err=>{
                        console.log(err);
                        return res.status(400).send({"data" : {error : err}});
                    })
                }else throw 'Request Body error!';
            }catch(err){
                console.log(err);
                return res.status(400).send({data : {error : err}});  
            }
        })
    }
}
export default new Controller();
