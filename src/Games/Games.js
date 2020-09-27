import React, { Component } from 'react'
import './Games.css'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Game from './Game';
import Modal from '../Modal/Modal';
import '../Modal/ModalScripts.js';


export default class Games extends Component {
    getGames() {
        var games = ['Ultimate', 'Tekken', 'DBZ'];
        const gamesList = games.map((game) => <Game key={game} game={game} />);
        return gamesList;
    }
    render () {
        return (
            <div>
                <div className="Games">       
                    {this.getGames()}
                </div>
                <Modal /> 
            </div>
        );
    }
}