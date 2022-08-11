const mongoose = require("mongoose");
const { MongoCron } = require("mongodb-cron");
const env = require('env');
const http = require("http");
const executeCampaign = require('./execute');

const server = http.createServer((req,res)=>{
    res.send("Server Created");
})

const port = process.env.PORT || 2021 ;

mongoose.connect(env.DB_STRING , { useNewUrlParser : true, useUnifiedTopology : true })
.then(async() => {
    console.log("Database Connected");
}).catch(err=>{
    console.log("Error Connecting to Database ")
    console.log(err.stack);
})


let db = mongoose.connection;



db.on('error' , console.error.bind(console,'connection error : '));
let collection = {};
db.once('open',()=>{
    collection = db.collection('jobs');
    const cron = new MongoCron({
        collection,
        onDocument : (doc) => executeCampaign(doc),
        onError : (err) => console.log("Error ",err)
    });
    cron.start();
})




server.listen(port,()=>{
    console.log(`Server Listening on Port ${port}`);
})