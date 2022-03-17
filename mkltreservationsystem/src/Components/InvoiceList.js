import React from "react";
import Invoice from "./Invoice";
import { Table } from "react-bootstrap";

function InvoiceList({
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
  onEdit,
  onDelete,
  invoices,
}) {
  return (
    <div>
      <h1> Invoices</h1>
      <Table id="Invoices" className="borderless">
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Reservation ID</th>
            <th>Invoice Amount</th>
            <th>Credit Card on File</th>
            <th>Due Date</th>
            <th>Invoice Paid</th>
            <th>Edit Invoice </th>
            <th>Delete Invoice </th>
          </tr>
        </thead>
        <tbody>
          {invoices?.map((invoice, i) => (
            <Invoice
              key={i}
              modalShowUpdate={modalShowUpdate}
              setModalShowUpdate={setModalShowUpdate}
              modalShowRemove={modalShowRemove}
              setModalShowRemove={setModalShowRemove}
              onEdit={onEdit}
              onDelete={onDelete}
              invoice={invoice}
            ></Invoice>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default InvoiceList;
