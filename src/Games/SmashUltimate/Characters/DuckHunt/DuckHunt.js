import React from 'react'
import "../Character.css";
import pic from './DuckHunt_SmashUltimate.png';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

export default function DuckHunt() {
    return (
        <div>
            <Link to="/smashultimate_characterpage/duckhuntscenario">
            <div class="character">
                <img src={pic} alt="DuckHunt" height="150px" width="150px"></img>
                <span class="characterName">Duck Hunt</span>
            </div>
        </Link>
        </div>
    )
}
