import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


export default class Attack extends Component {
    render () {
        return (
            <div>
                <div className="attackTag" id={ this.props.attack }>
                    <h1>{ this.props.attack }</h1>
                </div>
            </div>
        );
    }
}