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
          Add Invoice
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>reservationID</h4>
        <input></input>
        <h4>invoiceAmount</h4>
        <input></input>
        <h4>creditCard</h4>
        <input></input>
        <h4>dueDate</h4>
        <input></input>
        <h4> invoicePaid </h4>
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
          Delete Invoice
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Which invoice do you want to remove? </h4>
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
          Update Invoice
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Which invoice do you want to update? </h4>
        <input></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
}
function Invoices() {
  const [modalShowAdd, setModalShowAdd] = React.useState(false);
  const [modalShowRemove, setModalShowRemove] = React.useState(false);
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
  return (
    <div>
      <h1> Invoices</h1>
      <Table id="Invoices" className="borderless">
        <thead>
          <th>invoiceID</th>
          <th>reservationID</th>
          <th> invoiceAmount</th>
          <th> creditCard </th>
          <th> dueDate</th>
          <th> invoicePaid</th>
        </thead>
        <tbody>
          <td>1</td>
          <td>1</td>
          <td> 855.52</td>
          <td>123456789</td>
          <td> 3/1/22</td>
          <td> No</td>
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

export default Invoices;
