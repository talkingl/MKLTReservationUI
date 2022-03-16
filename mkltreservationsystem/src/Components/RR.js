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
        <input type="number"></input>
        <h4>Room ID</h4>
        <input type="number"></input>
        <h4>Checked In</h4>
        <input value="0" className="greyedOut"></input>
        <select>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
        <h4>Checked Out</h4>
        <input value="0" className="greyedOut"></input>
        <select>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
        <h4>Special Request(s)</h4>
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
  roomReservation,
  onDelete,
  onEdit,
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
}) {
  return (
    <tr>
      <td>{roomReservation.roomNumber}</td>
      <td>{roomReservation.reservationID}</td>
      <td>{roomReservation.customerName}</td>
      <td>{(new Date(roomReservation.checkInDate)).toLocaleDateString()}</td>
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
