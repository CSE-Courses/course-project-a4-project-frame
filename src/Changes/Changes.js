import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import serverIP from '../serverIP';
import Change from './Change.js';
import './Changes.css';

export default class ChangeLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [] //Will be used to store changes
    };
  }
  getChanges() {
    var changes = this.state.items;
    console.log('Get Changes');
    console.log(changes);
    const changesList = changes.map((change) => <Change 
      type = {change["type"]}
      game={change["game"]} 
      character={change["character"]} 
      attack={change["attack"]}
      key = {change["id"]}
      id = {change["id"]}
      startup = {change['startup']}
      active = {change['active']}
      shield = {change['shield']}
      description = {change['description']}
      remove = {change['remove']}
    />);

    return changesList;
  }
  componentDidMount() {
    console.log('mounted');
      fetch("http://" + serverIP["serverIP"] + "/get/changes")
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            this.setState({
              isLoaded: true,
              items: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

  render(){
    return (
      <div>
        <div id="changes"> 
          {this.getChanges()}
        </div>
      </div>
    );
  }

}