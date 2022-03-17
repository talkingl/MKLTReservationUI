import React from "react";
import Room from "./Room";
import { Table } from "react-bootstrap";

function RoomList({
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
  onEdit,
  onDelete,
  roomToEdit,
  roomToDelete,
  rooms,
}) {
  return (
    <div>
      <h1> Rooms</h1>
      <Table hover variant="dark">
        <thead className="color-table">
          <tr>
            <th>Room ID</th>
            <th>Room Floor</th>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Room Price</th>
            <th>Edit Room</th>
            <th>Delete Room</th>
          </tr>
        </thead>
        <tbody>
          {rooms?.map((room, i) => (
            <Room
              key={i}
              modalShowUpdate={modalShowUpdate}
              setModalShowUpdate={setModalShowUpdate}
              modalShowRemove={modalShowRemove}
              setModalShowRemove={setModalShowRemove}
              onEdit={onEdit}
              onDelete={onDelete}
              room={room}
              roomToEdit={roomToEdit}
              roomToDelete={roomToDelete}
            ></Room>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default RoomList;
