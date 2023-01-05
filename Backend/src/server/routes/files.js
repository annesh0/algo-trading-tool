const express = require("express");
const fileRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

fileRoutes.route("/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let file = { name: req.body.name, file: binary(req.files.uploadedFile.data) }
    db_connect.collection("data").insertOne(file, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});

fileRoutes.route("/").get(function (req, response) {
    let db_connect = dbo.getDb('data');
    if (err) throw err;
      response.json(res);
});

module.exports = fileRoutes;