import React from "react";
import Customer from "./Customer";
import { Table } from "react-bootstrap";

function CustomerList({
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
  onEdit,
  onDelete,
  customers,
}) {
  return (
    <Table id="Customers" className="borderless">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Edit Customer</th>
          <th>Delete Customer</th>
        </tr>
      </thead>
      <tbody>
        {customers?.map((customer, i) => (
          <Customer
            modalShowUpdate={modalShowUpdate}
            setModalShowUpdate={setModalShowUpdate}
            modalShowRemove={modalShowRemove}
            setModalShowRemove={setModalShowRemove}
            onEdit={onEdit}
            onDelete={onDelete}
            customer={customer}
          ></Customer>
        ))}
      </tbody>
    </Table>
  );
}

export default CustomerList;
