import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";

let customerID, firstName, lastName, emailAddress, phoneNumber;

const updateCustomer = async (e) => {
  e.preventDefault();
  console.log(firstName, lastName, emailAddress, phoneNumber);

  let data = {
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    phoneNumber: phoneNumber};

  // On submit of the form, send a POST request with the data to the server.
  const response = await fetch("http://localhost:8000/updatecustomer", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 201) {
    alert("Successfully updated the Customer!");
  } else {
    alert(`Failed to add customer, status code = ${response.status}`);
  }
};

function UpdateModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="update-customer">
          Update Customer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <h4>First Name</h4>
      <input type="text"
      value = {firstName}
      // onChange={(e) => setFirstName(e.target.value)}
      ></input>
      <h4>Last Name</h4>
      <input type="text"
      value = {lastName}
      // onChange={(e) => setLastName(e.target.value)}
      ></input>
      <h4>Email Address</h4>
      <input type="email"
      value = {emailAddress}
      // onChange={(e) => setEmailAddress(e.target.value)}
      ></input>
      <h4>Phone Number (XXX-XXX-XXXX)</h4>
      <input type="text"
      value = {phoneNumber}
      // onChange={(e) => setPhoneNumber(e.target.value)}
      ></input>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={(e)=> {
        props.onHide();
        updateCustomer(e);
      }}>Update</Button>
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
        <Modal.Title id="delete-customer">
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
