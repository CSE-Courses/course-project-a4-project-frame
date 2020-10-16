import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './Attacks.css'


export default class Attack extends Component {
    render () {
        return (
            <div className="attackTag" id={ this.props.attack }>
                <table id="attack">
                    <tbody>
                        <tr>
                            <th className="name">{ this.props.attack }</th>
                        </tr>
                        <tr>
                            <td><img src="https://www.ssbwiki.com/images/thumb/3/35/Mariosmashattack.jpg/200px-Mariosmashattack.jpg"></img></td>
                        </tr>
                        <tr>
                            <td className="start">22 Frame Start Up</td>
                            
                        </tr>
                        <tr>
                            <td className="shield">-20 On shield</td>
                            
                        </tr>
                        <tr>
                            <td className="active">Active on 22-25</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}