import React, { Component } from 'react'
import "./Character.css";
import BowserPic from './Bowser_SmashUltimate.png';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import serverIP from '../serverIP';

export default class Character extends Component {
    render() {
        return (
            <div>
               <Link to={"./"+ this.props.game + "/"+ this.props.character}>
                    <div className="character">
                        <img src={"http://" + serverIP["serverIP"] + "/images/" + this.props.game + "/" + this.props.character} alt={this.props.character} height="150px" width="150px"></img>
                        <span className="characterName">{this.props.character}</span>
                    </div>
                </Link> 
            </div>

        );
    }
}