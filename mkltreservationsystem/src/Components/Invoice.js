import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";

function Invoice({
  invoice,
  onDelete,
  onEdit,
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
}) {
  return (
    <tr>
      <td>{invoice.invoiceID}</td>
      <td>{invoice.reservationID}</td>
      <td>{invoice.invoiceAmount}</td>
      <td>{invoice.creditCard}</td>
      <td>{invoice.dueDate}</td>
      <td>{invoice.invoicePaid}</td>
      <td>
      <MdEdit onClick={() => {
        onEdit(invoice);
        setModalShowUpdate(true)
      }} />
      </td>
      <td>
      <MdDelete onClick={() => {
        onDelete(invoice);
        setModalShowRemove(true)
      }} />
      </td>
    </tr>
  );
}

export default Invoice;
