import React, { Component } from 'react'
import "./Games.css";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


export default class Game extends Component {
    render () {
        return (
            <div>
                <Link to= {"./" + this.props.game} >
                    <div className="gameTag" id={ this.props.game }>
                        <h1>{ this.props.game }</h1>
                    </div>
                </Link>
            </div>
        );
    }
}