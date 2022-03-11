import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";


function Customer({
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
  onEdit,
  onDelete,
  customer,
}) {
  return (
    <tr>
      <td>{customer.customerID}</td>
      <td>{customer.firstName}</td>
      <td>{customer.lastName}</td>
      <td>{customer.emailAddress}</td>
      <td>{customer.phoneNumber}</td>
      <td>
      <MdEdit onClick={() => {
        onEdit(customer);
        setModalShowUpdate(true)
      }} />
      </td>
      <td>
        <MdDelete onClick={() => {
          onDelete(customer);
          setModalShowRemove(true)
        }} />
      </td>
    </tr>
  );
}

export default Customer;
