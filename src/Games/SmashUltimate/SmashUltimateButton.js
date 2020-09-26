import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

export default function SmashUltimateButton() {
    return (
        <Link to="/smashultimate_characterpage">
            <div>
                <h1>Smash Ultimate</h1>
            </div>
        </Link>
    )
}
