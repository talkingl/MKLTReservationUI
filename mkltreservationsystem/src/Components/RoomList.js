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
  roomToEdit,
}) {
  return (
    <div>
      <h1> Rooms</h1>
      <Table id="Rooms" className="borderless">
        <thead>
          <th>Room ID</th>
          <th>Room Floor</th>
          <th>Room Number</th>
          <th>Room Type</th>
          <th>Room Price</th>
          <th>Edit Room</th>
          <th>Delete Room</th>
        </thead>
        <tbody>
          {rooms?.map((rooms, i) => (
            <Room
              modalShowUpdate={modalShowUpdate}
              setModalShowUpdate={setModalShowUpdate}
              modalShowRemove={modalShowRemove}
              setModalShowRemove={setModalShowRemove}
              onEdit={onEdit}
              rooms={rooms}
              roomToEdit={roomToEdit}
            ></Room>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default RoomList;
