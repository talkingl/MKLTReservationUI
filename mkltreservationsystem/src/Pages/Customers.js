import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import CustomerList from "../Components/CustomerList";
import { Link } from "react-router-dom";
import React from "react";

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
        <h4>firstName</h4>
        <input></input>
        <h4>lastName</h4>
        <input></input>
        <h4>emailAddress</h4>
        <input></input>
        <h4>phoneNumber</h4>
        <input></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}

function onEdit(customer) { 
  // Want to pre-fill the input fields with that customer's info. Need more research
  // Need to actually make the change happen when the button is clicked
  // Need to trigger this based on clicking the edit button nested a few .js files down
  return (
    <Modal>
      <Modal.Header closeButton>
        <Modal.Title id="EditCustomer">
          Update Customer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>firstName</h4>
        <input></input>
        <h4>lastName</h4>
        <input></input>
        <h4>emailAddress</h4>
        <input></input>
        <h4>phoneNumber</h4>
        <input></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hideModal}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
}
function Customers() {
  const [customers, setCustomers] = React.useState([]);
  const [modalShowAdd, setModalShowAdd] = React.useState(false);
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false);

  const onDelete = ID =>{
    // SQL delete the record
    setCustomers(customers.filter(e => e.customerID !== ID));
  };

  const loadCustomers = async () => {
    const response = await fetch('/exercises'); 
    const resp_data = await response.json();
    setExercises(resp_data);
  };

  // SQL SELECT Statement to get customers
  setCustomers(response);

  // Add a search function
  return (
    <div>
      <h1> Customers</h1>
      <CustomerList customers={customers} onDelete={onDelete} onEdit={onEdit}></CustomerList>
      <button className="crud-buttons" onClick={() => setModalShowAdd(true)}>
        Add
      </button>
      <AddModal show={modalShowAdd} onHide={() => setModalShowAdd(false)} />
    </div>
  );
}

export default Customers;
