import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";

function UpdateModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Check in Customer to Room
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Reservation ID</h4>
        <input></input>
        <h4>Room ID</h4>
        <input></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Check In</Button>
      </Modal.Footer>
    </Modal>
  );
}

function RemoveModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Check Out Guest
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4> Are you sure you want to check out this guest?</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Check Out</Button>
      </Modal.Footer>
    </Modal>
  );
}

function RR({
  rr,
  onDelete,
  onEdit,
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
}) {
  return (
    <tr>
      <td>304</td>
      <td>Morgan Kandula</td>
      <td>02/17/2021</td>
      <td>
        <AiOutlineCheckCircle onClick={() => setModalShowUpdate(true)} />
        <UpdateModal
          show={modalShowUpdate}
          onHide={() => setModalShowUpdate(false)}
        />
      </td>
      <td>
        <AiOutlineCheckCircle onClick={() => setModalShowRemove(true)} />
        <RemoveModal
          show={modalShowRemove}
          onHide={() => setModalShowRemove(false)}
        />
      </td>
    </tr>
  );
}

export default RR;
