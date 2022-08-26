const fs = require("fs");
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);
const http = require("http");
const csv = require("csv-parser");
const { parse } = require("json2csv");
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
    let importPromise = [];
    req.body.tags = JSON.parse(req.body.tags);
    let tags = req.body.tags.map((oTag) => oTag._id);
    let Path = __basedir + "/uploads/" + req.file.filename;
    let csv_paths = [];
    fs.createReadStream(Path)
      .pipe(csv())
      .on("data", (data) => {
        data.status = "Subscribed";
        data.hash = randomString;
        temp_headers = Object.keys(data);
        if(!temp_headers.includes("email") && !temp_headers.includes("phone")){
          res.send({data : {error : "Atleast email or phone field is required for importing contacts!"}});
        }
        arr = findRemainingHeaders(temp_headers);
        dataArray.push(data);
      })
      .on("end", async function () {
        try {
          let batchSize = 10000;
          for (let i = 0; i <= (dataArray.length - 1) / batchSize; i++) {
            var result = parse(
              dataArray.slice(
                i * batchSize,
                (i + 1) * batchSize - 1 < dataArray.length
                  ? (i + 1) * batchSize
                  : dataArray.length - 1
              ),
              {
                fields: Object.keys(dataArray[0]),
                header: false,
              }
            );
            console.log("Batch Execution Started ",i);
            fs.writeFileSync(`new_${i}.csv`, result);
            let newPath = __basedir + `/new_${i}.csv`;
            let command =
              "mongoimport --uri " +
              env.DB_STRING +
              " -c contacts --type=csv --fields=" +
              temp_headers.toString() +
              " --file " +
              `${newPath}` +
              " --ignoreBlanks";

            importPromise.push(exec(command));
            console.log(`Completed Batch ${i}`);
          }
          Promise.all(importPromise).then(async ()=>{
            try{
              console.log("imported contacts");
              deleteCsv(Path);
              await addTags(randomString, tags , req.user);
              res.send("Successfully uploaded the CSV into Database");
            }catch(err){
              console.log(err);
              res.send("Contacts Added,unable to attach tags");
            }
          })
        } catch (error) {
          console.log(error);
          res.status(500).send({
            message: "Couldnot send request",
          });
        }
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

async function addTags(hash, tags , createdBy) {
  try {
    contact.updateMany(
      { hash: hash },
      {
        $set: {
          tags: tags,
          isValid: true,
          createdOn: new Date(),
          updatedOn: new Date(),
          createdBy : createdBy
        },
      },
      { $unset: { hash: 1 } },
      (err, doc) => {
        if (err) {
          console.log(err);
        }
        console.log(doc);
        console.log({ message: "Successfully added tags" });
      }
    );
  } catch (error) {
    console.log(error);
  }
}
