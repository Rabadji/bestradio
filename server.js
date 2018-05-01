var express = require('express');
var app = express();
var path    = require("path");
app.use(express.static("public"));
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/public/" + "style.css");
});
app.get('/page1',function(req,res){
  res.sendFile(path.join(__dirname+'/public/page1.html'));
});
app.get('/page2',function(req,res){
  res.sendFile(path.join(__dirname+'/public/page2.html'));
});


app.listen(3001, function () {
  console.log('Example app listening on port 3000!');
});