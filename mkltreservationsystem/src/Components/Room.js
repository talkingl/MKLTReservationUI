import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

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
          }}
        />
      </td>
    </tr>
  );
}

export default Room;
