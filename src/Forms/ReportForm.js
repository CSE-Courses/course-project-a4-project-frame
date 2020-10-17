//renders the report form
import React from 'react';
import ReactDOM from 'react-dom';
import './ReportForm.css';

export default class ReportForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      error: '',
      page_found_on: '',
      details: '',
      correction: ''
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
            <label>Error: </label>
          </div>
          <div className="col-85">
            <input
            type='text'
            name='error'
            onChange={this.handleChange}
            />
          </div> 
        </div>
          <div className="row">
            <div classname="col-25">
              <label>Page found on: </label>
            </div>
            <div className="col-85">
              <input
              type='text'
              name='page_found_on'
              onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div classname="col-25">
              <label>Details of the error: </label>
            </div>
              <div className="col-85">
                <input
                type='text'
                name='details'
                onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div classname="col-25">
                <label>Correction: </label>
              </div>
              <div className="col-85">
                <input
                type='text'
                name='correction'
                onChange={this.handleChange}
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