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
        <Modal.Title>{LANG.ALL_MEMBERS}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {LANG.ARE_YOU_SURE_WANT_TO_DELETE}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' className='mx-2' onClick={handleClose}>
          {LANG.CANCEL}
        </Button>
        <Button variant="danger" className='' onClick={handleSubmit}>
          {LANG.SUBMIT}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
