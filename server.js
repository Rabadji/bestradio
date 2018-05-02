const express=require('express');
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened:true}));
const MongoClient=require("mongodb").MongoClient;
const ObjectID=require('mongodb').ObjectID;
var db;
var path    = require("path");


app.use(express.static("radio"));
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/radio/" + "style.css");
});
app.get('/page1',function(req,res){
  res.sendFile(path.join(__dirname+'/radio/page1.html'));
});
app.get('/page2',function(req,res){
  res.sendFile(path.join(__dirname+'/radio/page2.html'));
});

app.get('/purchaseradio',function(req,res){
  res.sendFile(path.join(__dirname+'/radio/page1.html'));
});


//####################################text####################################

app.get('/text',function(req,res){
    db.collection('text').find().toArray(function(err,docs){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs)
    })
})

app.post('/text',function(req,res){
        var txt={ inapp:req.body.inapp,     
        };
    db.collection('text').insert(txt,function(err,result){
        if(err){
            console.log(err);
            res.sendStatus(500);
        }
    res.send(txt);
    })
})

MongoClient.connect("mongodb://localhost:27017/radio",function(err,database){
    if(err){
        return console.log(err);
    }
    db=database;
    app.listen(3001);
    
})