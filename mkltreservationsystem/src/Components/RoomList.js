import React from "react";
import Room from "./Room";
import { Table } from "react-bootstrap";

function RoomList({
  rooms,
  onDelete,
  onEdit,
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
}) {
  return (
    <div>
      <h1> Rooms</h1>
      <Table id="Rooms" className="borderless">
        <thead>
          <th>roomID</th>
          <th>roomFloor</th>
          <th> roomNumber</th>
          <th>roomType</th>
          <th> roomPrice</th>
          <th>Edit Room</th>
          <th>Delete Room</th>
        </thead>
        <tbody>
          <Room
            modalShowUpdate={modalShowUpdate}
            setModalShowUpdate={setModalShowUpdate}
            modalShowRemove={modalShowRemove}
            setModalShowRemove={setModalShowRemove}
          ></Room>
        </tbody>
      </Table>
    </div>
  );
}

export default RoomList;
