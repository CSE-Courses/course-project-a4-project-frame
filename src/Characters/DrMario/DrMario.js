import React from 'react'
import "../Character.css";
import pic from './DrMario_SmashUltimate.png';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

export default function DrMario() {
    return (
        <Link to="/drmarioscenario">
            <div class="character">
                <img src={pic} alt="DrMario" height="150px" width="150px"></img>
                <span class="characterName">Dr Mario</span>
            </div>
        </Link>
    )
}
