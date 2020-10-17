import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Attack from './Attack';
import Modal from '../Modal/Modal';
import './Attacks.css'


export default class Attacks extends Component {
    getAttacks() {
        var attacks = ['SideB', 'UpB', 'Jab'];
        const attacksList = attacks.map((attack) => <Attack 
            game={this.props.match.params.game} 
            character={this.props.match.params.character} 
            attack={attack}
            key = {attack}
        />);
        return attacksList;
    }
    render () {
        return (
            <div>
                <div className="Attacks">       
                    {this.getAttacks()}
                </div>
                <Modal page="attacks" /> 
            </div>
        );
    }
}