import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";
import React from "react";
import EmployeeList from "../Components/EmployeeList";
import { useState, useEffect, useRef } from "react";

function Employees() {
  const [modalShowAdd, setModalShowAdd] = React.useState(false);
  const [modalShowRemove, setModalShowRemove] = React.useState(false);
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
  const [modalShowSearch, setModalShowSearch] = React.useState(false);
  const [employees, setEmployees] = useState();
  const [employeesMax, setEmployeesMax] = useState(0);
  const [employeeToEdit, setEmployeeToEdit] = useState(" ");
  const [employeeToDelete, setEmployeeToDelete] = useState(" ");

  const loadEmployees = async () => {
    const response = await fetch(
      "http://flip2.engr.oregonstate.edu:9100/displayemployees"
    );
    const employees = await response.json();

    setEmployees(employees);
  };
  useEffect(() => {
    loadEmployees();
  }, []);

  function SearchModal(props) {
    const [employeeNameSearch, setEmployeeNameSearch] = useState();

    const submitButton = async (e) => {
      e.preventDefault();

      let data = { employeeNameSearch: employeeNameSearch };

      // On submit of the form, send a GET request with the date to the server
      const response = await fetch(
        `http://flip2.engr.oregonstate.edu:9100/displayemployees/filter/${employeeNameSearch}`,
        { headers: { "Content-Type": "application/json" } }
      );
      const employees = await response.json();
      setEmployees(employees);
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
            Search Employees
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Enter a name to search for an Employee</h2>
          <h4>Employee Name</h4>
          <input
            type="text"
            value={employeeNameSearch}
            onChange={(e) => setEmployeeNameSearch(e.target.value)}
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
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [shiftWorked, setShiftWorked] = useState();
    const [payRate, setPayRate] = useState();

    const submitButton = async (e) => {
      e.preventDefault();
      if (firstName === undefined || lastName === undefined) {
        if (firstName === undefined) {
          alert("invalid entry, please correct the first name");
        }
        if (lastName === undefined) {
          alert("invalid entry, please correct the last name");
        }
      } else {
        props.onHide();
        let data = {
          firstName: firstName,
          lastName: lastName,
          shiftWorked: shiftWorked,
          payRate: payRate,
        };

        // On submit of the form, send a POST request with the data to the server.
        const response = await fetch(
          "http://flip2.engr.oregonstate.edu:9100/createemployee",
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200 || response.status === 201) {
          alert("Successfully added the Employee!");
          loadEmployees();
        } else {
          alert(`Failed to add employee, status code = ${response.status}`);
          loadEmployees();
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
          <Modal.Title id="contained-modal-title-vcenter">
            Add Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>First Name</h4>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
          <h4>Last Name</h4>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></input>
          <h4>Shift Worked</h4>
          <select
            value={shiftWorked}
            onChange={(e) => setShiftWorked(e.target.value)}
          >
            <option value="0"></option>
            <option value="1">First Shift</option>
            <option value="2">Second Shift</option>
            <option value="3">Third Shift</option>
          </select>
          <h4>Pay Rate</h4>
          <input
            type="number"
            value={payRate}
            onChange={(e) => setPayRate(e.target.value)}
          ></input>
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

  function UpdateModal(props) {
    const [employeeID, setEmployeeID] = useState(0);
    const [firstName, setFirstName] = useState(0);
    const [lastName, setLastName] = useState(0);
    const [shiftWorked, setShiftWorked] = useState(0);
    const [payRate, setPayRate] = useState("");
    const [checkedFirstName, setCheckedFirstName] = useState(false);
    const [checkedLastName, setCheckedLastName] = useState(false);
    const [checkedShiftWorked, setCheckedShiftWorked] = useState(false);
    const [checkedPayRate, setCheckedPayRate] = useState(false);
    let employeeID1 = 0;
    let firstName1 = 0;
    let lastName1 = 0;
    let shiftWorked1 = undefined;
    let payRate1 = undefined;

    if (props.employeeToEdit) {
      employeeID1 = props.employeeToEdit.employeeID;
      firstName1 = props.employeeToEdit.firstName;
      lastName1 = props.employeeToEdit.lastName;
      shiftWorked1 = props.employeeToEdit.shiftWorked;
      payRate1 = props.employeeToEdit.payRate;
    }
    const submitButton = async (e) => {
      e.preventDefault();

      // On submit of the form, send a POST request with the data to the server.

      let data = {
        employeeID: employeeID1,
        firstName: firstName,
        lastName: lastName,
        shiftWorked: shiftWorked,
        payRate: payRate,
      };
      const response = await fetch(
        "http://flip2.engr.oregonstate.edu:9100/updateemployees",
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        alert("Successfully updated the Employee!");
        loadEmployees();
      } else {
        alert(
          `Failed to update the employee, status code = ${response.status}`
        );
        loadEmployees();
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
            Update Employee {employeeID1}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>First Name</h4>
          <input value={firstName1} className="greyedOut"></input>

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></input>

          <input
            type="checkbox"
            className="checkbox-form"
            onClick={() => {
              if (checkedFirstName === false) {
                setCheckedFirstName(true);
                if (props.employeeToEdit) {
                  setFirstName(firstName1);
                }
              } else {
                setCheckedFirstName(false);
                setFirstName(0);
              }
            }}
          ></input>
          <h4>Last Name</h4>
          <input value={lastName1} className="greyedOut"></input>

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></input>
          <input
            type="checkbox"
            className="checkbox-form"
            onClick={() => {
              if (checkedLastName === false) {
                setCheckedLastName(true);
                if (props.employeeToEdit) {
                  setLastName(lastName1);
                }
              } else {
                setCheckedLastName(false);
                setLastName(0);
              }
            }}
          ></input>
          <h4>Shift Worked</h4>
          <input value={shiftWorked1} className="greyedOut"></input>

          <select onChange={(e) => setShiftWorked(e.target.value)}>
            <option value="0"> </option>
            <option value="1">First Shift</option>
            <option value="2">Second Shift</option>
            <option value="3">Third Shift</option>
          </select>
          <input
            type="checkbox"
            className="checkbox-form"
            onClick={() => {
              if (checkedShiftWorked === false) {
                setCheckedShiftWorked(true);
                let newShift = 0;
                if (props.employeeToEdit) {
                  if (shiftWorked1 === 1) {
                    newShift = "first shift";
                  } else if (shiftWorked1 == 2) {
                    newShift = "Second Shift";
                  } else if (shiftWorked == 3) {
                    newShift = "third shift";
                  } else {
                    newShift = "no shift";
                  }
                  setShiftWorked(newShift);
                }
              } else {
                setCheckedShiftWorked(false);
                setShiftWorked(0);
              }
            }}
          ></input>
          <h4>Pay Rate</h4>
          <input value={payRate1} className="greyedOut"></input>

          <input
            type="number"
            value={payRate}
            onChange={(e) => setPayRate(e.target.value)}
          ></input>
          <input
            type="checkbox"
            className="checkbox-form"
            onClick={() => {
              if (checkedPayRate === false) {
                setCheckedPayRate(true);
                if (props.employeeToEdit) {
                  setPayRate(payRate1);
                }
              } else {
                setCheckedPayRate(false);
                setPayRate(0);
              }
            }}
          ></input>
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
  const onEdit = async (employeeToEdit) => {
    setEmployeeToEdit(employeeToEdit);
    setModalShowUpdate(true);
  };
  const onDelete = async (employeeToDelete) => {
    setEmployeeToDelete(employeeToDelete);
    setModalShowRemove(true);
    loadEmployees();
  };

  function RemoveModal(props) {
    let employeeID = 0;
    let firstName = 0;
    let lastName = 0;
    if (props.employeeToDelete) {
      employeeID = props.employeeToDelete.employeeID;
      firstName = props.employeeToDelete.firstName;
      lastName = props.employeeToDelete.lastName;
    }

    const submitButton = async (e) => {
      e.preventDefault();

      // On submit of the form, send a DELETE request with the ID to the server.
      let data = {
        employeeID: employeeID,
      };

      const response = await fetch(
        "http://flip2.engr.oregonstate.edu:9100/deleteemployee",
        {
          method: "DELETE",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        alert("Successfully deleted the Employee!");
        loadEmployees();
      } else {
        alert(
          `Failed to delete the employee, status code = ${response.status}`
        );
        loadEmployees();
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
            Delete Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          Are you sure you want to delete this employee: ID #{employeeID}, Name:{" "}
          {firstName} {lastName}?{" "}
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
      <EmployeeList
        modalShowUpdate={modalShowUpdate}
        setModalShowUpdate={setModalShowUpdate}
        modalShowRemove={modalShowRemove}
        setModalShowRemove={setModalShowRemove}
        onEdit={onEdit}
        onDelete={onDelete}
        employees={employees}
      ></EmployeeList>
      <UpdateModal
        employeeToEdit={employeeToEdit}
        show={modalShowUpdate}
        onHide={() => setModalShowUpdate(false)}
      />
      <RemoveModal
        employeeToDelete={employeeToDelete}
        show={modalShowRemove}
        onHide={() => setModalShowRemove(false)}
      />
    </div>
  );
}

export default Employees;
