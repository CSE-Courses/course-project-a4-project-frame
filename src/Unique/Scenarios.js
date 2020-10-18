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
        const sceanariosList = scenarios.map((scenario) => <Scenario
            game={this.props.match.params.game} 
            character={this.props.match.params.character} 
            key = {scenario}
            scenario={scenario}
        />);
        return sceanariosList;
    }
    componentDidMount() {
        fetch("http://" + serverIP["serverIP"] + "/get/" + this.props.game + "/" + this.props.character +"/scenarios") // Calls server for characters to fill the tiles currently set for development server
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
                <div className="Scenarios">       
                    {this.getScenarios()}
                </div>
                <Modal page="scenarios"/> 
            </div>
        );
    }
}