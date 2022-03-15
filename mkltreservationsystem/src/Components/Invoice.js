import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";

function Invoice({
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
  onEdit,
  onDelete,
  invoice,
}) {
  return (
    <tr>
      <td>{invoice.invoiceID}</td>
      <td>{invoice.reservationID}</td>
      <td>{invoice.invoiceAmount}</td>
      <td>{invoice.creditCard}</td>
      <td>{(new Date(invoice.dueDate)).toLocaleDateString()}</td>
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
