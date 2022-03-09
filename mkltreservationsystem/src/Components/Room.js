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
          Update Room
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Room Floor</h4>
        <select 
        >
          <option value="1">1st Floor</option>
          <option value="2">2nd Floor</option>
          <option value="3">3rd Floor</option>
          <option value="4">4th Floor</option>
          <option value="5">5th Floor</option>
        </select>
        <h4>Room Number</h4>
        <input type="number"></input>
        <h4>Room Type</h4>
        <select

        >
          <option value="Queen">Two Queen Beds</option>
          <option value="King">One King Bed</option>
          <option value="JrSuite">Junior Suite</option>
          <option value="KingSuite">King Suite</option>
          <option value="HandicapQueen">Accessible with Two Queen Beds</option>
        </select>
        <h4>Room Price</h4>
        <input type="number"></input>
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
          Delete Room
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4> Are you sure you want to delete this room? </h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Remove</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Room({
  rooms,
  onDelete,
  onEdit,
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
}) {
  return (
    <tr>
      <td>{rooms.roomID}</td>
      <td>{rooms.roomFloor}</td>
      <td> {rooms.roomNumber}</td>
      <td>{rooms.roomType}</td>
      <td> {rooms.roomPrice}</td>
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

export default Room;
