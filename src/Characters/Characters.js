import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Character from './Character'
import Modal from '../Modal/Modal'
import serverIP from '../serverIP';

export default class Characters extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [] //Will be used to store all characters for the game
        };
      }
    getCharacters() {
        const characters = this.state.items;
        console.log(characters)
        const charactersList = characters.map((character) => <Character 
            key={character}
            game={this.props.match.params.game} 
            character={character} 
        />);
        return charactersList;
    }
    componentDidMount() {
      console.log(this.props)
        fetch("http://" + serverIP["serverIP"] + "/get/" + this.props.match.params.game + "/characters") // Calls server for characters to fill the tiles currently set for development server
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
    render () {
        return (
            <div>
                <div id="Characters">  
                    {this.getCharacters()}
                </div>
                <Modal page="characters"/>
            </div>
        );
    }
}
