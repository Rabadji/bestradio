const express=require('express');
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened:true}));
const MongoClient=require("mongodb").MongoClient;
const ObjectID=require('mongodb').ObjectID;
var db;
var path    = require("path");
var purchase;



app.get('/terms',function(req,res){
  res.sendFile(path.join(__dirname+'/radio/Terms.html'));
});
app.get('/privacy',function(req,res){
  res.sendFile(path.join(__dirname+'/radio/Privacy.html'));
});
app.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/radio/About.html'));
});


//#################change purchase
app.post('/radio_page',function(req,res){
    purchase=req.body.page;
    res.send(purchase);
})

app.use(express.static("radio"));
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/radio/" + "style.css");
});
app.get('/radio_page1',function(req,res){
  res.sendFile(path.join(__dirname+'/radio/page1.html'));
});
app.get('/radio_page2',function(req,res){
  res.sendFile(path.join(__dirname+'/radio/page2.html'));
});

app.get('/purchase_radio',function(req,res){
  res.sendFile(path.join(__dirname+'/radio/'+purchase+'.html'));
});


//####################################inapp####################################
app.get('/radio_inapp',function(req,res){
    db.collection('radio_inapp').find().toArray(function(err,docs){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs)
    })
})
app.put('/radio_inapp/:inappid',function(req,res){
    const id=req.params.inappid;
    db.collection("radio_inapp").update({_id:ObjectID(id)}, {inapp:req.body.inapp});
    res.send(req.body.inapp);
});
app.post('/radio_inapp',function(req,res){
        var txt={ inapp:req.body.inapp,     
        };
    db.collection('radio_inapp').insert(txt,function(err,result){
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