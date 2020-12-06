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

function saveUsers(usersdb){
  var jsonString = JSON.stringify(usersdb);
  fs.writeFile('./users.json', jsonString, err => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Successfully wrote file')
    }
  })
}

var changes = {};

async function accessChanges(){
  fs.readFile('./changes.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err)
    return
  }
  try {
      changes = JSON.parse(jsonString);
      changeNum = changes["changeNum"];
      console.log(changes);
      console.log(changeNum);
  } catch(err) {
      console.log('Error parsing JSON string:', err)
    }
  })
}

accessChanges();


function saveChanges(){
  var jsonString = JSON.stringify(changes);
  fs.writeFile('./changes.json', jsonString, err => {
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
  const username = req.body.username;
  const password = req.body.password;
  if(username in users){
    console.log('already registered');
    saveUsers(users);
    res.redirect('back');
  }
  else {
    bcrypt.hash(password, 10, function(err, hash) {
      console.log(hash);
      users[username] = {password: hash, cred: "user"};
      console.log(users);
      saveUsers(users);
      res.redirect('/login');
    });
  }
  
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

function unverifiedSubmission(req, filename){
  var body = req.body;
  console.log(body);
  var game = body['game'];
  console.log(game);
  var character = body['character'];
  const attack =  body["move"];
  const scenario = body["scenario"];
  if (attack){
    game = req.params["game"];
    character = req.params["character"];
    var startup = body["startup"];
    var shield = body["shield"];
    var active = body["active"];
    changes[changeNum.toString()] = {
      "id": changeNum,
      "type": "attack", 
      "game": game, 
      "character": character, 
      "attack": attack, 
      "startup": startup, 
      "shield": shield,
      "active": active,
      "image": filename
    };
  }
  else if (scenario) {
    game = req.params["game"];
    character = req.params["character"];
    var description = body["description"];
    changes[changeNum.toString()] = {
      "id": changeNum,
      "type": "scenario", 
      "game": game, 
      "character": character, 
      "scenario": scenario, 
      "description": description, 
      "image": filename
    };
  }
  else if (character) {
    game = req.params["game"];
    changes[changeNum.toString()] = {"id": changeNum, "type": "character", "game": game, "character": character,  "image": filename};
  } else if (game) {
    changes[changeNum.toString()] = {"id": changeNum, "type": "game", "game": game,  "image": filename};
  }
  changeNum += 1;
  changes["changeNum"] = changeNum;
  console.log(changes);
  saveChanges();
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
    unverifiedSubmission(req, filename);
    res.redirect('http://' + serverIP + '/'); //Redirect to suggestion page? submitted page

  }
}


//Used for getting the data from database and sending to react element
app.get('/get/changes', function(req, res){
  console.log('Changes requested');
  changeList = [];
  for(var key in changes){
    if(key == "changeNum"){
      continue;
    }
    else{
      changeList.push(changes[key]);
    }
  }
  res.json(changeList);
});

function confirmChange(id){
  var change = changes[id];
  var type = change['type'];
  var filename = change['image'];
  var game = change["game"];
  var remove = change["remove"];
  var character = change["character"];
  var attack = change["attack"];
  var scenario = change["scenario"];
  if(type == "game"){
    if(remove){
      console.log("here");
      console.log(game);
      db['games'] = db['games'].filter(v => v !== game);
      delete db[game];
      delete changes[id];
      saveDB(db);
      saveChanges();
    }
    else{
      var submission = game;
      if(submission in db){
        db[submission]['image'] = filename;
        res.sendStatus(204);
      }
      else{
        db["games"].push(submission);
        db[submission] = {'characters': [], 'image': filename};
      }
      delete changes[id];
      saveDB(db);
      saveChanges();
    }
  }
  else if (type == "character"){
    if(remove){
      db[game]['characters'] = db[game]['characters'].filter(v => v !== character);
      delete db[game][character];
      delete changes[id];
      saveDB(db);
      saveChanges();
    }
    else {
      var submission = character;
      
      if(submission in db[game]){
        db[game][submission]['image'] = filename;
        res.sendStatus(204);
      }
      else{
        db[game]["characters"].push(submission);
        db[game][submission] = {'attacks': [], 'image': filename};
      }
      delete changes[id];
      saveDB(db);
      saveChanges();
    }
    
  }
  else if (type == "attack"){
    if(remove){
      console.log('attack');
      db[game][character]['attacks'] = db[game][character]['attacks'].filter(v => v["name"] !== attack);
      delete db[game][character][attack];
      delete changes[id];
      saveDB(db);
      saveChanges();
    }
    else{
      var submission = attack;
      var active = change["active"];
      var startup = change["startup"];
      var shield = change["shield"];
      if(submission in db[game][character]){
        if(!db[game][character][submission]["description"]){
          db[game][character][submission] = {'name': submission, 'active': active, 'startup': startup, 'shield': shield, 'image': filename};
        }
      }
      else{
        db[game][character]["attacks"].push({'name': submission, 'active': active, 'startup': startup, 'shield': shield, 'image': filename});
        db[game][character][submission] = {'name': submission, 'active': active, 'startup': startup, 'shield': shield, 'image': filename};
      }
      delete changes[id];
      saveDB(db);
      saveChanges();
    }
    
  }
  else if (type == "scenario"){
    if(remove){
      db[game][character]['scenarios'] = db[game][character]['scenarios'].filter(v => v["name"] !== scenario);
      delete db[game][character][scenario];
      delete changes[id];
      saveDB(db);
      saveChanges();
    }
    else{
      var submission = scenario;
      var description = change["description"];
      if(submission in db[game][character]){
        // Make sure not attack
        if(!db[game][character][submission]["active"]){
          db[game][character][submission] = {'name': submission, 'description': description, 'image': filename};
        }
      }
      else{
        if(!db[game][character]["scenarios"]){
          db[game][character]["scenarios"] = [];
        }
        db[game][character]["scenarios"].push({'name': submission, 'description': description, 'image': filename});
        db[game][character][submission] = {'name': submission, 'description': description, 'image': filename};
      }
      delete changes[id];
      saveDB(db);
      saveChanges();
    }
  }
}

app.get('/submit-changes', loggedIn, function(req, res){
  var action = req.query["action"];
  var id = req.query['id'];
  console.log(action);
  
  if(users[req.user].cred != "admin") {
    // Make suggection
    res.redirect('back');
  }
  else{
    if (action == "accept"){
      confirmChange(id);
    }
    else {
      delete changes[id];
      saveChanges();
    }
    res.redirect('back');
  }
  
});

app.get('/get/games', async function(req,res){
  console.log('getting games');
  //const db = await accessDB();
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

//Add image handle for changes
app.get('/images/change/:id', function(req, res){
  var id = req.params["id"];
  
  console.log("image: " + id);
  if(!changes[id]){
    console.log("Does Not Exist");
    res.sendFile(__dirname + '/uploads/' + 'defaultGame');
  }

  var type = changes[id]["type"];
  console.log(type);
  if(changes[id]['image'] == ""){
    if(type=="game"){
      res.sendFile(__dirname + '/uploads/' + 'defaultGame');
    }
    else if (type=="character"){
      res.sendFile(__dirname + '/uploads/' + 'defaultCharacter');
    }
    else if (type=="attack"){
      res.sendFile(__dirname + '/uploads/' + 'defaultAttack');
    }
    else if (type=="scenario"){
      res.sendFile(__dirname + '/uploads/' + 'defaultScenario');
    }
  } else{
    res.sendFile(__dirname + '/uploads/' + db[game]['image']);
  }
});

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
    const game = req.body.game;
    const character = req.body.character;
    const scenario = req.body.scenario;
    const attack = req.body.attack;
    if(attack != '') {
      changes[changeNum.toString()] = {
        "id": changeNum,
        "type": "attack", 
        "game": game, 
        "character": character, 
        "attack": attack, 
        "remove": true,
      };
    }
    else if(scenario != ''){
      changes[changeNum.toString()] = {
        "id": changeNum,
        "type": "scenario", 
        "game": game, 
        "character": character, 
        "scenario": scenario, 
        "remove": true,
      };
    }
    else if(character != ''){
      changes[changeNum.toString()] = {"remove": true, "id": changeNum, "type": "character", "game": game, "character": character};
    }
    else if (game){
      changes[changeNum.toString()] = {"remove": true, "id": changeNum, "type": "game", "game": game};
    }
    changeNum += 1;
    changes["changeNum"] = changeNum;
    console.log(changes);
    saveChanges();
    res.redirect('back');
  }
  else {
    const game = req.body.game;
    const character = req.body.character;
    const scenario = req.body.scenario;
    const attack = req.body.attack;
    if(attack != '') {
      console.log('attack');
      db[game][character]['attacks'] = db[game][character]['attacks'].filter(v => v["name"] !== attack);
      delete db[game][character][attack];
    }
    else if(scenario != ''){
      console.log('scenario');
      db[game][character]['scenarios'] = db[game][character]['scenarios'].filter(v => v["name"] !== scenario);
      delete db[game][character][scenario];
    }
    else if(character != ''){
      console.log('character');
      db[game]['characters'] = db[game]['characters'].filter(v => v !== character);
      delete db[game][character];
    }
    else if (game){
      console.log('game');
      db['games'] = db['games'].filter(v => v !== game);
      delete db[game];
    }
    res.redirect('back'); //Redirect to suggestion page? submitted page
  }
  saveDB(db);
});


app.listen(process.env.PORT || 8080);
