import React, { Component } from 'react';
import Form from './Forms/Form';
import { ModalButtonHeightSet, ModalButtonClick, OutsideModal, ModalCloseX } from './ModalScripts.js'


export default class FormModal extends Component {

  render () {
    return (
      <div id="EditFormModal" onClick={ (e) => OutsideModal(e)}>
        <div id="ModalForm" className="center">
          <div id="ModalClose" onClick={ModalCloseX} >
            <svg className="svg-cross" viewBox="0 0 100 100">
              <line x1="20" x2="80" y1="20" y2="80" strokeWidth="20" strokeLinecap="round"></line>
              <line x1="20" x2="80" y1="80" y2="20" strokeWidth="20" strokeLinecap="round"></line>
            </svg>
          </div>
          <Form />
        </div>
      </div>
    );
  }
}