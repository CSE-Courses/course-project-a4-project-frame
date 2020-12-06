import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './Changes.css';
import serverIP from '../serverIP';

export default class Change extends Component {
    componentDidMount() {
        console.log(this.props);
        var remove = document.getElementById("remove" + this.props.id);
        var gameInfo = document.getElementById("gameInfo" + this.props.id);
        var characterInfo = document.getElementById("characterInfo" + this.props.id);
        var attackInfo = document.getElementById("attackInfo" + this.props.id);
        var scenarioInfo = document.getElementById("scenarioInfo" + this.props.id);
        remove.style.display = "none";
        gameInfo.style.display = "none";
        characterInfo.style.display = "none";
        attackInfo.style.display = "none";
        scenarioInfo.style.display = "none";
        var type = this.props.type;
        if(type == "game"){
            document.getElementById("name" + this.props.id).innerText = this.props.game;
            gameInfo.style.display = "block";
        }
        else if(type == "character"){
            document.getElementById("name" + this.props.id).innerText = this.props.character;
            gameInfo.style.display = "block";
            characterInfo.style.display = "block";
        }
        else if(type == "attack"){
            document.getElementById("name" + this.props.id).innerText = this.props.attack;
            gameInfo.style.display = "block";
            characterInfo.style.display = "block";
            attackInfo.style.display = "block";
        }
        else if(type == "scenario"){
            document.getElementById("name" + this.props.id).innerText = this.props.scenario;
            gameInfo.style.display = "block";
            characterInfo.style.display = "block";
            scenarioInfo.style.display = "block";
        }
        if(this.props.remove){
            remove.style.display = "block";
            document.getElementById("image" + this.props.id).style.display = "none";
        }
        
    }
    render () {
        return (
            <div className="changeTag" id={ this.props.change }>
                <table id="change">
                    <tbody>
                        <tr class="remove" id={"remove" + this.props.id}>
                            <h1>Remove</h1>
                        </tr>
                        <tr>
                            <th id={"name" + this.props.id}></th>
                        </tr>
                        <tr>
                            <td id={"image"+this.props.id}><img src={"http://" + serverIP["serverIP"] + "/images/change/" + this.props.id} height="500px" width="500px"></img></td>
                        </tr>
                        <div class="infoTable" id={"gameInfo" + this.props.id}>
                            <tr>
                                <th>Game: { this.props.game }</th>
                            </tr>
                        </div>
                        <div class="infoTable" id={"characterInfo" + this.props.id}>
                            <tr class="infoTableSection">
                                <th>Character: { this.props.character }</th>
                            </tr>
                        </div>
                        
                        <div class="infoTable" id={"attackInfo" + this.props.id}>
                            <tr class="infoTableSection">
                                <td className="attack">Attack: { this.props.attack }</td>
                            </tr>
                            <tr class="infoTableSection">
                                <td className="start">{ this.props.startup } Frame Start Up</td>
                            </tr>
                            <tr class="infoTableSection">
                                <td className="shield">{ this.props.shield } On shield</td>
                                
                            </tr>
                            <tr class="infoTableSection">
                                <td className="active">Active on { this.props.active }</td>
                            </tr>
                        </div>
                        <div class="infoTable" id={"scenarioInfo" + this.props.id}>
                            <tr class="infoTableSection">
                                <td className="scenario">Scenario: { this.props.scenario }</td>
                            </tr>
                            <tr class="infoTableSection">
                                <td className="description">{ this.props.description }</td>
                            </tr>
                        </div>
                        <tr>
                            <td className="accept"><a href={"http://" + serverIP["serverIP"] + "/submit-changes?action=accept&id=" + this.props.id}>Accept</a></td>
                        </tr>
                        <tr>
                            <td className="reject"><a href={"http://" + serverIP["serverIP"] + "/submit-changes?action=reject&id=" + this.props.id}>Reject</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}