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
          <th>Invoice ID</th>
          <th>Reservation ID</th>
          <th>Invoice Amount</th>
          <th>Credit Card on File</th>
          <th>Due Date</th>
          <th>Invoice Paid</th>
          <th>Edit Invoice </th>
          <th>Delete Invoice </th>
        </thead>
        <tbody>
          {invoices?.map((invoice, i) => (
            <Invoice
              modalShowUpdate={modalShowUpdate}
              setModalShowUpdate={setModalShowUpdate}
              modalShowRemove={modalShowRemove}
              setModalShowRemove={setModalShowRemove}
              invoice={invoice}
            ></Invoice>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default InvoiceList;
