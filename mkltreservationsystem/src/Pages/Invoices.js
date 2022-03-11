import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";
import InvoiceList from "../Components/InvoiceList";
import { useEffect, useState } from "react";

import React from "react";

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
        <input type="date"></input>
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

  const [invoiceToEdit, setInvoiceToEdit] = useState(" ");
  const [invoiceToDelete, setInvoiceToDelete] = useState(" ");

  const loadInvoices = async () => {
    const response = await fetch("http://localhost:8000/displayinvoices");
    const invoices = await response.json();
    setInvoices(invoices);
  };
  useEffect(() => {
    loadInvoices();
  }, []);

  function UpdateModal(props) {
    const [invoiceID, setInvoiceID] = useState(0);
    const [reservationID, setReservationID] = useState(0);
    const [invoiceAmount, setInvoiceAmount] = useState(0);
    const [creditCard, setCreditCard] = useState(0);
    const [dueDate, setDueDate] = useState(0);
    const [invoicePaid, setInvoicePaid] = useState(0);

    let invoiceID1 = 0;
    let reservationID1 = 0;
    let invoiceAmount1 = 0;
    let creditCard1 = 0;
    let dueDate1 = 0;
    let invoicePaid1 = 0;

    if (props.invoiceToEdit) {
      invoiceID1 = props.invoiceToEdit.invoiceID;
      reservationID1 = props.invoiceToEdit.reservationID;
      invoiceAmount1 = props.invoiceToEdit.invoiceAmount;
      creditCard1 = props.invoiceToEdit.creditCard;
      dueDate1 = props.invoiceToEdit.dueDate;
      invoicePaid1 = props.invoiceToEdit.invoicePaid;
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Invoice {invoiceID1}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Invoice Amount</h4>
          <input value={invoiceAmount1} className="greyedOut"></input>
          <input type="number"></input>
          <h4>Credit Card</h4>
          <input value={creditCard1} className="greyedOut"></input>
          <input type="text"></input>
          <h4>Due Date</h4>
          <input value={dueDate1} className="greyedOut"></input>
          <input type="date"></input>
          <h4> Invoice Paid </h4>
          <input value={invoicePaid1} className="greyedOut"></input>

          <select>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Update</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const onDelete = async (invoiceToDelete) => {
    setInvoiceToDelete(invoiceToDelete);
    console.log("this is invoiceToDelete", invoiceToDelete);
    setModalShowRemove(true);
    loadInvoices();
  };

  function RemoveInvoiceModal(props) {
    console.log(props.invoiceToDelete.invoiceID);
    let invoiceID = 0;
    let reservationID = 0;
    let invoiceAmount = 0;
    if (props.invoiceToDelete) {
      invoiceID = props.invoiceToDelete.invoiceID;
      reservationID = props.invoiceToDelete.reservationID;
      invoiceAmount = props.invoiceToDelete.invoiceAmount;
    }

    const submitButton = async (e) => {
      e.preventDefault();
      console.log(invoiceID);

      // On submit of the form, send a DELETE request with the ID to the server.
      let data = {
        invoiceID: invoiceID,
      };

      const response = await fetch("http://localhost:8000/deleteinvoice", {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        alert("Successfully deleted the Invoice!");
        console.log(props);
        loadInvoices();
      } else {
        alert(`Failed to delete the invoice, status code = ${response.status}`);
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
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Invoice
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          Are you sure you want to delete this invoice: ID #{invoiceID},
          Reservation ID #{reservationID}, invoice amount ${invoiceAmount}?{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => {
              submitButton(e);
              props.onHide();
            }}
          >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

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
            type="number"
            value={reservationID}
            onChange={(e) => setReservationID(e.target.value)}
          ></input>
          <h4>Invoice Amount</h4>
          <input
            type="number"
            value={invoiceAmount}
            onChange={(e) => setInvoiceAmount(e.target.value)}
          ></input>
          <h4>Credit Card</h4>
          <input
            type="text"
            value={creditCard}
            onChange={(e) => setCreditCard(e.target.value)}
          ></input>
          <h4>Due Date</h4>
          <input
            type="date"
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
  const onEdit = async (invoiceToEdit) => {
    setInvoiceToEdit(invoiceToEdit);
    console.log(invoiceToEdit);
    setModalShowUpdate(true);
  };

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
        onEdit={onEdit}
        onDelete={onDelete}
        invoices={invoices}
      ></InvoiceList>
      <RemoveInvoiceModal
        invoiceToDelete={invoiceToDelete}
        show={modalShowRemove}
        onHide={() => setModalShowRemove(false)}
      />
      <UpdateModal
        invoiceToEdit={invoiceToEdit}
        show={modalShowUpdate}
        onHide={() => setModalShowUpdate(false)}
      />
    </div>
  );
}

export default Invoices;
