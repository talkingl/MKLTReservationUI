import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";

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
          Update Customer
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
        <Button onClick={props.onHide}>Update</Button>
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
          Delete Customer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4> Are you sure you want to delete this customer? </h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Remove</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Customer({
  customer,
  onDelete,
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
}) {
  return (
    <tr>
      <td>{customer.customerID}</td>
      <td>{customer.firstName}</td>
      <td>{customer.lastName}</td>
      <td>{customer.emailAddress}</td>
      <td>{customer.phoneNumber}</td>

      <td>
        <MdEdit onClick={() => setModalShowUpdate(true)} />
        <UpdateModal
          show={modalShowUpdate}
          onHide={() => setModalShowUpdate(false)}
        />
      </td>
      <td>
        <MdDelete onClick={() => setModalShowRemove(true)} />
        <RemoveModal
          show={modalShowRemove}
          onHide={() => setModalShowRemove(false)}
        />
      </td>
    </tr>
  );
}

export default Customer;
