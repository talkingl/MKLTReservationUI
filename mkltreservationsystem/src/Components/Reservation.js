import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
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
          Update Reservation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>customerID</h4>
        <input></input>
        <h4>employeeID</h4>
        <input></input>
        <h4>checkInDate</h4>
        <input></input>
        <h4>stayLength</h4>
        <input></input>
        <h4>checkedIn</h4>
        <input></input>
        <h4>checkedOut</h4>
        <input></input>
        <h4>specialRequest</h4>
        <input></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Update</Button>
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
          Delete Reservation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4> Are you sure you want to delete this reservation? </h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Remove</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Reservation({
  reservations,
  onDelete,
  onEdit,
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
}) {
  return (
    <tr>
      <td>1</td>
      <td>1</td>
      <td> 1</td>
      <td> 2/1/2022</td>
      <td> 3</td>
      <td> Y</td>
      <td>N</td>
      <td> No </td>

      <td>
        <MdEdit onClick={() => setModalShowUpdate(true)} />
        <UpdateModal
          show={modalShowUpdate}
          onHide={() => setModalShowUpdate(false)}
        />
      </td>
      <td>
        <MdDelete onClick={() => setModalShowRemove(true)} />
        <RemoveModal
          show={modalShowRemove}
          onHide={() => setModalShowRemove(false)}
        />
      </td>
    </tr>
  );
}

export default Reservation;
