import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import UpdateRoomModal from "./UpdateRooms";

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
  roomToEdit,
}) {
  return (
    <tr>
      <td>{rooms.roomID}</td>
      <td>{rooms.roomFloor}</td>
      <td> {rooms.roomNumber}</td>
      <td>{rooms.roomType}</td>
      <td> {rooms.roomPrice}</td>
      <td>
        <MdEdit
          onClick={() => {
            onEdit(rooms);
            setModalShowUpdate(true);
          }}
        />
      </td>
      <td>
        <MdDelete
          onClick={() => {
            onDelete(rooms);
            setModalShowRemove(true);
          }}
        />
        <RemoveModal
          rooms={rooms}
          show={modalShowRemove}
          onHide={() => setModalShowRemove(false)}
        />
      </td>
    </tr>
  );
}

export default Room;
