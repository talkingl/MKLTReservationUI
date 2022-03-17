import React from "react";
import {
  AiOutlineCheckCircle,
  AiFillCheckCircle,
  AiOutlineCloseCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";

function RR({ onEditCheckIn, onEditCheckOut, roomReservation }) {
  return (
    <tr>
      <td>{roomReservation.roomNumber}</td>
      <td>{roomReservation.reservationID}</td>
      <td>{roomReservation.customerName}</td>
      <td>{new Date(roomReservation.checkInDate).toLocaleDateString()}</td>
      <td>
        {roomReservation.checkedIn === 1 ? <AiFillCheckCircle
                onClick={() => onEditCheckIn(roomReservation, roomReservation.roomID)} />
            : <AiOutlineCheckCircle
                onClick={() => onEditCheckIn(roomReservation, roomReservation.roomID)} />
        }
      </td>
      <td>
        {roomReservation.checkedOut === 1
            ? <AiFillCloseCircle onClick={() => onEditCheckOut(roomReservation, roomReservation.roomID)} />
            : <AiOutlineCloseCircle onClick={() => onEditCheckOut(roomReservation, roomReservation.roomID)} />
        }
      </td>
    </tr>
  );
}

export default RR;
