const fs = require("fs");
const csv = require("csv-parser");
let exec = require("child_process").exec;
const { array } = require("./multerStorage");
const constants = require("../../constants");
const env = require("../../env");
global.__basedir = __dirname;

module.exports = (req, res) => {
  try {
    if (req.file == undefined) {
      res.status(400).send({
        message: "Please upload a CSV File",
      });
    }
    let Path = __basedir + "\\uploads\\" + req.file.filename;
    fs.createReadStream(Path)
      .pipe(csv())
      .on("headers", (headers) => {
        arr = findRemainingHeaders(headers);
        //Make API call to add arr to contactFields

        newPath = removeCsvHeader(Path);

        let command =
          "mongoimport --uri " +
          env.DB_STRING +
          " -c collection --type=csv --fields=" +
          headers.toString() +
          " --file " +
          `"${newPath}"` +
          " --ignoreBlanks";

        exec(command, (err, stdout, stderr) => {
          deleteCsv(Path);
          if (err) {
            console.log(err.message);
          } else {
            console.log("Success");
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

function removeCsvHeader(Path) {
  fs.readFile(Path, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    let lines = data.split("\n").slice(1);
    newdata = lines.join("\n");
    fs.writeFileSync("new.csv", newdata);
  });
  return __basedir + "\\new.csv";
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
