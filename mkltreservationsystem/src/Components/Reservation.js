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
        <h4>Customer ID</h4>
        <input></input>
        <h4>Employee ID</h4>
        <input></input>
        <h4>Check-In Date</h4>
        <input></input>
        <h4>Stay Length</h4>
        <input></input>
        <h4>Room Number</h4>
        <input></input>
        <h4>Checked In</h4>
        <input></input>
        <h4>Checked Out</h4>
        <input></input>
        <h4>Special Request(s)</h4>
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
      <td>{reservations.reservationID}</td>
      <td>{reservations.customerID}</td>
      <td> {reservations.employeeID}</td>
      <td> {reservations.checkInDate}</td>
      <td> {reservations.stayLength}</td>

      <td> {reservations.checkedIn}</td>
      <td>{reservations.checkedOut}</td>
      <td>{reservations.specialRequests}</td>

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
