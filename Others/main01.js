const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const express = require('express');

// // =========== copy file ===========
// let copy = (src,dst) => fs.writeFileSync(dst, fs.readFileSync(src));
// let copy = (src, dst) => fs.createReadStream(src).pipe(fs.createWriteStream(dst));
// let main = argv => copy(argv[0], argv[1]);
//
// main(process.argv.slice(2))
//
// // =========== show buffer string ===========
// let bin = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x3d]);
// let str = bin.toString('utf-8')
// console.log(str)
//
// let bin2 = new Buffer('hello', 'utf-8');
// let sub = bin2.slice(2);
// sub[0] = 0x65;
// console.log(bin2)

// // =========== copy buffer ===========
// let bin = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x3d]);
// let dup = new Buffer(bin.length);
// bin.copy(dup);
// dup[0] = 0x48;
// console.log(bin)
// console.log(dup)

// // =========== file r/w steam ===========
// let rs = fs.createReadStream(src);
// let ws = fs.createWriteStream(des);
// // rs.on('data', chunk => {
// //   rs.pause();
// //   ws.write(chunk);
// //   doSth(chunk, () => rs.resume());
// // });
// // rs.on('end', () => {
// //   cleanUp();
// //   ws.end();
// // });
// rs.on('data', chunk => {
//   if(ws.write(chunk) === false){
//     rs.pause();
//   }
// });
// rs.on('end', ()=> ws.end());
// ws.on('drain', () => rs.resume() );

// // =========== generate path ===========
// let cache = {};
// function store(key, value){
//   cache[path.normalize(key)] = value
// }
// store('foo/bar',1);
// store('foo/sd/../../bar', 2)
// console.log(cache);

// // =========== read filename recursively ===========
// function travel(dir, callback){
//   fs.readdirSync(dir).forEach( file => {
//     let pathname = path.join(dir, file);
//     if (fs.statSync(pathname).isDirectory()){
//       travel(pathname, callback);
//     } else {
//       callback(pathname);
//     }
//   });
// };

// var walk = function(dir, done) {
//   var results = [];
//   fs.readdir(dir, function(err, list) {
//     if (err) return done(err);
//     var pending = list.length;
//     if (!pending) return done(null, results);
//     list.forEach(function(file) {
//       file = path.resolve(dir, file);
//       fs.stat(file, function(err, stat) {
//         if (stat && stat.isDirectory()) {
//           walk(file, function(err, res) {
//             results = results.concat(res);
//             if (!--pending) done(null, results);
//           });
//         } else {
//           results.push(file);
//           if (!--pending) done(null, results);
//         }
//       });
//     });
//   });
// };
//
// walk('/home/lkit/Notes', function(err, results) {
//   if (err) throw err;
//   console.log(results);
// });

const dt = require('./myfirstmodule');

// fs.readdir('/home/lkit/tmp', function(err, list){
//   if (err) return;
//   list.forEach(function(file){
//     console.log(file);
//   })
// });

// http://localhost:8000/sun/?year=2017&month=July
// http.createServer(function(req, res){
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write(req.url);
//   let q = url.parse(req.url, true).query;
//   let txt = "\n"+q.year + " " + q.month;
//   res.end(txt);
//   // res.end('\nhello world! The time now is '+ dt.myDateTime());
// }).listen(8000);

// http.createServer(function(req, res){
//   let head = {'Content-Type': 'text/html'};
//   switch(req.url.slice(-3)){
//     case '.js': head={'Content-Type': 'text/javascript'}; break;
//     case 'css': head={'Content-Type': 'text/css'}; break;
//     case 'png': head={'Content-Type': 'image/png'}; break;
//   }
//   res.writeHead(200, head);
//   let file_stream = fs.createReadStream('index.html');
//   file_stream.on("error", (err) => console.log(err));
//   file_stream.on("data", data => res.write(data));
//   file_stream.on("close", () => res.end());
// 
//   // fs.readFile('index.html', function(err, data){
//   //   res.writeHead(200, {'Content-type': 'text/html'});
//   //   res.write(data);
//   // });
//   // fs.readFile('index.css', (err,data) => {
//   //   res.writeHead(200, {'Content-type': 'text/css'});
//   //   res.write(data);
//   // });
//   // fs.readFile('main02.js', (err,data) => {
//   //   if(err) throw err;
//   //   res.writeHead(200, {'Content-type': 'text/javascript'});
//   //   res.write(data);
//   //   res.end();
//   // });
// 
// }).listen(8000);


// // multiple webpage
// http.createServer(function(req, res){
//   if(req.url == "/"){
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write("<html><body>Home page</body><html>");
//     res.end();
//   } else if(req.url == "/student"){
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write("<html><body>Student abc!</body></html>");
//     res.end();
//   } else if(req.url == "/data"){
//     res.writeHead(200, {'Content-Type': 'application/json'});
//     res.write(JSON.stringify({ message: "hello world"}));
//     res.end();
//   }
//   else {
//     res.end("invalid request");
//   }
// }).listen(8000);

const app = express();
app.use(express.static('./resource'));

fs.readFile('index.html', (err, data) => {
  app.get('/', (req, res) => {
    // res.send("<p>hello world</p>");
    // res.send({message: "key"});
    res.send(data);
  });
});

// app.get('/student', function(req, res){
//   console.log("get student");
//   res.send('hello student');
// });

let server = app.listen(8000, () => console.log("start listening..."));







