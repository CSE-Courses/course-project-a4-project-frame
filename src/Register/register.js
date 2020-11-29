import React from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import './register.css';
import serverIP from '../serverIP';

export default function Register() {
    const location = useLocation();
    return (
        <div>
            <RegisterForm location={location.pathname}/>
        </div>
    )
}

class RegisterForm extends React.Component {
	
	render() {
		return (
			<form method="POST" action={"http://" + serverIP["serverIP"] + this.props.location +"/register"} enctype="multipart/form-data">
				<br/>
				<h1>Sign up</h1>
				<div className="container">
					<div className="row">
						<div className="col-25">
							<label>Username</label>
						</div>
						<div className="col-85">
							<input
								type='text'
								name='username'
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-25">
							<label>Password</label>
						</div>
						<div className="col-85">
							<input
								type='password'
								name='password'
							/>
						</div>
					</div>
                    <div className="row">
						<div className="col-25">
							<label>Email</label>
						</div>
						<div className="col-85">
							<input
								type='text'
								name='email'
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
