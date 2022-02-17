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
      <h1> Rooms Reservations</h1>
      <Table id="RoomsReservations" className="borderless">
        <thead>
          <th>reservationID</th>
          <th>roomID</th>
          <th> Update Room/Reservation</th>
          <th> Delete Room/Reservation</th>
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
