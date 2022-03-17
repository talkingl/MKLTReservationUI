import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";

function Reservation({
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
  onEdit,
  onDelete,
  reservation,
}) {
  return (
    <tr>
      <td>{reservation.reservationID}</td>
      <td>{reservation.customerID}</td>
      <td>{reservation.employeeID}</td>
      <td>{(new Date(reservation.checkInDate)).toLocaleDateString()}</td>
      <td>{reservation.stayLength}</td>
      <td>{reservation.specialRequests}</td>

      <td>
        <MdEdit
          onClick={() => {
            onEdit(reservation);
            setModalShowUpdate(true);
          }}
        />
      </td>
      <td>
        <MdDelete
          onClick={() => {
            onDelete(reservation);
            setModalShowRemove(true);
          }}
        />
      </td>
    </tr>
  );
}

export default Reservation;
