import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";
import InvoiceList from "../Components/InvoiceList";
import { useEffect, useState } from "react";

import React from "react";

function Invoices() {
  const [modalShowAdd, setModalShowAdd] = React.useState(false);
  const [modalShowRemove, setModalShowRemove] = React.useState(false);
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
  const [modalShowSearch, setModalShowSearch] = React.useState(false);
  const [invoices, setInvoices] = useState();

  const [invoiceToEdit, setInvoiceToEdit] = useState(" ");
  const [invoiceToDelete, setInvoiceToDelete] = useState(" ");

  const loadInvoices = async () => {
    const response = await fetch(
      "http://flip2.engr.oregonstate.edu:9100/displayinvoices"
    );
    const invoices = await response.json();
    setInvoices(invoices);
  };
  useEffect(() => {
    loadInvoices();
  }, []);

  // Reservation List for dropdowns
  const [reservationList, setReservationList] = useState();
  const loadReservationList = async () => {
    const response = await fetch(
      "http://flip2.engr.oregonstate.edu:9100/listreservations",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const reservations = await response.json();
    setReservationList(reservations);
  };
  useEffect(() => {
    loadReservationList();
  }, []);

  function UpdateModal(props) {
    const [invoiceID, setInvoiceID] = useState(0);
    const [reservationID, setReservationID] = useState(0);
    const [invoiceAmount, setInvoiceAmount] = useState(0);
    const [creditCard, setCreditCard] = useState("");
    const [dueDate, setDueDate] = useState(0);
    const [invoicePaid, setInvoicePaid] = useState(0);
    const [checkedReservationID, setCheckedReservationID] = useState(false);
    const [checkedInvoiceAmount, setCheckedInvoiceAmount] = useState(false);
    const [checkedCreditCard, setCheckedCreditCard] = useState(false);
    const [checkedDueDate, setCheckedDueDate] = useState(false);
    const [checkedInvoicePaid, setCheckedInvoicePaid] = useState(false);

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
      dueDate1 = props.invoiceToEdit.dueDate !== undefined
        ? props.invoiceToEdit.dueDate.split("T")[0]
        : props.invoiceToEdit.dueDate;
      invoicePaid1 = props.invoiceToEdit.invoicePaid;
    }
    const submitButton = async (e) => {
      e.preventDefault();

      // On submit of the form, send a POST request with the data to the server.

      let data = {
        invoiceID: invoiceID1,
        invoiceAmount: invoiceAmount,
        creditCard: creditCard,
        dueDate: dueDate,
        invoicePaid: invoicePaid,
      };
      const response = await fetch(
        "http://flip2.engr.oregonstate.edu:9100/updateinvoices",
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        alert("Successfully updated the Invoice!");
        loadInvoices();
      } else {
        alert(`Failed to update the invoice, status code = ${response.status}`);
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
            Update Invoice {invoiceID1}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Invoice Amount</h4>
          <input value={invoiceAmount1} className="greyedOut"></input>
          <input
            type="number"
            value={invoiceAmount}
            onChange={(e) => setInvoiceAmount(e.target.value)}
          ></input>
          <input
            type="checkbox"
            className="checkbox-form"
            onClick={() => {
              if (checkedInvoiceAmount === false) {
                setCheckedInvoiceAmount(true);
                if (props.invoiceToEdit) {
                  setInvoiceAmount(invoiceAmount1);
                }
              } else {
                setCheckedInvoiceAmount(false);
                setInvoiceAmount(0);
              }
            }}
          ></input>
          <h4>Credit Card</h4>
          <input value={creditCard1} className="greyedOut"></input>
          <input
            type="text"
            value={creditCard}
            onChange={(e) => setCreditCard(e.target.value)}
          ></input>
          <input
            type="checkbox"
            className="checkbox-form"
            onClick={() => {
              if (checkedCreditCard === false) {
                setCheckedCreditCard(true);
                if (props.invoiceToEdit) {
                  setCreditCard(creditCard1);
                }
              } else {
                setCheckedCreditCard(false);
                setCreditCard(0);
              }
            }}
          ></input>
          <h4>Due Date</h4>
          <input value={dueDate1} className="greyedOut"></input>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          ></input>
          <input
            type="checkbox"
            className="checkbox-form"
            onClick={() => {
              if (checkedDueDate === false) {
                setCheckedDueDate(true);
                if (props.invoiceToEdit) {
                  setDueDate(dueDate1);
                }
              } else {
                setCheckedDueDate(false);
                setDueDate(0);
              }
            }}
          ></input>
          <h4> Invoice Paid </h4>
          <input value={invoicePaid1} className="greyedOut"></input>

          <select onChange={(e) => setInvoicePaid(e.target.value)}>
            <option value="0"></option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => {
              submitButton(e);
              props.onHide();
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const onDelete = async (invoiceToDelete) => {
    setInvoiceToDelete(invoiceToDelete);
    setModalShowRemove(true);
    loadInvoices();
  };

  function RemoveInvoiceModal(props) {
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

      // On submit of the form, send a DELETE request with the ID to the server.
      let data = {
        invoiceID: invoiceID,
      };

      const response = await fetch(
        "http://flip2.engr.oregonstate.edu:9100/deleteinvoice",
        {
          method: "DELETE",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        alert("Successfully deleted the Invoice!");
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

  function SearchModal(props) {
    const [searchDate, setSearchDate] = useState(" ");

    const submitButton = async (e) => {
      e.preventDefault();

      let data = { searchDate: searchDate };

      // On submit of the form, send a GET request with the date to the server
      const response = await fetch(
        `http://flip2.engr.oregonstate.edu:9100/displayinvoices/filter/date/${searchDate}`,
        { headers: { "Content-Type": "application/json" } }
      );
      const invoices = await response.json();
      setInvoices(invoices);
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
            Search Invoices by Due Date
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Enter a due date to search for invoices</h2>
          <h4>Due Date</h4>
          <input
            type="date"
            onChange={(e) => setSearchDate(e.target.value)}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => {
              props.onHide();
              submitButton(e);
            }}
          >
            Search
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
      if (
        invoiceAmount === undefined ||
        dueDate === undefined ||
        invoicePaid === undefined
      ) {
        alert("yo this is messed up");
        if (invoiceAmount === undefined) {
          alert("Invoice Amount is incorrect");
        }

        if (invoicePaid === undefined) {
          alert("Invoice Paid entry is incorrect");
        }
        if (dueDate === undefined) {
          alert("Due Date is incorrect");
        }
      } else {
        props.onHide();
        e.preventDefault();

        let data = {
          reservationID: reservationID,
          invoiceAmount: invoiceAmount,
          creditCard: creditCard,
          dueDate: dueDate,
          invoicePaid: invoicePaid,
        };

        // On submit of the form, send a POST request with the data to the server.
        const response = await fetch(
          "http://flip2.engr.oregonstate.edu:9100/createinvoice",
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200 || response.status === 201) {
          alert("Successfully added the Invoice!");
          loadInvoices();
        } else {
          alert(`Failed to add invoice, status code = ${response.status}`);
          loadInvoices();
        }
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
          <h4>Choose a Reservation</h4>
          <select onChange={(e) => setReservationID(e.target.value)}>
            <option value="0"></option>
            {reservationList?.map((item) => {
              return (
                <option
                  key={item}
                  value={item.reservationID}
                  selected={item.reservationID === reservationID}
                >
                  Customer: {item.firstName} {item.lastName} Check-in on:{" "}
                  {item.checkInDate}
                </option>
              );
            })}
          </select>
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
            <option value="0"></option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => {
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
