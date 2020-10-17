import React, { Component } from 'react';
import { ModalButtonHeightSet, ModalButtonClick, OutsideModal, ModalCloseX } from './ModalScripts.js'


export default class Modal extends Component {
    render () {
        return (
          <div id="ModalButton" onClick={ModalButtonClick}>
            <svg className="svg-plus" viewBox="0 0 100 100">
              <line x1="50" x2="50" y1="20" y2="80" strokeWidth="25" strokeLinecap="round"></line>
              <line x1="80" x2="20" y1="50" y2="50" strokeWidth="25" strokeLinecap="round"></line>
            </svg>
          </div>
        );
    }
  }