import contact from '../../../models/contact'

export class Controller{
    addTags(req,res){
        try {
            contact.updateMany({hash:req.body.hash},{tags:req.body.tags,isValid:true},(err)=>{
                if(err){
                    res.status(400).send({
                        message:err.message
                    })
                }
                res.send({message:"Successfully added tags"})
            })
        } catch (error) {
                res.status(400).send({
                    message:error.message
                })
        }
        
    }
}

export default new Controller()