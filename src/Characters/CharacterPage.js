import React, { Component } from 'react'
import './CharacterPage.css'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Character from './Character'
import Modal from '../Modal/Modal'

export default class Characters extends Component {
    getCharacters() {
        const characters = ["Bowser", "BowserJr", "DrMario", "DuckHunt", "KingDedede"];
        const charactersList = characters.map((character) => <Character 
            key={character}
            game={this.props.match.params.game} 
            character={character} 
        />);
        return charactersList;
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
