import { Modal, Button } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import { useState } from "react";

function RemoveRoomModal(props) {
  console.log(props.roomToDelete.roomID);
  let roomID = 0;
  let roomNumber = 0;
  let roomFloor = 0;
  if (props.roomToDelete) {
    roomID = props.roomToDelete.roomID;
    roomNumber = props.roomToDelete.roomNumber;
    roomFloor = props.roomToDelete.roomFloor;
  }
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
        <h4>
          {" "}
          Are you sure you want to delete this room ID #{roomID}, Room Floor #
          {roomFloor}, and Room Number {roomNumber}?{" "}
        </h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Remove</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RemoveRoomModal;
