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
  rooms,
  roomToEdit,
  roomToDelete,
}) {
  return (
    <tr>
      <td>{rooms.roomID}</td>
      <td>{rooms.roomFloor}</td>
      <td>{rooms.roomNumber}</td>
      <td>{rooms.roomType}</td>
      <td>{rooms.roomPrice}</td>
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
      </td>
    </tr>
  );
}

export default Room;
