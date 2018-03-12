const functions = require('firebase-functions');
const fs = require('fs');
const path = require('path');
const express = require('express');
const ejs = require("ejs");
const http = require("http");
const https = require("https");
const cors = require("cors");

const app = express();
let img_list;


fs.readdir('../public/256x144/', function(err, list){
  if (err) return;
  img_list = list;
});

// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname+'/../views');
app.use(cors({ origin: true }));
app.use(express.static('/public'));
app.get('/', (req, res) => {
  res.render('index', {img_list: img_list});
});

const api1 = functions.https.onRequest(app);

module.exports = {
  api1
}

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
