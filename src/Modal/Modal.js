import React, { Component } from 'react';
import ModalForm from './ModalForm'
import ModalButton from './ModalButton'
import './Modal.css'
import { ModalButtonHeightSet, ModalButtonClick, OutsideModal, ModalCloseX } from './ModalScripts.js'

export default class Modal extends Component {
   componentDidMount() {
      ModalButtonHeightSet();
      window.addEventListener("resize", ModalButtonHeightSet);
   }
   componentWillUnmount() {
      window.removeEventListener("resize", ModalButtonHeightSet);
   }
  
   render() {
      return (
         <div>
            <ModalButton />
            <ModalForm page={this.props.page}/>
         </div>
      );
   }
}