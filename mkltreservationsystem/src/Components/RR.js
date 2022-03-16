import React from "react";
import { AiOutlineCheckCircle, AiFillCheckCircle, AiOutlineCloseCircle, AiFillCloseCircle } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";

function RR({
  onEditCheckIn,
  onEditCheckOut,
  roomReservation,
}) {
  return (
    <tr>
      <td>{roomReservation.roomNumber}</td>
      <td>{roomReservation.reservationID}</td>
      <td>{roomReservation.customerName}</td>
      <td>{(new Date(roomReservation.checkInDate)).toLocaleDateString()}</td>
      <td>
        {roomReservation.checkedIn
            ? <AiFillCheckCircle onClick={(() => onEditCheckIn(roomReservation))} />
            : <AiOutlineCheckCircle onClick={(() => onEditCheckIn(roomReservation))} />
        }
      </td>
      <td>
        {roomReservation.checkedOut
            ? <AiFillCheckCircle onClick={(() => onEditCheckOut(roomReservation))} />
            : <AiOutlineCheckCircle onClick={(() => onEditCheckOut(roomReservation))} />
        }
      </td>
    </tr>
  );
}

export default RR;
