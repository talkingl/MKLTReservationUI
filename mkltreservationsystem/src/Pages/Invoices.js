import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";
import InvoiceList from "../Components/InvoiceList";
import { useEffect, useState } from "react";

import React from "react";

function RemoveModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Invoice
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Which invoice do you want to remove? </h4>
        <input></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Remove</Button>
      </Modal.Footer>
    </Modal>
  );
}

function SearchModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Search Invoices
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Enter a due date to search for invoices</h2>
        <h4>Due Date</h4>
        <input></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Search</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Invoices() {
  const [modalShowAdd, setModalShowAdd] = React.useState(false);
  const [modalShowRemove, setModalShowRemove] = React.useState(false);
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
  const [modalShowSearch, setModalShowSearch] = React.useState(false);
  const [invoices, setInvoices] = useState();

  const loadInvoices = async () => {
    const response = await fetch("http://localhost:8000/displayinvoices");
    const invoices = await response.json();
    setInvoices(invoices);
  };
  useEffect(() => {
    loadInvoices();
  }, []);

  function AddModal(props) {
    const [reservationID, setReservationID] = useState();
    const [invoiceAmount, setInvoiceAmount] = useState();
    const [creditCard, setCreditCard] = useState();
    const [dueDate, setDueDate] = useState();
    const [invoicePaid, setInvoicePaid] = useState();
    const submitButton = async (e) => {
      e.preventDefault();
      console.log(
        reservationID,
        invoiceAmount,
        creditCard,
        dueDate,
        invoicePaid
      );

      let data = {
        reservationID: reservationID,
        invoiceAmount: invoiceAmount,
        creditCard: creditCard,
        dueDate: dueDate,
        invoicePaid: invoicePaid,
      };

      // On submit of the form, send a POST request with the data to the server.
      const response = await fetch("http://localhost:8000/createinvoice", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        alert("Successfully added the Invoice!");
        loadInvoices();
      } else {
        alert(`Failed to add invoice, status code = ${response.status}`);
        loadInvoices();
      }
    };
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="add-customer">Add Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Reservation ID</h4>
          <input
            value={reservationID}
            onChange={(e) => setReservationID(e.target.value)}
          ></input>
          <h4>Invoice Amount</h4>
          <input
            value={invoiceAmount}
            onChange={(e) => setInvoiceAmount(e.target.value)}
          ></input>
          <h4>Credit Card</h4>
          <input
            value={creditCard}
            onChange={(e) => setCreditCard(e.target.value)}
          ></input>
          <h4>Due Date</h4>
          <input
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          ></input>
          <h4>Invoice Paid </h4>
          <select
            value={invoicePaid}
            onChange={(e) => setInvoicePaid(e.target.value)}
          >
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => {
              props.onHide();
              submitButton(e);
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div>
      <button className="crud-buttons" onClick={() => setModalShowAdd(true)}>
        Add
      </button>
      <AddModal show={modalShowAdd} onHide={() => setModalShowAdd(false)} />
      <button className="crud-buttons" onClick={() => setModalShowSearch(true)}>
        Search
      </button>
      <SearchModal
        show={modalShowSearch}
        onHide={() => setModalShowSearch(false)}
      />
      <InvoiceList
        modalShowUpdate={modalShowUpdate}
        setModalShowUpdate={setModalShowUpdate}
        modalShowRemove={modalShowRemove}
        setModalShowRemove={setModalShowRemove}
        invoices={invoices}
      ></InvoiceList>
    </div>
  );
}

export default Invoices;
