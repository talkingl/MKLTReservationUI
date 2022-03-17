import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

function Room({
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
  onEdit,
  onDelete,
  room,
  roomToEdit,
  roomToDelete,
}) {
  return (
    <tr>
      <td>{room.roomID}</td>
      <td>{room.roomFloor}</td>
      <td>{room.roomNumber}</td>
      <td>{room.roomType}</td>
      <td>{room.roomPrice}</td>
      <td>
        <MdEdit
          onClick={() => {
            onEdit(room);
            setModalShowUpdate(true);
          }}
        />
      </td>
      <td>
        <MdDelete
          onClick={() => {
            onDelete(room);
            setModalShowRemove(true);
          }}
        />
      </td>
    </tr>
  );
}

export default Room;
