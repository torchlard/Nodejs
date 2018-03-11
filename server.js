const fs = require('fs');
const path = require('path');
const express = require('express');
const ejs = require("ejs");

const app = express();
let img_list;

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
})


// fs.readFile('index.html', (err, data) => {
//   app.get('/', (req, res) => {
//     res.send(data);
//   });
// });

let server = app.listen(8000, () => console.log("start listening..."));


