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
//const mysql2 = require("mysql2");
//var SSH2Client = require('ssh2').Client;
const { createBrotliCompress } = require('zlib');
const { Callbacks } = require('jquery');

app.use(cors());
app.use(express.json());
// ----------------------

//var characters = ["Bowser", "BowserJr", "DrMario", "DuckHunt", "KingDedede"];
var db = {};

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


app.get('/get/games', function(req,res){
  console.log('getting games');
  const gamez = [];
  const sqlSelectGames = "SELECT game FROM games";
  dbInfo.query(sqlSelectGames, (err, result) => {
    result.map((g) => {
      const test = String(g.game);
      gamez.push(test);
    })

    res.json(gamez);

  })

});

app.get('/get/:game/characters', function(req,res){
  console.log('getting characters');
  var game = req.params["game"];
  const characterz = []

  console.log(req.params)
  console.log(req.params.game)

  var table;
  if(req.params.game == "Ultimate"){
    table = "smashultimate";
  } else {
    res.end()
  }

  const sqlSelectCharacters = "SELECT characters FROM " + table;
  dbInfo.query(sqlSelectCharacters, (err, result) => {
    if(err){

    } else {
      result.map((c) => {
        const test = String(c.characters)
        characterz.push(test);

      })
      res.json(characterz);
    }

  })

});

app.get('/get/:game/:character/attacks', function(req,res){
  console.log('getting attacks');
  var game = req.params["game"];
  var character = req.params["character"];
  const attackz = [];

  const sqlSelectAttacks =
   "SELECT moves FROM smashultimate WHERE characters = \"" + String(character) + `"`;

   dbInfo.query(sqlSelectAttacks, (err, result) => {
    var x = result[0];
    const test = String(x.moves)
    var attacks = test.split(',');

    for (var at of attacks){
      if(at == "null"){
        break;
      } else {
        attackz.push(at);
      }
    }

     res.json(attackz)
   })
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
    //Check if game is in db - COME BACK TO LATER
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
    //console.log(db["Ultimate"]["characters"])
    //Check if character is in db - COME BACK TO LATER
    //if(submission in db[game]){
   //   res.redirect('back');
    //}
    //else{

    console.log(req.body.move1)
    console.log(typeof req.body.move1)

    var moves = [];
    moves.push(req.body.move1);
    moves.push(req.body.move2);
    moves.push(req.body.move3);
    var movesCSV = moves.join(",");

    console.log(movesCSV);

    const sqlInsertCharacter = "INSERT INTO smashultimate VALUES (" +
      `"` + String(req.body.character) + `",` +
      `"` + "Ultimate" + `",` +
      `"` + req.body.image + `",` +
      `"` + req.body.description + `",` +
      `"` + req.body.move1 + `",` +
      `"` + req.body.move2 + `",` +
      `"` + req.body.move3 + `",` +
      `"` + String(movesCSV) + `"` +
    ")"

    console.log(sqlInsertCharacter);

    dbInfo.query(sqlInsertCharacter, (err, result) => {});

      //db[game]["characters"].push(submission);
    //db[game][submission] = {'attacks': []};
    res.redirect('http://localhost:8080/' + game);
    
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
