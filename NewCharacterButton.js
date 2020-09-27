import React from 'react'
import "./Characters/Character.css";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

export default function NewCharacterButton() {
    return (
        <Link to="/smashultimate_characterpage/charactersubmissionform">
            <div class="newCharacterButton">
                <span class="characterName">Submit a New Character</span>
            </div>
        </Link>
    )
}
