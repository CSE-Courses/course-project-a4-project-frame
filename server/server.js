const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const { nextTick } = require('process');
const session = require("express-session")
const passport = require('passport');
const app = express();
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const fs = require('fs');
app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(cors());
app.use(session({ secret: "frame", cookie: {} }));
app.use(passport.initialize());
app.use(passport.session());


const imgUpload = multer({dest: './uploads'});
const serverIP = "localhost:8080";

/*var db = {
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
}; */
var suggestions = {};
var changeNum = 1;

//const users = {"test": {password: "test", cred: "user"}, "admin":{password: '$2b$10$NJK4S7LR7Nb931h4vRUNqOtTy5ft4AKIlCXiMTtwn15oZxSX5057.', cred: 'admin'}};

var db = {};

async function accessDB(){
  fs.readFile('./db.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err)
    return
  }
  try {
      db = JSON.parse(jsonString)
  } catch(err) {
      console.log('Error parsing JSON string:', err)
    }
  })
}

accessDB();

function saveDB(db){
  var jsonString = JSON.stringify(db);
  fs.writeFile('./db.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
  })
}

var users = {};

function accessUsers(){
  fs.readFile('./users.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err)
    return
  }
  try {
      users = JSON.parse(jsonString)
  } catch(err) {
      console.log('Error parsing JSON string:', err)
    }
  })
}

accessUsers();

function saveUsers(db){
  var jsonString = JSON.stringify(db);
  fs.writeFile('./users.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
  })
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

passport.use(new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    console.log(username);
    if (!users[username]){
      console.log('Username does not exist');
      return done(null, false, { message: 'Incorrect username.' });
    }
    bcrypt.compare(password, users[username].password, function (err, res){
      if (err){
        return done(null, false);
      } 
      if (res === false) {
        console.log('Incorrect password');
        return done(null, false, { message: 'Incorrect password.' });
      } else {
        return done(null, username);
      }
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.post('/login', passport.authenticate('local', { successRedirect: '/loggedIn', failureRedirect: '/login', failureFlash: true }));

app.get('/loggedIn', function (req, res){
  res.cookie("loggedIn", 'true');
  res.redirect('/');
});

app.post('/register', function(req, res){
  console.log(req.body)
  const username = req.body.username;
  const password = req.body.password;
  if(username in users){
    console.log('already registered');
    res.send('back');
  }
  else {
    bcrypt.hash(password, 10, function(err, hash) {
      console.log(hash);
      users[username] = {password: hash, cred: "user"};
      console.log(users);
      res.redirect('/login');
    });
  }
  saveUsers(users);
});

app.get('/logout', function(req, res){
  req.logout();
  console.log(req.cookies);
  res.clearCookie("loggedIn");
  res.redirect('/');
});

function loggedIn(req, res, next) {
  if (req.user) {
    console.log(req.user);
    next();
  } else {
    res.redirect('/login');
  }
}

function unverifiedSubmission(body, filename){
  console.log(body);
  const game = body['game'];
  console.log(game);
  const character = body['character'];
  const attack =  body["move"];
  const scenario = body["scenario"];
  if (attack){
    var startup = body["startup"];
    var shield = body["shield"];
    var active = body["active"];
    suggestions[changeNum.toString()] = {
      "type": "attack", 
      "game": game, 
      "character": character, 
      "move": attack, 
      "startup": startup, 
      "shield": shield,
      "active": active,
      "image": filename
    };
  }
  else if (scenario) {
    var description = body["description"];
    suggestions[changeNum.toString()] = {
      "type": "scenario", 
      "game": game, 
      "character": character, 
      "scenario": scenario, 
      "description": description, 
      "image": filename
    };
  }
  else if (character) {
    suggestions[changeNum.toString()] = {"type": "character", "game": game, "character": character,  "image": filename};
  } else if (game) {
    suggestions[changeNum.toString()] = {"type": "game", "game": game,  "image": filename};
  }
  changeNum += 1;
  console.log(suggestions);
}

function isAdmin(req, res, next) {
  if(users[req.user].cred == "admin") {
    next();
  }
  else {
    var filename = '';
    if(!req.file){
      console.log('No file submitted');
    }
    else {
      filename = req.file.filename;
    }
    unverifiedSubmission(req.body, filename);
    res.redirect('http://' + serverIP + '/'); //Redirect to suggestion page? submitted page

  }
}


//Used for getting the data from database and sending to react element
app.get('/get/games', async function(req,res){
  console.log('getting games');
  //const db = await accessDB();
  console.log(db);
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

// Used to get the images for the webpage
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


// General route to server react router
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


app.post('/submission-game', imgUpload.single('image'), loggedIn, isAdmin, function (req,res) {
  console.log('Got body:', req.body);
  console.log(req.params);
  console.log(req);
  
  var submission = req.body["game"];
  var filename = '';
  if(!req.file){
    console.log('No file submitted')
  }
  else {
    filename = req.file.filename;
  }
  if(submission in db){
    db[submission]['image'] = filename;
    res.sendStatus(204);
  }
  else{
    db["games"].push(submission);
    db[submission] = {'characters': [], 'image': filename};
    res.redirect('http://' + serverIP + '/');
  }
  saveDB(db);
});

app.post('/:game/submission-character', imgUpload.single('image'), loggedIn, isAdmin, function (req,res) {
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
    db[game][submission]['image'] = filename;
    res.sendStatus(204);
  }
  else{
    db[game]["characters"].push(submission);
    db[game][submission] = {'attacks': [], 'image': filename};
    res.redirect('http://' + serverIP + '/' + game);
  }
  saveDB(db);
});

app.post('/submission/:game/:character/attack', imgUpload.single('image'), loggedIn, isAdmin, function (req,res) {
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
    if(!db[game][character][submission]["description"]){
      db[game][character][submission] = {'name': submission, 'active': active, 'startup': startup, 'shield': shield, 'image': filename};
    }
    res.redirect('http://' + serverIP + '/' + game + '/' + character);
  }
  else{
    db[game][character]["attacks"].push({'name': submission, 'active': active, 'startup': startup, 'shield': shield, 'image': filename});
    db[game][character][submission] = {'name': submission, 'active': active, 'startup': startup, 'shield': shield, 'image': filename};
    res.redirect('http://' + serverIP + '/' + game + '/' + character);
  }
  saveDB(db);
});

app.post('/submission/:game/:character/Scenarios', imgUpload.single('image'), loggedIn, isAdmin, function (req,res) {
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
    // Make sure not attack
    if(!db[game][character][submission]["active"]){
      db[game][character][submission] = {'name': submission, 'description': description, 'image': filename};
    }
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
  saveDB(db);
});

app.post('/remove', imgUpload.single('image'), loggedIn, function(req, res){
  console.log(req.body);
  console.log(req.params);
  
  if(users[req.user].cred != "admin") {
    // Make suggection
    res.redirect('back');
  }
  else {
    const game = req.body.game;
    const character = req.body.character;
    const scenario = req.body.scenario;
    const attack = req.body.scenario;
    if(attack) {
      db[game][character]['attacks'] = db[game][character]['attacks'].filter(v => v["name"] !== attack);
      delete db[game][character][attack];
    }
    else if(scenario){
      db[game][character]['scenarios'] = db[game][character]['scenarios'].filter(v => v["name"] !== scenario);
      delete db[game][character][scenario];
    }
    else if(character){
      db[game]['characters'] = db[game]['characters'].filter(v => v !== character);
      delete db[game][character];
    }
    else if (game){
      db['games'] = db['games'].filter(v => v !== game);
      delete db[game];
    }
    res.redirect('back'); //Redirect to suggestion page? submitted page
  }
  saveDB(db);
});

app.listen(process.env.PORT || 8080);
