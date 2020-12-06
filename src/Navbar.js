import logo from './logo.svg';
import './App.css';
import React, { Component }  from 'react';
import * as ReactBootStrap from "react-bootstrap";

export default class Navbar extends Component {
  getCookie(cname){
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  componentDidMount() {
    var loggedIn = this.getCookie("loggedIn");
    console.log(loggedIn);
    if (loggedIn == "true"){
      document.getElementById('login').innerText = 'Log Out';
      document.getElementById('login').href = '/logout';
    }
  }
  
  render () {
    return (
      <div className="Navbar">
      <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <ReactBootStrap.Navbar.Brand href="/">Project Frame</ReactBootStrap.Navbar.Brand>
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootStrap.Nav className="mr-games">
            <ReactBootStrap.Nav.Link href="/guide">Frame Data Guide</ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav>
          <ReactBootStrap.Nav>
            <ReactBootStrap.Nav.Link href="/about">About</ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav>
          <ReactBootStrap.Nav>
            <ReactBootStrap.Nav.Link href="/changes">Change Log</ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav>
          <ReactBootStrap.Nav>
            <ReactBootStrap.Nav.Link href="/login" id="login">Log In</ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Navbar>
        </div>
    );
  }
}
