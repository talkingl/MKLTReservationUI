import React from "react";
import Reservation from "./Reservation";
import { Table } from "react-bootstrap";

function ReservationList({
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
  onEdit,
  onDelete,
  reservations,
}) {
  return (
    <div>
      <h1> Reservations</h1>
      <Table id="Reservations" className="borderless">
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Customer</th>
            <th>Employee</th>
            <th>Check-In Date</th>
            <th>Stay Length(days)</th>
            <th>Special Request(s)</th>
            <th>Edit Reservation</th>
            <th>Delete Reservation</th>
          </tr>
        </thead>
        <tbody>
          {reservations?.map((reservation, i) => (
            <Reservation
              key={i}
              modalShowUpdate={modalShowUpdate}
              setModalShowUpdate={setModalShowUpdate}
              modalShowRemove={modalShowRemove}
              setModalShowRemove={setModalShowRemove}
              onEdit={onEdit}
              onDelete={onDelete}
              reservation={reservation}
            ></Reservation>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ReservationList;
