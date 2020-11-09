//renders the attack submission form
import React from 'react';
import { useLocation } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import serverIP from '../serverIP';

export default function CharacterSubmissionForm() {
    const location = useLocation();
    return (
        <div>
            <SubmissionForm location={location.pathname}/>
        </div>
    )
}

class SubmissionForm extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
      move: '',
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
    
    //action={'http://' + serverIP["serverIP"] + "/submission-attack" + this.props.location}>
    render() {
    console.log(this.props);
    return (
      <form method="POST" action={'http://' + serverIP["serverIP"]  + '/submission' + this.props.location + "/attack" } enctype="multipart/form-data">
	    <br/>
        <h1>Submission form</h1>
        <br/>
        <div className="container" >
          <div className="row">
          <div className="col-25">
            <label>Move name:</label>
          </div>
          <div className="col-75">
            <input
             type='text'
             name='move'
             onChange={this.myChangeHandler}
            />
          </div>
          </div>
          <div className="row">
          <div className="col-25">
            <label>Upload image of the move:</label>
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
            <label>Move startup frame data:</label>
          </div>
          <div className="col-75">
            <input
            type='text'
            name='startup'
            onChange={this.myChangeHandler}
            />
          </div>
          </div>
          <div className="row">
          <div className="col-25">
            <label>Shield data:</label>
          </div>
          <div className="col-75">
            <input
            type='text'
            name='shield'
            onChange={this.myChangeHandler}
            />
          </div>
          </div>
          <div className="row">
          <div className="col-25">
            <label>Active frames:</label>
          </div>
          <div className="col-75">
            <input
            type='text'
            name='active'
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