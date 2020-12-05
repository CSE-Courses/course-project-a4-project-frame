//renders the report form
import React from 'react';
import ReactDOM from 'react-dom';
import './Forms.css';
import serverIP from '../serverIP';

export default class RemoveForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      error: '',
      page_found_on: '',
      details: '',
      correction: ''
    };
  }

  componentDidMount() {
    console.log(this.props.page);
    var gameInput = document.getElementById("gameInput");
    var characterInput = document.getElementById("characterInput");
    var attackInput = document.getElementById("attackInput");
    var scenarioInput = document.getElementById("scenarioInput");
    gameInput.style.display = "none";
    characterInput.style.display = "none";
    attackInput.style.display = "none";
    scenarioInput.style.display = "none";
    var page = this.props.page;
    if(page == "games"){
      gameInput.style.display = "block";
    }
    else if(page == "characters"){
      characterInput.style.display = "block";
      var game = this.props.game;
      console.log(game);
      document.getElementById("gameValue").value = game;
    }
    else if(page == "attacks"){
      attackInput.style.display = "block";
      var game = this.props.game;
      var character = this.props.character;
      console.log(game);
      console.log(character);
      document.getElementById("gameValue").value = game;
      document.getElementById("characterValue").value = character;
    }
    else if(page == "scenarios"){
      scenarioInput.style.display = "block";
      var game = this.props.game;
      var character = this.props.character;
      console.log(game);
      console.log(character);
      document.getElementById("gameValue").value = game;
      document.getElementById("characterValue").value = character;
    }
    
  }

  render() {
    return (
      <form method="POST" action={"http://" + serverIP['serverIP'] + "/remove"} enctype="multipart/form-data">
        <br/>
        <h1>Remove Form</h1>
        <div className="container">
          <div className="row" id="gameInput">
            <div className="col-25">
              <label>Game: </label>
            </div>
            <div className="col-85">
              <input type='text' name='game' id="gameValue"/>
            </div> 
          </div>
          <div className="row" id="characterInput">
            <div className="col-25">
              <label>Character: </label>
            </div>
            <div className="col-85">
              <input type='text' name='character' id="characterValue"/>
            </div> 
          </div>
          <div className="row" id="attackInput">
            <div className="col-25">
              <label>Attack: </label>
            </div>
            <div className="col-85">
              <input type='text' name='attack' id="attackValue"/>
            </div> 
          </div>
          <div className="row" id="scenarioInput">
            <div className="col-25">
              <label>Scenario: </label>
            </div>
            <div className="col-85">
              <input type='text' name='scenario' id="scenarioValue"/>
            </div> 
          </div>
          <div className="row">
            <input type='submit' value="Remove"/>
          </div>
        </div>
      </form>
    );
    
  }
}