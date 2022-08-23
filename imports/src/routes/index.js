const express = require("express");
const router = new express.Router();

const importContacts = require('../controllers/importContacts')
const upload = require('../controllers/multerStorage')

router.get('/',(req,res)=>{
    res.send('Export Contacts Endpoint')
})


router.post('/importContacts',upload.single('file'),importContacts)

module.exports = router