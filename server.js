const express = require("express");
require("dotenv").config();
const app = express();
const Port = process.env.PORT;
const cors = require("cors");
const ConnectionString = process.env.CONNECTION_STRING;
app.use(express.json());
app.set("port", Port);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(cors());

// Logger
app.use((req, res, next) => {
  console.log("Req IP: ", req.url);
  console.log("Req Date: ", new Date());
  next();
});

const MongoClient = require("mongodb").MongoClient;

// Connect to webstore db
let db;
MongoClient.connect(ConnectionString, (err, client) => {
  db = client.db("webstore");
});

app.use(express.static("public"));
// });

// Display all lessons
app.get("/lessons", (req, res, next) => {
  db.collection("lessons")
    .find({})
    .toArray((e, result) => {
      if (e) return next(e);
      res.send(result);
      console.log("Got Lessons");
    });
});
