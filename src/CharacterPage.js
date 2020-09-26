import React from 'react'
import './CharacterPage.css'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Bowser from './Characters/Bowser/Bowser';
import BowserScenario from './Characters/Bowser/BowserScenario';
import BowserJr from './Characters/BowserJr/BowserJr';
import BowserJrScenario from './Characters/BowserJr/BowserJrScenario';
import DrMario from './Characters/DrMario/DrMario';
import DrMarioScenario from './Characters/DrMario/DrMarioScenario';
import DuckHunt from './Characters/DuckHunt/DuckHunt';
import DuckHuntScenario from './Characters/DuckHunt/DuckHuntScenario';
import KingDedede from './Characters/KingDedede/KingDedede';
import KingDededeScenario from './Characters/KingDedede/KingDededeScenario';

export default function characterPage() {
    return (
        <div>
            <header>Pending Header - We can talk about what we want to go here</header>
                <Route component={Bowser} exact path="/" />
                <Route component={BowserJr} exact path="/" />
                <Route component={DrMario} exact path="/" />
                <Route component={DuckHunt} exact path="/" />
                <Route component={KingDedede} exact path="/" />
                <Route component={BowserScenario} path ="/bowserscenario" />
                <Route component={BowserJrScenario} path ="/bowserjrscenario" />
                <Route component={DrMarioScenario} path ="/drmarioscenario" />
                <Route component={DuckHuntScenario} path ="/duckhuntscenario" />
                <Route component={KingDededeScenario} path ="/kingdededescenario" />
        </div>
    )
}
