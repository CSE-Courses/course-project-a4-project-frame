import React, { Component } from 'react'
import "./Character.css";
import BowserPic from './Images/Bowser_Ultimate.png';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';


function checkImg(){
    var x = require('./Images/' + this.props.character + '_' + this.props.game + '.png')
    return x;
}

export default class Character extends Component {

    

    render() {
        var x;

        try {
            x = require('./Images/' + this.props.character + '_' + this.props.game + '.png');
        } catch (error) {
            console.log(error);
            x = '/static/media/Bowser_Ultimate.cc3c8e25.png';
        }
        
        return (
            <div>
               <Link to={"./"+ this.props.game + "/"+ this.props.character}>
                    <div className="character">
                    <img src={x} onError="this.style.visibility = 'hidden'" alt={this.props.characters} height="150px" width="150px"></img>
                        <span className="characterName">{this.props.character}</span>
                    </div>
                </Link> 
            </div>

        );
    }
}