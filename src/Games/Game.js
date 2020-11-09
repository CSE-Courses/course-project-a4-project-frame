import React, { Component } from 'react'
import "./Games.css";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import serverIP from '../serverIP';


export default class Game extends Component {
    render () {
        var imgUrl = "http://" + serverIP["serverIP"] + "/images/" + encodeURIComponent(this.props.game);
        return (
            <div>
                <Link to= {"./" + this.props.game} >
                    <style>
                        {"#" + this.props.game.replace(/\s/g, '')} {"{ background-position: 50%; background-image: url('" + imgUrl + "');}"}
                    </style>
                    <div className="gameTag" id={ this.props.game.replace(/\s/g, '') }>
                        <h1>{ this.props.game }</h1>
                    </div>
                </Link>
            </div>
        );
    }
}

// style={"background-image: url("http://" + serverIP["serverIP"] + "/images/" + this.props.game + ")"}