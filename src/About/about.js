import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Modal from '../Modal/Modal';
import serverIP from '../serverIP';
import './about.css';

export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
        };
    }
    render () {
        return (
            <div>
                <h1><center>About</center></h1>
                <div>
                    <p  className="about">
                    Project frame is a user driven website which seeks to be a place to gather
                    data on different fighting games. We allow users to submit info on games, 
                    characters, their moves, and differnet scenarios that can happen in a match. 
                    Users have the ability to report incorrect or updated information to admins 
                    using the report form at the on each page, where these changes will later be 
                    approved by the admins.
                    </p>
                </div>
            </div>
        );
    }
}