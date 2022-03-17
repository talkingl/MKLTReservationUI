import React from "react";
import {
  AiOutlineCheckCircle,
  AiFillCheckCircle,
  AiOutlineCloseCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";

function RR({ onEditCheckIn, onEditCheckOut, roomReservation }) {
  console.log(roomReservation);
  const toggle = () => {
    if (roomReservation.checkedOut == 1) {
      return (
        <AiFillCheckCircle onClick={() => onEditCheckOut(roomReservation)} />
      );
    } else {
      return (
        <AiOutlineCheckCircle onClick={() => onEditCheckOut(roomReservation)} />
      );
    }
  };
  return (
    <tr>
      <td>{roomReservation.roomNumber}</td>
      <td>{roomReservation.reservationID}</td>
      <td>{roomReservation.customerName}</td>
      <td>{new Date(roomReservation.checkInDate).toLocaleDateString()}</td>
      <td>
        {roomReservation.checkedIn === 1 ? (
          <AiFillCheckCircle
            onClick={() => {
              onEditCheckIn(roomReservation);
            }}
          />
        ) : (
          <AiOutlineCheckCircle
            onClick={() => {
              onEditCheckIn(roomReservation);
            }}
          />
        )}
      </td>
      <td>{toggle()}</td>
    </tr>
  );
}

export default RR;
