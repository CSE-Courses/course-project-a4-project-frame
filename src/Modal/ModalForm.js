import React, { Component } from 'react';
import ReportForm from '../Forms/ReportForm';
import CharacterSubmissionForm from '../Forms/CharacterSubmissionForm'
import { ModalButtonHeightSet, ModalButtonClick, OutsideModal, ModalCloseX } from './ModalScripts.js'


export default class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: ""
    };
    this.reportClicked.bind(this);
    this.submissionClicked.bind(this);
  }

  reportClicked(){
    this.setState({form: "report"});
    document.getElementById('reportButton').style.backgroundColor = "darkgrey";
    document.getElementById('submissionButton').style.backgroundColor = "lightgrey";
  }

  submissionClicked(){
      this.setState({form: "submission"});
      document.getElementById('submissionButton').style.backgroundColor = "darkgrey";
      document.getElementById('reportButton').style.backgroundColor = "lightgrey";
  }

  render () {
    var form = this.state.form;
    return (
      <div id="EditFormModal" onClick={ (e) => OutsideModal(e)}>
        <div id="ModalForm" className="center">
          <div id="ModalClose" onClick={ModalCloseX} >
            <svg className="svg-cross" viewBox="0 0 100 100">
              <line x1="20" x2="80" y1="20" y2="80" strokeWidth="20" strokeLinecap="round"></line>
              <line x1="20" x2="80" y1="80" y2="20" strokeWidth="20" strokeLinecap="round"></line>
            </svg>
          </div>
          <div id="forms">
            <div id="reportButton" className="form">
              <h1 onClick={this.reportClicked.bind(this)}>Report</h1>
            </div>
            <div id="submissionButton" className="form">
              <h1 onClick={this.submissionClicked.bind(this)}>Submission</h1>
            </div>
          </div>
          <div id="form">
            {
            form == "report" ?
            (<ReportForm />) :
            form == "submission" && this.props.page == "characters" ?
            (<CharacterSubmissionForm />):
            null
            }
          </div>
        </div>
      </div>
    );
  }
}