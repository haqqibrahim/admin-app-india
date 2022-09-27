const express = require("express");
const mysql = require("mysql");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

const app = express();

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("uploads"));

app.set("view engine", "ejs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

const mySQL = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Haqq0000.",
  database: "admin",
  multipleStatements: true,
});

mySQL.connect((err) => {
  if (!err) {
    console.log("DB Connected");
  } else {
    console.log(err.sqlMessage);
  }
});

app.get("/", (req, res) => {
  mySQL.query("SELECT * FROM admin ORDER BY id DESC LIMIT 4", (err, rows) => {
    if (!err) {
      res.render("index", { rows: rows });
      console.log(rows);
    } else {
      console.log(err.sqlMessage);
    }
  });
});

app.post("/", upload.single("sampleFile"), (req, res) => {
  // name of the input is sampleFile
  const sampleFile = fs.readFileSync(req.file.path);
//   let encodeImage = sampleFile.toString("base64");

  console.log(sampleFile);
  mySQL.query(
    "INSERT admin (profile_image_data, profile_image_contentType, description) VALUES (?,?,?)",
    [
      new Buffer.from(sampleFile, "base64"),
      req.file.mimetype,
      req.body.description,
    ],
    (err) => {
      if (!err) {
        res.redirect("/");
      } else {
        console.log(err.sqlMessage);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});

// How to get the last 4 rows in database using sql?