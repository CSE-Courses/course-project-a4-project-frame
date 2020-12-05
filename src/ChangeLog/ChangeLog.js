import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Modal from '../Modal/Modal';
import serverIP from '../serverIP';

export default class ChangeLog extends Component {
    constructor() {
        super();
        this.state = {
          error: null,
          isLoaded: false,
          items: [] //Will be used to store all changes submitted by users
        };
    }

    getChanges(){

    }

    componentDidMount() {

    }

    render(){
        return (
            <div>
              <div> 
                  {this.getChanges}
              </div>
              <Modal page="changes" /> 
            </div>
        );
    }

}