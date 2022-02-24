import React from "react";
import Reservation from "./Reservation";
import { Table } from "react-bootstrap";

function ReservationList({
  reservations,
  onDelete,
  onEdit,
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
}) {
  return (
    <div>
      <h1> Reservations</h1>
      <Table id="Reservations" className="borderless">
        <thead>
          <th>Reservation ID</th>
          <th>Customer ID</th>
          <th>Employee ID</th>
          <th>Check-In Date</th>
          <th>Stay Length(days)</th>
          <th>Room Number</th>
          <th>Checked In? (Y/N)</th>
          <th>Checked Out? (Y/N)</th>
          <th>Special Request(s)</th>
          <th>Edit Reservation</th>
          <th>Delete Reservation</th>
        </thead>
        <tbody>
          <Reservation
            modalShowUpdate={modalShowUpdate}
            setModalShowUpdate={setModalShowUpdate}
            modalShowRemove={modalShowRemove}
            setModalShowRemove={setModalShowRemove}
          ></Reservation>
        </tbody>
      </Table>
    </div>
  );
}

export default ReservationList;
