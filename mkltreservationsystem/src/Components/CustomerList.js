import React from "react";
import Customer from "./Customer";
import { Table } from "react-bootstrap";

function CustomerList({
  customers,
  onDelete,
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
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
        <Customer
          modalShowUpdate={modalShowUpdate}
          setModalShowUpdate={setModalShowUpdate}
          modalShowRemove={modalShowRemove}
          setModalShowRemove={setModalShowRemove}
        ></Customer>
        {/* {customers.map((customer, i) => <Customer customer={customer}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i} />)} */}
      </tbody>
    </Table>
  );
}

export default CustomerList;
