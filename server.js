const fs = require('fs');
const path = require('path');
const express = require('express');
const ejs = require("ejs");
const http = require("http");
const https = require("https");
// const firebase = require('firebase');
const functions = require('firebase-functions');
const app = express();
let img_list;

// const config = {
//   apiKey: "AIzaSyBioAzNu78CZAfAxUMg4kglpGOQtOoffwA",
//   authDomain: "proven-cider-137511.firebaseapp.com",
//   databaseURL: "https://proven-cider-137511.firebaseio.com",
//   projectId: "proven-cider-137511",
//   storageBucket: "proven-cider-137511.appspot.com",
//   messagingSenderId: "558830377975"
// };
// firebase.initializeApp(config);

// https
const privateKey = fs.readFileSync('/home/lkit/Private/private.pem','utf8');
const certificate = fs.readFileSync('/home/lkit/Private/file.crt','utf8');
const credentials = {key: privateKey, cert: certificate};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

fs.readdir('./public/256x144/', function(err, list){
  if (err) return;
  img_list = list;
  // list.forEach(function(file){
  //   console.log(file);
  // })
});

// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('./public'));
app.get('/', (req, res) => {
  res.render('index', {img_list: img_list});
});

// fs.readFile('index.html', (err, data) => {
//   app.get('/', (req, res) => {
//     res.send(data);
//   });
// });

httpServer.listen(8000, () => console.log("start listening..."));
// httpsServer.listen(18081, () => console.log("start ssl ..."));



