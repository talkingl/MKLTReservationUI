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
          Add Reservation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>customerID</h4>
        <input></input>
        <h4>employeeID</h4>
        <input></input>
        <h4>checkInDate</h4>
        <input></input>
        <h4>stayLength</h4>
        <input></input>
        <h4>checkedIn</h4>
        <input></input>
        <h4>checkedOut</h4>
        <input></input>
        <h4>specialRequest</h4>
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
          Delete Rooms
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Which reservation do you want to remove? </h4>
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
          Update Reservation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Which reservation do you want to update? </h4>
        <input></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
}
function Reservations() {
  const [modalShowAdd, setModalShowAdd] = React.useState(false);
  const [modalShowRemove, setModalShowRemove] = React.useState(false);
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
  return (
    <div>
      <h1> Reservations</h1>
      <Table id="Reservations" className="borderless">
        <thead>
          <th>reservationID</th>
          <th>customerID</th>
          <th> employeeID</th>
          <th>checkInDate</th>
          <th> stayLength</th>
          <th> checkedIn</th>
          <th> checkedOut</th>
          <th> specialRequest</th>
        </thead>
        <tbody>
          <td>1</td>
          <td>1</td>
          <td> 1</td>
          <td> 2/1/2022</td>
          <td> 3</td>
          <td> Y</td>
          <td>N</td>
          <td> No </td>
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

export default Reservations;
