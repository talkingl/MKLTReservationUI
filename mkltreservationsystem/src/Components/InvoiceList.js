import React from "react";
import Invoice from "./Invoice";
import { Table } from "react-bootstrap";

function InvoiceList({
  invoices,
  onDelete,
  onEdit,
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
}) {
  return (
    <div>
      <h1> Invoices</h1>
      <Table id="Invoices" className="borderless">
        <thead>
          <th>invoiceID</th>
          <th>reservationID</th>
          <th> invoiceAmount</th>
          <th> creditCard </th>
          <th> dueDate</th>
          <th> invoicePaid</th>
          <th> Edit Invoice </th>
          <th> Delete Invoice </th>
        </thead>
        <tbody>
          <Invoice
            modalShowUpdate={modalShowUpdate}
            setModalShowUpdate={setModalShowUpdate}
            modalShowRemove={modalShowRemove}
            setModalShowRemove={setModalShowRemove}
          ></Invoice>
        </tbody>
      </Table>
    </div>
  );
}

export default InvoiceList;
