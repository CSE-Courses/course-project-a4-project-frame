import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Attack from './Attack';
import Modal from '../Modal/Modal';
import './Attacks.css'
import serverIP from '../serverIP';


export default class Attacks extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [] //Will be used to store all characters for the game
        };
    }
    getAttacks() {
        var attacks = this.state.items;
        console.log(attacks);
        const attacksList = attacks.map((attack) => <Attack 
            game={this.props.match.params.game} 
            character={this.props.match.params.character} 
            attack={attack["name"]}
            key = {attack["name"]}
            startup = {attack['startup']}
            active = {attack['active']}
            shield = {attack['shield']}

        />);
        return attacksList;
    }
    componentDidMount() {
        fetch("http://" + serverIP["serverIP"] + "/get/" + this.props.match.params.game + "/" + this.props.match.params.character +"/attacks") // Calls server for characters to fill the tiles currently set for development server
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
              <Link Link to={"./" + this.props.match.params.character + "/" + "Scenarios"}>
                <button class="buttons">Scenarios</button>
              </Link>
              <div className="Attacks">       
                  {this.getAttacks()}
              </div>
              <Modal page="attacks" game={this.props.match.params.game} character={this.props.match.params.character}/> 
            </div>
        );
    }
}