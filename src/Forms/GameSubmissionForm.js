import React from 'react';
import ReactDOM from 'react-dom';
import './ReportForm.css';

export default class ReportForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      game: '',
      image: null
    };
  }

  handleChange = (event) => {
    let name_ = event.target.name;
    let value_ = event.target.value;
    this.setState({[name_]: value_});
  }

  handleSubmit = (event) => {
    alert('Report submitted successfully');
    event.preventDefault();
  }

  render() {
    return (
     <form onSubmit={this.handleSubmit}>
       <br/>
       <h1>Report Form</h1>
      <div className="container">
        <div className="row">
          <div className="col-25">
            <label>Game Title: </label>
          </div>
          <div className="col-85">
            <input
            type='text'
            name='game'
            onChange={this.handleChange}
            />
          </div> 
        </div>
          <div className="row">
            <div classname="col-25">
              <label>Upload Image for Game: </label>
            </div>
            <div className="select-button">
           `` <input
                type='file'
                name='image'
                accept=".jpg,.jpeg,.png,.bmp"
                onChange={this.myChangeHandler}
            />
          </div>
          </div>
      </div>
     </form>
    );
  }
}