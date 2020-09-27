import React, { Component } from 'react'
import "./Character.css";
import BowserPic from './Bowser_SmashUltimate.png';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

export default class Character extends Component {
    render() {
        return (
            <div>
               <Link to={"./"+ this.props.game + "/"+ this.props.character}>
                    <div className="character">
                        <img src={BowserPic} alt={this.props.characters} height="150px" width="150px"></img>
                        <span className="characterName">{this.props.character}</span>
                    </div>
                </Link> 
            </div>

        );
    }
}