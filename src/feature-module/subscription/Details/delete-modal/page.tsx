import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { LANG } from '../../../../constants/language';
import _ from 'lodash';

interface Props {
  show: boolean;
  handleClose: () => void;
  handleSubmit:()=>  void
}

export function ConfirmDeleteModal({ show, handleClose, handleSubmit}: Props) {

  return (
    <Modal show={show} onHide={handleClose} centered >
      <Modal.Header closeButton>
        <Modal.Title>Delete subscription</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the subscription?
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' className='mx-2' onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" className='' onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
