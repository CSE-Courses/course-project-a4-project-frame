import React from 'react'
import './Games/Games.css'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Games from './Games/Games.js';
import Characters from './Characters/CharacterPage.js';
import Attacks from './Attacks/Attacks'

export default function RouterPage() {
    return (
        <div>
            <header>Pending Header - We can talk about what we want toooo go here</header>
            <Route component={Games} exact path="/" />
            <Route component={Characters} exact path="/:game" />
            <Route component={Attacks} path ="/:game/:character" />
            
        </div>
    )
}