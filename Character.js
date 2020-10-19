import React, { Component } from 'react'
import "./Character.css";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

export default class Character extends Component {
    render() {
        return (
            <div>
               <Link to={"./"+ this.props.game + "/"+ this.props.character}>
                    <div className="character">
                    <img src={require('./Images/' + this.props.character +'/' + this.props.character + '_' + this.props.game + '.png')} alt={this.props.characters} height="150px" width="150px"></img>
                        <span className="characterName">{this.props.character}</span>
                    </div>
                </Link> 
            </div>

        );
    }
}