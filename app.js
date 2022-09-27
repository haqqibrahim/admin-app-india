require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

const adminRoutes = require("./routes/adminRoutes")

const app = express();

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("uploads"));
app.set("view engine", "ejs");

// DB Connection
const dbURI = process.env.DB_URI;
mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DB Connection established");
  }
);


app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use(adminRoutes)

app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
