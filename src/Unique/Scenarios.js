import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Scenario from './Scenario.js';
import Modal from '../Modal/Modal';
import './Scenarios.css'


export default class Scenarios extends Component {
    getScenarios() {
        var scenarios = ['Scenario1', 'Scenario2', 'Scenario3'];
        const sceanariosList = scenarios.map((scenario) => <Scenario
            game={this.props.match.params.game} 
            character={this.props.match.params.character} 
            attack = {this.props.match.params.attack}
            key = {scenario}
            scenario={scenario}
        />);
        return sceanariosList;
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