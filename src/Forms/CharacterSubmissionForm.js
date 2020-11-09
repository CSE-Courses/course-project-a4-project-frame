//renders the character creation form
import React from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import './Forms.css';
import serverIP from '../serverIP';

export default function CharacterSubmissionForm() {
    const location = useLocation();
    return (
        <div>
            <CharacterForm location={location.pathname}/>
        </div>
    )
}

class CharacterForm extends React.Component {
	
	render() {
		return (
			<form method="POST" action={"http://" + serverIP["serverIP"] + this.props.location +"/submission-character"} enctype="multipart/form-data">
				<br/>
				<h1>Submission form</h1>
				<div className="container">
					<div className="row">
						<div className="col-25">
							<label>Character name:</label>
						</div>
						<div className="col-85">
							<input
								type='text'
								name='character'
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-25">
							<label>Upload character image:</label>
						</div>
						<div className="select-button">
							<input
								type='file'
								name='image'
								accept=".jpg,.jpeg,.png,.bmp,.gif"
							/>
						</div>
					</div>
					<br/>
					<div className="row">
						<input type='submit' />
					</div>
				</div>
			</form>
		);
	}
}
