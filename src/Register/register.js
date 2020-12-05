import React from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import './register.css';
import serverIP from '../serverIP';
import {Button, Form, FormGroup, Label, Input}
 from 'reactstrap';

export default function Register() {
    return (
        <div>
            <RegisterForm/>
        </div>
    )
}

class RegisterForm extends React.Component {
	
	render() {
		return (
			<Form className="login-form" method="post" action="/register">
			   <h2>Sign Up</h2>
			   <FormGroup>
				 <Label>Username</Label>
				 <Input type="text" placeholder ="Username" name="username"></Input>
			   </FormGroup>
			   <FormGroup>
				 <Label>Password</Label>
				 <Input type="password" placeholder ="Password" name="password"></Input>
			   </FormGroup>
			   <Button className = "btn-lg btn-dark btn-block">
				 Register
			   </Button>
			</Form>
		);
	}
}
