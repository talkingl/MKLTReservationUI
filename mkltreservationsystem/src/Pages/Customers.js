import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import CustomerList from "../Components/CustomerList";
import { Link } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";

function AddModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Customer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>First Name</h4>
        <input type="text" id="fname" name="fname"></input>
        <h4>Last Name</h4>
        <input type="text" id="lname" name="lname"></input>
        <h4>Email Address</h4>
        <input type="text" id="address" name="address"></input>
        <h4>Phone Number (XXX-XXX-XXXX)</h4>
        <input type="text" id="phone" name="phone"></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Add</Button>
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
          Search Customers
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2> Enter any of the following to search for a Customer</h2>
        <h4>Customer ID</h4>
        <input type="number" id="id" name="id"></input>
        <h4>First Name</h4>
        <input type="text" id="fname" name="fname"></input>
        <h4>Last Name</h4>
        <input type="text" id="lname" name="lname"></input>
        <h4>Email Address</h4>
        <input type="text" id="address" name="address"></input>
        <h4>Phone Number (XXX-XXX-XXXX)</h4>
        <input type="text" id="phone" name="phone"></input>
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
      <AddModal show={modalShowAdd} onHide={() => setModalShowAdd(false)} />
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
