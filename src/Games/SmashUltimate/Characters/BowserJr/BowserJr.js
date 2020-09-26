import React from 'react'
import "../Character.css";
import pic from './BowserJr_SmashUltimate.jpg';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

export default function BowserJr() {
    return (
            <Link to="/smashultimate_characterpage/bowserjrscenario">
                <div class="character">
                    <img src={pic} alt="BowserJr" height="150px" width="150px"></img>
                    <span class="characterName">Bowser Jr.</span>
                </div>
            </Link>
    )
}
