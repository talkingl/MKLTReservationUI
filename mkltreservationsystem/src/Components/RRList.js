import React from "react";
import RR from "./RR";
import { Table } from "react-bootstrap";

function RRList({ onEditCheckIn, onEditCheckOut, roomReservations }) {
  console.log(roomReservations);
  return (
    <div>
      <h1>Guest Check-In / Check-Out</h1>
      <Table id="RoomsReservations" className="borderless">
        <thead>
          <th>Room Number</th>
          <th>Reservation Number</th>
          <th>Guest Name</th>
          <th>Check In Date</th>
          <th>Guest Check In</th>
          <th>Guest Check Out</th>
        </thead>
        <tbody>
          {console.log(roomReservations)}
          {roomReservations?.map((roomReservation, i) => (
            <RR
              onEditCheckIn={onEditCheckIn}
              onEditCheckOut={onEditCheckOut}
              roomReservation={roomReservation}
            ></RR>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default RRList;
