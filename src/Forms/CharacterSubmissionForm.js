import React from 'react';
import ReactDOM from 'react-dom';
import './Forms.css';

class CharacterForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			character: '',
			game: '',
			description: '',
			image: null,
			move1: '',
			move2: '',
			move3: '',
		};
	}
	
	mySubmitHandler = (event) => {
		alert("Character info submitted.");
		event.preventDefault();
	}
	
	myChangeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		this.setState({[nam]: val});
	}
	
	render() {
		return (
			<form onSubmit={this.mySubmitHandler}>
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
								onChange={this.myChangeHandler}
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
								onChange={this.myChangeHandler}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-25">
							<label>From game:</label>
						</div>
						<div className="col-85">
							<select 
								name='game'
								onChange={this.myChangeHandler}
							>
							<option value="Ultimate">Ultimate</option>
							<option value="Tekken">Tekken</option>
							<option value="Melee">Melee</option>
							<option value="DBZ">DBZ</option>
							</select>
						</div>
					</div>
					<div className="row">
						<div className="col-25">
							<label>Description:</label>
						</div>
						<div className="textarea">
							<textarea
							name='description'
							onChange={this.myChangeHandler}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-25">
							<label>Move 1:</label>
						</div>
						<div className="col-85">
							<input
								type='text'
								name='move1'
								onChange={this.myChangeHandler}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-25">
							<label>Move 2:</label>
						</div>
						<div className="col-85">
							<input
								type='text'
								name='move2'
								onChange={this.myChangeHandler}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-25">
							<label>Move 3:</label>
						</div>
						<div className="col-85">
							<input
								type='text'
								name='move3'
								onChange={this.myChangeHandler}
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

export default CharacterForm;