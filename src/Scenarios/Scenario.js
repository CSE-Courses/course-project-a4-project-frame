import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './Scenarios.css'
import serverIP from '../serverIP';


export default class Scenario extends Component {
    render () {
        return (
            <div className="ScenarioTag" id={ this.props.scenario}>
                <table id="scenario">
                    <tbody>
                        <tr>
                            <th className="name">{ this.props.scenario}</th>
                        </tr>
                        <tr>
                            <td><img src={"http://" + serverIP["serverIP"] + "/images/" + this.props.game + "/" + this.props.character + "/scenario/" + this.props.scenario} height="400px" width="400px"></img></td>
                        </tr>
                        <tr>
                            <td className="description">{ this.props.description }</td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}