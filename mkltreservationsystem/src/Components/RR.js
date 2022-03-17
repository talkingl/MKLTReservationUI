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
<<<<<<< HEAD
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
=======
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
>>>>>>> 887a3e9901df12a44b95c25ac55fc67f4d162b93
      </td>
      <td>{toggle()}</td>
    </tr>
  );
}

export default RR;
