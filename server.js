const fs = require('fs');
const path = require('path');
const express = require('express');
const ejs = require("ejs");
const http = require("http");
const https = require("https");
const request = require("request");

const app = express();
let img_list, hero_names=[];

// const api_key = fs.readFileSync('./key.txt','utf8');
// const api_url = "https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key="+ api_key +"&language=en_us";
const hero_data = JSON.parse(fs.readFileSync('./public/hero.json'));

for(i of hero_data.result.heroes){
  hero_names.push(i.localized_name);
}
hero_names = hero_names.sort();

// request.get({
//   url: api_url,
//   json: true,
//   headers: {'User-Agent': 'request'}
// }, (err, res, data) => {
//   if (err) {
//     console.log('error: '+err);
//   } else if (res.statusCode !== 200){
//     console.log("status: "+res.statusCode);
//   } else {
//     hero_names = data;
//     console.log(JSON.stringify(data));
//   }
// });


// https
// const privateKey = fs.readFileSync('/home/lkit/Private/private.pem','utf8');
// const certificate = fs.readFileSync('/home/lkit/Private/file.crt','utf8');
// const credentials = {key: privateKey, cert: certificate};

const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

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
  res.render('hero_detail', {img_list: img_list, hero_names: hero_names});
});

// fs.readFile('index.html', (err, data) => {
//   app.get('/', (req, res) => {
//     res.send(data);
//   });
// });

httpServer.listen(8000, () => console.log("start listening..."));
// httpsServer.listen(18081, () => console.log("start ssl ..."));



