import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './Scenarios.css'


export default class Scenario extends Component {
    render () {
        return (
            <div>
                <div className="ScenarioTag" id={ this.props.scenario}>
                    <table id="scenario">
                        <tbody>
                            <tr>
                                <th className="name">{ this.props.scenario}</th>
                            </tr>
                            <tr>
                                <td><img src="https://i.redd.it/dql11e7besx21.jpg"></img></td>
                            </tr>
                            <tr>
                                <td className="description">Due to Broly's big hitbox, some attacks whiff on small characters</td>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
        );
    }
}