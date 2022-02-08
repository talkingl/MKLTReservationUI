import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
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
          Add Employee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>employeeID</h4>
        <input></input>
        <h4>firstName</h4>
        <input></input>
        <h4>lastName</h4>
        <input></input>
        <h4>shiftWorked</h4>
        <input></input>
        <h4>payRatess</h4>
        <input></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}

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
          Delete Employee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Which employee do you want to remove? </h4>
        <input></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Remove</Button>
      </Modal.Footer>
    </Modal>
  );
}

function UpdateModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Rooms
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Which employee do you want to update? </h4>
        <input></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
}
function Employees() {
  const [modalShowAdd, setModalShowAdd] = React.useState(false);
  const [modalShowRemove, setModalShowRemove] = React.useState(false);
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
  return (
    <div>
      <h1> Employees</h1>
      <Table id="Employees" className="borderless">
        <thead>
          <th>employeeID</th>
          <th>firstName</th>
          <th> lastName</th>
          <th>shiftWorked</th>
          <th> payRate</th>
        </thead>
        <tbody>
          <td>1</td>
          <td>Logan</td>
          <td> Talkington</td>
          <td>Night</td>
          <td> $42.22</td>
        </tbody>
      </Table>
      <button className="crud-buttons" onClick={() => setModalShowAdd(true)}>
        Add
      </button>
      <AddModal show={modalShowAdd} onHide={() => setModalShowAdd(false)} />
      <button className="crud-buttons" onClick={() => setModalShowRemove(true)}>
        Delete
      </button>
      <RemoveModal
        show={modalShowRemove}
        onHide={() => setModalShowRemove(false)}
      />
      <button className="crud-buttons" onClick={() => setModalShowUpdate(true)}>
        Update
      </button>
      <UpdateModal
        show={modalShowUpdate}
        onHide={() => setModalShowUpdate(false)}
      />
    </div>
  );
}

export default Employees;
