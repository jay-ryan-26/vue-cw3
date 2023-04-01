const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(express.json());
const { MongoClient } = require("mongodb");

const Port = process.env.PORT;
const ConnectionString = process.env.CONNECTION_STRING;

app.set("port", Port);
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Connect to webstore db
let db;
MongoClient.connect(ConnectionString, (err, client) => {
  db = client.db("webstore");
  if (err) {
    console.log(err);
  }
});

app.use(express.static("public"));

// Display all lessons
app.get("/lessons", (req, res, next) => {
  db.collection("lessons")
    .find({})
    .toArray((e, result) => {
      if (e) return next(e);
      res.json(result);
      console.log("Got Lessons");
    });
});

app.listen(Port, () => {
  console.log(`app on port: localhost:${Port}`);
});
