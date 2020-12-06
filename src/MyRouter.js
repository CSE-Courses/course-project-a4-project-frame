import React from 'react'
import './Games/Games.css'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Games from './Games/Games.js';
import Characters from './Characters/Characters.js';
import Attacks from './Attacks/Attacks'
import Scenarios from './Scenarios/Scenarios'
import Navbar from './Navbar';
import About from './About/about.js';
import ChangeLog from './ChangeLog/ChangeLog.js';
import Login from './Login/Login.js';
import Register from './Register/Register.js';
import UserGuide from './Userguide/UserGuide.js';

export default function RouterPage() {
    return (
        <div>
            <Navbar />
            
            <Route component={Games} exact path="/" />
            <Switch>
                <Route component={Login} exact path="/login" />
                <Route component={About} exact path="/about" />
                <Route component={Register} exact path="/register" />
                <Route component={ChangeLog} exact path="/changes" />
                <Route component={UserGuide} exact path="/guide" />
                <Route component={Characters} exact path="/:game" />
            </Switch>
            <Route component={Attacks} exact path ="/:game/:character" />
            <Route component={Scenarios} exact path ="/:game/:character/Scenarios" />
        </div>
    )
}
