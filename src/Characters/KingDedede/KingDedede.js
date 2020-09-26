import React from 'react'
import "../Character.css";
import pic from './KingDedede_SmashUltimate.png';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

export default function KingDedede() {
    return (
        <div>
            <Link to="/kingdededescenario">
            <div class="character">
                <img src={pic} alt="KingDedede" height="150px" width="150px"></img>
                <span class="characterName">King Dedede</span>
            </div>
        </Link>
        </div>
    )
}
