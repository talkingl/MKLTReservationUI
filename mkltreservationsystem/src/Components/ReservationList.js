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
          <th>reservationID</th>
          <th>customerID</th>
          <th> employeeID</th>
          <th>checkInDate</th>
          <th> stayLength</th>
          <th> checkedIn</th>
          <th> checkedOut</th>
          <th> specialRequest</th>
          <th> Edit Reservation</th>
          <th> Delete Reservation</th>
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
