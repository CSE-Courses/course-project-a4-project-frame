const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const { nextTick } = require('process');
const app = express();
app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.urlencoded({ extended: true }));
const serverIP = "165.227.88.107:8080";

var characters = ["Bowser", "BowserJr", "DrMario", "DuckHunt", "KingDedede"];
var db = {
  "games": ["Ultimate", "Tekken", "DBZ"],
  "Ultimate": {
    'characters': ["Bowser", "BowserJr", "DrMario", "DuckHunt", "KingDedede"],
    'Bowser': {
      'attacks': ["side b", "jab"],
      'scenarios': ['1'],
    },
    "BowserJr": {
      'attacks': [],
    },
    "DrMario" : {'attacks': [],},
    "DuckHunt": {'attacks': [],},
    "KingDedede": {'attacks': [],},
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

app.get('/get/:game/:character/Scenarios', function(req,res){
  console.log('getting scenarios');
  var game = req.params["game"];
  var character = req.params["character"];
  res.json(db[game][character]["scenarios"]);
})



app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

//Handles Form submissions for adding to the website
/*
app.post('/submission-:type', function (req,res) {
  console.log('Got body:', req.body);
  console.log(req.params);
  var type = req.params["type"]
  let game = req.query.game;
  console.log(game);
  let character = req.query.character;
  var submission = req.body[type];

  if(type == "game"){
    if(submission in db["games"]){
      res.redirect('back');
    }
    else{
    db["games"].push(submission);
    db[submission] = {'characters': []};
    res.redirect('http://localhost:3000/');
    }
  }

  if(type == "character"){
    console.log(db[game]["characters"])
    if(submission in db[game]){
      res.redirect('back');
    }
    else{
      db[game]["characters"].push(submission);
    db[game][submission] = {'attacks': []};
    res.redirect('http://localhost:3000/' + game);
    }
  }

  if(type == "attack"){
    var game = req.body["game"];
    var character = req.body["character"];
    if(submission in db[game][character]["attacks"]){
      res.redirect('back');
    }
    else{
      db[game][character]["attacks"].push(submission);
    //create and add relevant data for attack
    dg[game][character][submission] = {'data':[]};
    res.redirect('http://localhost:3000/' + game + '/' + character);
    }
  }

  //Needs to be completed
  if(type == "scenario"){
    if(submission in db["games"]){
      res.redirect('back');
    }
    db["games"].push(submission);
  }
  

});*/

app.post('/submission-game', function (req,res) {
  console.log('Got body:', req.body);
  console.log(req.params);
  var submission = req.body["game"];
  if(submission in db["games"]){
    res.sendStatus(204);
  }
  else{
    db["games"].push(submission);
    db[submission] = {'characters': []};
    res.redirect('http://' + serverIP + '/');
  }
});

app.post('/:game/submission-character', function (req,res) {
  console.log('Got body:', req.body);
  console.log(req.params);
  var game = req.params["game"];
  var submission = req.body["character"];
  if(submission in db[game]){
    res.sendStatus(204);
  }
  else{
    db[game]["characters"].push(submission);
    db[game][submission] = {'attacks': []};
    res.redirect('http://' + serverIP + '/' + game);
  }
});

app.post('/submission/:game/:character/attack', function (req,res) {
  console.log('Got body:', req.body);
  console.log(req.params);
  var game = req.params["game"];
  var character = req.params["character"];
  var submission = req.body["move"];
  if(submission in db[game][character]){
    res.sendStatus(204);
  }
  else{
    db[game][character]["attacks"].push(submission);
    db[game][character][submission] = {};
    res.redirect('http://' + serverIP + '/' + game + '/' + character);
  }
});


app.listen(process.env.PORT || 8080);
