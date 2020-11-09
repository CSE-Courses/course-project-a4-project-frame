import React, { Component } from 'react'
import './Games.css'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Game from './Game';
import Modal from '../Modal/Modal';
import '../Modal/ModalScripts.js';
import serverIP from '../serverIP';


export default class Games extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [] //Will be used to store all characters for the game
        };
      }
    componentDidMount() {
        fetch("http://" + serverIP["serverIP"] + "/get/games") // Calls server for characters to fill the tiles currently set for development server
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
        )
    }
      getGames() {
        var games = this.state.items;
        console.log(games);
        const gamesList = games.map((game) => <Game key={game} game={game} />);
        return gamesList;
    }
    render () {
        return (
            <div>
                <div className="Games">       
                    {this.getGames()}
                </div>
                <Modal page="games"/> 
            </div>
        );
    }
}