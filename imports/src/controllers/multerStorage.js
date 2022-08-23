const multer = require('multer')

global.__basedir = __dirname


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,__basedir+'/uploads/')
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now() + '-'+file.originalname)
    }
})

const CsvFilter = (req,file,cb)=>{
    if(file.mimetype.includes('csv')){
        cb(null,true)
    }
    else{
        cb("Please upload only csv file.",false)
    }
}
module.exports = multer({storage:storage,fileFilter:CsvFilter})