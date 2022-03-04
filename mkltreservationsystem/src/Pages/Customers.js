import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import CustomerList from "../Components/CustomerList";
import { Link } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";

function SearchModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="search-customers">Search Customers</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2> Enter any of the following to search for a Customer</h2>
        <h4>Customer ID</h4>
        <input></input>
        <h4>First Name</h4>
        <input></input>
        <h4>Last Name</h4>
        <input></input>
        <h4>Email Address</h4>
        <input></input>
        <h4>Phone Number (XXX-XXX-XXXX)</h4>
        <input></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Search</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Customers() {
  const [customers, setCustomers] = React.useState([]);
  const [modalShowRemove, setModalShowRemove] = React.useState(false);
  const [modalShowAdd, setModalShowAdd] = React.useState(false);
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
  const [modalShowSearch, setModalShowSearch] = React.useState(false);

  const loadCustomers = async () => {
    const response = await fetch("http://localhost:8000/displaycustomers");
    const customers = await response.json();
    setCustomers(customers);
  };
  useEffect(() => {
    loadCustomers();
  }, []);

  function AddModal(props) {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [emailAddress, setEmailAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const submitButton = async (e) => {
      e.preventDefault();
      console.log(firstName, lastName, emailAddress, phoneNumber);

      let data = {
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        phoneNumber: phoneNumber,
      };

      // On submit of the form, send a POST request with the data to the server.
      const response = await fetch("http://localhost:8000/createcustomer", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        alert("Successfully added the Customer!");
        loadCustomers();
      } else {
        alert(`Failed to add customer, status code = ${response.status}`);
        loadCustomers();
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
          <Modal.Title id="add-customer">Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>First Name</h4>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
          <h4>Last Name</h4>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></input>
          <h4>Email Address</h4>
          <input
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          ></input>
          <h4>Phone Number (XXX-XXX-XXXX)</h4>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></input>
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

  const onDelete = (ID) => {
    // SQL delete the record
    setCustomers(customers.filter((e) => e.customerID !== ID));
  };

  // SQL SELECT Statement to get customers
  // setCustomers(response);

  // Add a search function
  return (
    <div>
      <h1> Customers</h1>
      <CustomerList
        customers={customers}
        onDelete={onDelete}
        modalShowUpdate={modalShowUpdate}
        setModalShowUpdate={setModalShowUpdate}
        modalShowRemove={modalShowRemove}
        setModalShowRemove={setModalShowRemove}
        customers={customers}
      ></CustomerList>
      <button className="crud-buttons" onClick={() => setModalShowAdd(true)}>
        Add
      </button>
      <AddModal
        loadCustomers={loadCustomers}
        show={modalShowAdd}
        onHide={() => setModalShowAdd(false)}
      />
      <button className="crud-buttons" onClick={() => setModalShowSearch(true)}>
        Search
      </button>
      <SearchModal
        show={modalShowSearch}
        onHide={() => setModalShowSearch(false)}
      />
    </div>
  );
}

export default Customers;
