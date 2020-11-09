import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './Attacks.css';
import serverIP from '../serverIP';


export default class Attack extends Component {
    render () {
        return (
            <div className="attackTag" id={ this.props.attack }>
                <table id="attack">
                    <tbody>
                        <tr>
                            <th className="name">{ this.props.attack }</th>
                        </tr>
                        <tr>
                            <td><img src={"http://" + serverIP["serverIP"] + "/images/" + this.props.game + "/" + this.props.character + "/" + this.props.attack} height="150px" width="150px"></img></td>
                        </tr>
                        <tr>
                            <td className="start">{ this.props.startup } Frame Start Up</td>
                        </tr>
                        <tr>
                            <td className="shield">{ this.props.shield } On shield</td>
                            
                        </tr>
                        <tr>
                            <td className="active">Active on { this.props.active }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}