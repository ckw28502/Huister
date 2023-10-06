import { useRef } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

function Modal(props) {
  let modal=props.modal
  const accepted=useRef(false)
  const toggleModal=()=>{
    modal=!modal
    props.toggleModal(accepted.current)
  }
  const Accept=()=>{
    accepted.current=true
    toggleModal()
  }
  return (
    <>
      <MDBModal show={modal&&!accepted.current} tabIndex='-1'>
        <MDBModalDialog scrollable={props.scrollable}>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{props.title}</MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='none'
                onClick={toggleModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {props.body}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='danger' onClick={toggleModal}>
                {props.button1}
              </MDBBtn>
              <MDBBtn onClick={Accept}>{props.button2}</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
export default Modal;