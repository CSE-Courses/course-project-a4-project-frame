import React, { Component } from 'react';
import './Login.css';


import {Button, Form, FormGroup, Label, Input}
 from 'reactstrap';

class App extends Component {
  render() {
    return (
    <Form className="login-form" method="post" action="/login">
       <h2>Start Fighting!</h2>
       <FormGroup>
         <Label>Username</Label>
         <Input type="text" placeholder ="Username" name="username"></Input>
       </FormGroup>
       <FormGroup>
         <Label>Password</Label>
         <Input type="text" placeholder ="Password" name="password"></Input>
       </FormGroup>
       <Button className = "btn-lg btn-dark btn-block">
         Log In
       </Button>
       <div className = "text-center">
         <a href="/sign up">Sign Up</a>
       </div>
    </Form>
  );
}
}

export default App;