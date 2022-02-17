import React from "react";
import RR from "./RR";
import { Table } from "react-bootstrap";

function RRList({
  rrs,
  onDelete,
  onEdit,
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
}) {
  return (
    <div>
      <h1> Room Reservations</h1>
      <Table id="RoomsReservations" className="borderless">
        <thead>
          <th>Room Number</th>
          <th>Guest Name</th>
          <th>Check In Date</th>
          <th>Guest Check In</th>
          <th>Guest Check Out</th>
        </thead>
        <tbody>
          <RR
            modalShowUpdate={modalShowUpdate}
            setModalShowUpdate={setModalShowUpdate}
            modalShowRemove={modalShowRemove}
            setModalShowRemove={setModalShowRemove}
          ></RR>
        </tbody>
      </Table>
    </div>
  );
}

export default RRList;
