const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const { nextTick } = require('process');
const app = express();
app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.urlencoded({ extended: true }));

var characters = ["Bowser", "BowserJr", "DrMario", "DuckHunt", "KingDedede"];
var db = {
  "games": ["Ultimate", "Tekken", "DBZ"],
  "characters": {
    "Ultimate": ["Bowser", "BowserJr", "DrMario", "DuckHunt", "KingDedede"],
    "Tekken": ["Bowser", "BowserJr", "DrMario", "DuckHunt", "KingDedede"],
    "DBZ": ["Bowser", "BowserJr", "DrMario", "DuckHunt", "KingDedede"]
  },
  "attacks": ["side b", "jab"]
}; 

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


//Used for getting the data from database and sending to react element
app.get('/get/games', function(req,res){
  console.log('getting games');
  res.json(db["games"]);
});

app.get('/get/:game/characters', function(req,res){
  console.log('getting characters');
  res.json(db["characters"]["Ultimate"]);
});

app.get('/get/:game/:character/attacks', function(req,res){
  console.log('getting attacks');
  res.json(db["attacks"]);
})



app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

//Handles Form submissions for adding to the website
app.post('/submission-:type', function (req,res) {
  console.log('Got body:', req.body);
  var type = req.params["type"]
  var submission = req.body[type];
  if(type == "game"){
    if(submission in db["games"]){
      res.redirect('back');
    }
    db["games"].push(submission);
  }
  if(type == "character"){
    var game = req.body["game"];
    if(submission in db[game]["characters"]){
      res.redirect('back');
    }
    db[game]["characters"].push(submission);
  }
  if(type == "attack"){
    var game = req.body["game"];
    var character = req.body["character"];
    if(submission in db[game][character]["attacks"]){
      res.redirect('back');
    }
    db[game][character]["attacks"].push(submission);
    //create and add relevant data for attack
  }
  if(type == "scenario"){
    if(submission in db["games"]){
      res.redirect('back');
    }
    db["games"].push(submission);
  }


  var body = req.body;
  var character = body[type];
  console.log(character);
  db["characters"]["Ultimate"].push(req.body[type]);
  console.log("change made:", db["characters"]["Ultimate"]);


  res.redirect('back');
});



app.listen(process.env.PORT || 8080);
