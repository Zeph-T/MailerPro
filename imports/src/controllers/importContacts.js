const fs = require("fs");
const http = require("http");
const csv = require("csv-parser");
const { parse } = require("json2csv");
let exec = require("child_process").exec;
const { array } = require("./multerStorage");
const constants = require("../../constants");
const env = require("../../env");
const { Http2ServerRequest } = require("http2");
var dataArray = [];
var temp_headers = [];
var randomString = makeid(5);

global.__basedir = __dirname;

module.exports = (req, res) => {
  try {
    if (req.file == undefined) {
      res.status(400).send({
        message: "Please upload a CSV File",
      });
    }
    let tags = req.body.tags;
    let Path = __basedir + "\\uploads\\" + req.file.filename;
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
        let newPath = __basedir + "\\new.csv";
        let command =
          "mongoimport --uri " +
          env.DB_STRING +
          " -c collection --type=csv --fields=" +
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
            addTags();

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

// function removeCsvHeader(Path) {
//   fs.readFile(Path, "utf8", (err, data) => {
//     if (err) {
//       console.log(err);
//       res.status(400).send(err);
//     }
//     let lines = data.split("\n").slice(1);
//     newdata = lines.join("\n");
//     fs.writeFileSync("new.csv", newdata);
//   });
//   return ;
// }

function addTags() {
  var options = {
    host: "",
    port: "",
    path: "/addTags",
    method: "POST",
    body: {
      tags: temp_headers,
      hash: randomString,
    },
  };

  http.request(options, (res) => {
    console.log(res.statusCode);
  });
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
