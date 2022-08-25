const fs = require("fs");
const http = require("http");
const csv = require("csv-parser");
const { parse } = require("json2csv");
let exec = require("child_process").exec;
const { array } = require("./multerStorage");
const contact = require("../models/contact");
const constants = require("../../constants");
const env = require("../../env");
var dataArray = [];
var temp_headers = [];

global.__basedir = __dirname;

module.exports = (req, res) => {
  try {
    if (req.file == undefined) {
      res.status(400).send({
        message: "Please upload a CSV File",
      });
    }
    let randomString = makeid(5);
    req.body.tags = JSON.parse(req.body.tags);
    let tags = req.body.tags.map(oTag=>oTag._id);
    let Path = __basedir + "/uploads/" + req.file.filename;
    fs.createReadStream(Path)
      .pipe(csv())
      .on("data", (data) => {
        data.status = "Subscribed";
        data.hash = randomString;
        temp_headers = Object.keys(data);
        arr = findRemainingHeaders(temp_headers);
        dataArray.push(data);
      })
      .on("end", function () {
        var result = parse(dataArray, {
          fields: Object.keys(dataArray[0]),
          header: false,
        });
        fs.writeFileSync("new.csv", result);
        let newPath = __basedir + "/new.csv";
        let command =
          "mongoimport --uri " +
          env.DB_STRING +
          " -c contacts --type=csv --fields=" +
          temp_headers.toString() +
          " --file " +
          `"${newPath}"` +
          " --ignoreBlanks";

        exec(command, (err, stdout, stderr) => {
          deleteCsv(Path);
          if (err) {
            console.log(err.message);
          } else {
            console.log("Success");

            //API call to add tags to Backend
            addTags(randomString, tags);

            res.send("Successfully uploaded the CSV into Database");
          }
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Couldnot send request",
    });
  }
};

function findRemainingHeaders(headers) {
  arr = [];
  for (let i = 0; i < headers.length; i++) {
    if (!(headers[i] in constants.schemaFields)) {
      arr.push(headers[i]);
    }
  }
  return arr;
}


function deleteCsv(Path) {
  fs.unlink(Path, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Delete Successful");
    }
  });
}

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}



async function addTags(hash,tags){
  try {
      contact.updateMany({hash:hash},{$set : {tags:tags, isValid:true , createdOn : new Date() , updatedOn : new Date() }}, {$unset : { hash : 1} },(err,doc)=>{
          if(err){
            console.log(err);
          }
          console.log({message:"Successfully added tags"})
      })
  } catch (error) {
    console.log(error);
  }
  
}