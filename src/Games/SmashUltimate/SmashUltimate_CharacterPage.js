import React from 'react'
import './Characters/Character.css'
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
                <Route component={Bowser} exact path="/smashultimate_characterpage" />
                <Route component={BowserJr} exact path="/smashultimate_characterpage" />
                <Route component={DrMario} exact path="/smashultimate_characterpage" />
                <Route component={DuckHunt} exact path="/smashultimate_characterpage" />
                <Route component={KingDedede} exact path="/smashultimate_characterpage" />
                <Route component={BowserScenario} path ="/smashultimate_characterpage/bowserscenario" />
                <Route component={BowserJrScenario} path ="/smashultimate_characterpage/bowserjrscenario" />
                <Route component={DrMarioScenario} path ="/smashultimate_characterpage/drmarioscenario" />
                <Route component={DuckHuntScenario} path ="/smashultimate_characterpage/duckhuntscenario" />
                <Route component={KingDededeScenario} path ="/smashultimate_characterpage/kingdededescenario" />
        </div>
    )
}

