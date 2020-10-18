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
  "Ultimate": {
    'characters': ["Bowser", "BowserJr", "DrMario", "DuckHunt", "KingDedede"],
    'Bowser': {
      'attacks': ["side b", "jab"],
    },
    "BowserJr": {

    },
    "DrMario" : {},
    "DuckHunt": {},
    "KingDedede": {},
  },
  'Tekken': {
    'characters': [],

  },
  'DBZ': {
    'characters': [],

  },
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
  var game = req.params["game"];
  res.json(db[game]['characters']);
});

app.get('/get/:game/:character/attacks', function(req,res){
  console.log('getting attacks');
  var game = req.params["game"];
  var character = req.params["character"];
  res.json(db[game][character]["attacks"]);
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
    db[game] = {'characters': []};
  }

  if(type == "character"){
    var game = req.body["game"];
    if(submission in db[game]["characters"]){
      res.redirect('back');
    }
    db[game]["characters"].push(submission);
    db[game][submission] = {'attacks': []};
  }

  if(type == "attack"){
    var game = req.body["game"];
    var character = req.body["character"];
    if(submission in db[game][character]["attacks"]){
      res.redirect('back');
    }
    db[game][character]["attacks"].push(submission);
    //create and add relevant data for attack
    dg[game][character][attack] = {'data':[]};
  }

  //Needs to be completed
  if(type == "scenario"){
    if(submission in db["games"]){
      res.redirect('back');
    }
    db["games"].push(submission);
  }


});



app.listen(process.env.PORT || 8080);
