const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const { nextTick } = require('process');
var passport = require('passport');
const app = express();
app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const imgUpload = multer({dest: './uploads'});
const serverIP = "localhost:8080";

var characters = ["Bowser", "BowserJr", "DrMario", "DuckHunt", "KingDedede"];
var db = {
  "games": ["Ultimate", "Tekken", "DBZ"],
  "Ultimate": {
    'characters': ["Bowser", "BowserJr", "DrMario", "DuckHunt", "KingDedede"],
    'Bowser': {
      'attacks': [{"name": "side b"}, {"name": "jab"}],
      "side b": {},
      "jab": {},
      'scenarios': [{'name': '1', 'description': 'Example scenario'}],
      "1": {'description': 'Example scenario'},
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

var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }))

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
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

app.get('/images/:game', function(req, res){
  var game = req.params["game"];
  console.log("image: " + game);
  if(!db[game]){
    res.sendFile(__dirname + '/uploads/' + 'defaultGame');
  }
  else{
    if(db[game]['image'] == ''){
      res.sendFile(__dirname + '/uploads/' + 'defaultGame');
    }
    else if (!db[game]['image']){
      res.sendFile(__dirname + '/uploads/' + 'defaultGame');
    }
    else{
      res.sendFile(__dirname + '/uploads/' + db[game]['image']);
    }
  }
  
});

app.get('/images/:game/:character', function(req, res){
  var game = req.params["game"];
  var character = req.params['character'];
  if(!db[game][character]){
    res.sendFile(__dirname + '/uploads/' + 'defaultCharacter');
  }
  else{
    if(db[game][character]['image'] == ''){
      res.sendFile(__dirname + '/uploads/' + 'defaultCharacter');
    }
    else if (!db[game][character]['image']){
      res.sendFile(__dirname + '/uploads/' + 'defaultCharacter');
    }
    else{
      res.sendFile(__dirname + '/uploads/' + db[game][character]['image']);
    }
  }
});

app.get('/images/:game/:character/scenario/:scenario', function(req, res){
  var game = req.params["game"];
  var character = req.params['character'];
  var scenario = req.params['scenario'];
  if(!db[game][character][scenario]){
    res.sendFile(__dirname + '/uploads/' + 'defaultScenario');
  }
  else{
    if(db[game][character][scenario]['image'] == ''){
      res.sendFile(__dirname + '/uploads/' + 'defaultScenario');
    }
    else if (!db[game][character][scenario]['image']){
      res.sendFile(__dirname + '/uploads/' + 'defaultScenario');
    }
    else{ 
      res.sendFile(__dirname + '/uploads/' + db[game][character][scenario]['image']);
    }
  }
});

app.get('/images/:game/:character/:attack', function(req, res){
  var game = req.params["game"];
  var character = req.params['character'];
  var attack = req.params['attack'];
  if(!db[game][character][attack]){
    res.sendFile(__dirname + '/uploads/' + 'defaultAttack');
  }
  else{
    if(!db[game][character][attack]['image']){
      res.sendFile(__dirname + '/uploads/' + 'defaultAttack');
    }
    else if (!db[game][character][attack]['image']){
      res.sendFile(__dirname + '/uploads/' + 'defaultAttack');
    }
    else{
      res.sendFile(__dirname + '/uploads/' + db[game][character][attack]['image']);
    }
  }
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


app.post('/submission-game', imgUpload.single('image'), passport.authenticate('local', { failureFlash: 'Must be logged in to make changes' }), function (req,res) {
  console.log('Got body:', req.body);
  console.log(req.params);
  var submission = req.body["game"];
  var filename = '';
  if(!req.file){
    console.log('No file submitted')
  }
  else {
    filename = req.file.filename;
  }
  if(submission in db){
    res.sendStatus(204);
  }
  else{
    db["games"].push(submission);
    db[submission] = {'characters': [], 'image': filename};
    res.redirect('http://' + serverIP + '/');
  }
});

app.post('/:game/submission-character', imgUpload.single('image'), passport.authenticate('local', { failureFlash: 'Must be logged in to make changes' }), function (req,res) {
  console.log('Got body:', req.body);
  console.log(req.params);
  var game = req.params["game"];
  var submission = req.body["character"];
  var filename = '';
  if(!req.file){
    console.log('No file submitted')
  }
  else {
    filename = req.file.filename;
  }
  if(submission in db[game]){
    res.sendStatus(204);
  }
  else{
    db[game]["characters"].push(submission);
    db[game][submission] = {'attacks': [], 'image': filename};
    res.redirect('http://' + serverIP + '/' + game);
  }
});

app.post('/submission/:game/:character/attack', imgUpload.single('image'), passport.authenticate('local', { failureFlash: 'Must be logged in to make changes' }), function (req,res) {
  console.log('Got body:', req.body);
  console.log(req.params);
  var game = req.params["game"];
  var character = req.params["character"];
  var submission = req.body["move"];
  var startup = req.body["startup"];
  var shield = req.body["shield"];
  var active = req.body["active"];
  console.log(req.body);
  var filename = '';
  if(!req.file){
    console.log('No file submitted')
  }
  else {
    filename = req.file.filename;
  }
  if(submission in db[game][character]){
    res.redirect('http://' + serverIP + '/' + game + '/' + character);
  }
  else{
    db[game][character]["attacks"].push({'name': submission, 'active': active, 'startup': startup, 'shield': shield, 'image': filename});
    db[game][character][submission] = {'name': submission, 'active': active, 'startup': startup, 'shield': shield, 'image': filename};
    res.redirect('http://' + serverIP + '/' + game + '/' + character);
  }
});

app.post('/submission/:game/:character/Scenarios', imgUpload.single('image'), passport.authenticate('local', { failureFlash: 'Must be logged in to make changes' }), function (req,res) {
  console.log('Got body:', req.body);
  console.log(req.params);
  var game = req.params["game"];
  var character = req.params["character"];
  var submission = req.body["scenario"];
  var description = req.body["description"];
  console.log(req.body);
  var filename = '';
  if(!req.file){
    console.log('No file submitted')
  }
  else {
    filename = req.file.filename;
  }
  if(submission in db[game][character]){
    res.redirect('http://' + serverIP + '/' + game + '/' + character + "/scenarios");
  }
  else{
    if(!db[game][character]["scenarios"]){
      db[game][character]["scenarios"] = [];
    }
    db[game][character]["scenarios"].push({'name': submission, 'description': description, 'image': filename});
    db[game][character][submission] = {'name': submission, 'description': description, 'image': filename};
    res.redirect('http://' + serverIP + '/' + game + '/' + character + "/scenarios");
  }
});

app.listen(process.env.PORT || 8080);
