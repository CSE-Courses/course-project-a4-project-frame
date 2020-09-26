import React from 'react'
import "../Character.css";
import pic from './Bowser_SmashUltimate.png';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

export default function Bowser() {
    return (
        <Link to="/smashultimate_characterpage/bowserscenario">
            <div class="character">
                <img src={pic} alt="Bowser" height="150px" width="150px"></img>
                <span class="characterName">Bowser</span>
            </div>
        </Link>
    )
}
