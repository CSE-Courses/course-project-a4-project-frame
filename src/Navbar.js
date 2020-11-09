import logo from './logo.svg';
import './App.css';
import React, { Component }  from 'react';
import * as ReactBootStrap from "react-bootstrap";

export default function Navbar() {
  return (
    <div className="Navbar">
    <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <ReactBootStrap.Navbar.Brand href="/">Project Frame</ReactBootStrap.Navbar.Brand>
      <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
        <ReactBootStrap.Nav className="mr-games">
          <ReactBootStrap.Nav.Link href="#noobs">Frame Data Guide</ReactBootStrap.Nav.Link>
        </ReactBootStrap.Nav>
        <ReactBootStrap.Nav>
          <ReactBootStrap.Nav.Link href="/about">About</ReactBootStrap.Nav.Link>
        </ReactBootStrap.Nav>
      </ReactBootStrap.Navbar.Collapse>
    </ReactBootStrap.Navbar>
     </div>
  );
}
