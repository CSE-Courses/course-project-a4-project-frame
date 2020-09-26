import React from 'react'
import SmashUlimateButton from './Games/SmashUltimate/SmashUltimateButton.js';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import SmashUltimate_CharacterPage from './Games/SmashUltimate/SmashUltimate_CharacterPage.js';

export default function GamesList() {
    return (
        <div>
            <Route component={SmashUlimateButton} exact path="/" />
            <Route component={SmashUltimate_CharacterPage} path = '/smashultimate_characterpage' />
        </div>
    )
}
