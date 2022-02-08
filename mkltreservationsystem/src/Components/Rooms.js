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
        <Modal.Title id="contained-modal-title-vcenter">Add Rooms</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>roomID</h4>
        <input></input>
        <h4>roomFloor</h4>
        <input></input>
        <h4>roomNumber</h4>
        <input></input>
        <h4>roomType</h4>
        <input></input>
        <h4>roomPrice</h4>
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
        <h4>Which room do you want to remove? </h4>
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
        <h4>Which room do you want to update? </h4>
        <input></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
}
function Rooms() {
  const [modalShowAdd, setModalShowAdd] = React.useState(false);
  const [modalShowRemove, setModalShowRemove] = React.useState(false);
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
  return (
    <div>
      <h1> Rooms</h1>
      <Table id="Rooms" className="borderless">
        <thead>
          <th>roomID</th>
          <th>roomFloor</th>
          <th> roomNumber</th>
          <th>roomType</th>
          <th> roomPrice</th>
        </thead>
        <tbody>
          <td>1</td>
          <td>1</td>
          <td> 101</td>
          <td>King</td>
          <td> 400.00</td>
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

export default Rooms;
