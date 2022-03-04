import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";
import React from "react";
import EmployeeList from "../Components/EmployeeList";
import { useState, useEffect } from "react";


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
          Search Employees
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2> Enter any of the following to search for an Employee</h2>
        <h4>Employee ID</h4>
        <input></input>
        <h4>First Name</h4>
        <input></input>
        <h4>Last Name</h4>
        <input></input>
        <h4>Shift Worked</h4>
        <input></input>
        <h4>Pay Rates</h4>
        <input></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Search</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Employees() {
  const [modalShowAdd, setModalShowAdd] = React.useState(false);
  const [modalShowRemove, setModalShowRemove] = React.useState(false);
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
  const [modalShowSearch, setModalShowSearch] = React.useState(false);
  const [employees, setEmployees] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [shiftWorked, setShiftWorked] = useState();
  const [payRate, setPayRate] = useState();

  const loadEmployees = async () => {
    const response = await fetch("http://localhost:8000/displayemployees");
    const employees = await response.json();
    setEmployees(employees);
  };
  useEffect(() => {
    loadEmployees();
  }, []);

  const submitButton = async (e) => {
    e.preventDefault();
    console.log(firstName, lastName, shiftWorked, payRate);

    let data = {
      firstName: firstName,
      lastName: lastName,
      shiftWorked: shiftWorked,
      payRate: payRate};

    // On submit of the form, send a POST request with the data to the server.
    const response = await fetch("http://localhost:8000/createemployee", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      alert("Successfully added the Employee!");
    } else {
      alert(`Failed to add employee, status code = ${response.status}`);
    }
  };

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
            Add Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>First Name</h4>
          <input
          value = {firstName}
          onChange={(e) => setFirstName(e.target.value)}
          ></input>
          <h4>Last Name</h4>
          <input
          value = {lastName}
          onChange={(e) => setLastName(e.target.value)}
          ></input>
          <h4>Shift Worked</h4>
          <input
          value = {shiftWorked}
          onChange={(e) => setShiftWorked(e.target.value)}
          ></input>
          <h4>Pay Rate</h4>
          <input
          value = {payRate}
          onChange={(e) => setPayRate(e.target.value)}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e)=> {
            props.onHide();
            submitButton(e);
          }}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div>
      <EmployeeList
        modalShowUpdate={modalShowUpdate}
        setModalShowUpdate={setModalShowUpdate}
        modalShowRemove={modalShowRemove}
        setModalShowRemove={setModalShowRemove}
        employees={employees}
      ></EmployeeList>
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

export default Employees;
