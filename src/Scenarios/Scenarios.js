import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Scenario from './Scenario.js';
import Modal from '../Modal/Modal';
import './Scenarios.css';
import serverIP from '../serverIP';


export default class Scenarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [] //Will be used to store all characters for the game
        };
    }
    getScenarios() {
        var scenarios = this.state.items;
        console.log(scenarios);
        const sceanariosList = scenarios.map((scenario) => <Scenario
            game={this.props.match.params.game} 
            character={this.props.match.params.character} 
            key = {scenario['name']}
            scenario={scenario['name']}
            description = {scenario['description']}
        />);
        return sceanariosList;
    }
    componentDidMount() {
        fetch("http://" + serverIP["serverIP"] + "/get/" + this.props.match.params.game + "/" + this.props.match.params.character +"/scenarios") // Calls server for characters to fill the tiles currently set for development server
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    render () {
        return (
            <div>
              <h1>Scenarios Page</h1>
                <div className="Scenarios">       
                    {this.getScenarios()}
                </div>
                <Modal page="scenarios" game={this.props.match.params.game} character={this.props.match.params.character}/> 
            </div>
        );
    }
}