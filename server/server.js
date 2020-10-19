const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const { nextTick } = require('process');
const app = express();
app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.urlencoded({ extended: true }));

// -- API Declarations --
const cors = require('cors');
const expressapi = require('express');
const api = expressapi();
api.use(cors());
api.use(expressapi.json());
api.use(bodyParser.urlencoded({extended: true}));
const mysql = require("mysql");
const { createBrotliCompress } = require('zlib');
const { Callbacks } = require('jquery');

app.use(cors());
app.use(express.json());
// ----------------------

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

// ------------------------ Testing --------------------------

api.get("/", (req, res) => {
  res.send("hello world");
})

api.listen(3001, () => {
   console.log("running on port 3001")
})

// ------------------------ MySQL API ------------------------

const dbInfo = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "projectframe",
})

dbInfo.connect();

api.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM smashultimate";
  dbInfo.query(sqlSelect, (err, result) => {
    console.log(result);
  })
})


// ------------------------ Web Server ------------------------

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
  const characterz = []

  const sqlSelect = "SELECT characters FROM smashultimate";
  dbInfo.query(sqlSelect, (err, result) => {
    console.log(result);

    result.map((c) => {
      console.log(c.characters);
      const test = String(c.characters)
      console.log(typeof(test));
      characterz.push(test);
      console.log(characterz.length)

    })
      console.log(characterz)
      res.json(characterz);

  })

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
  //console.log('Got body:', req.body);
  var type = req.params["type"]
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
    var game = req.body["game"];
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
  

});



app.listen(process.env.PORT || 8080);
