const fs = require('fs');
const path = require('path');
const http = require('http');

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

http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(req.url);
  res.end('\nhello world! The time now is '+ dt.myDateTime());
}).listen(8080);




