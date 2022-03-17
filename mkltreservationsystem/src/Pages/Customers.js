import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import CustomerList from "../Components/CustomerList";
import { Link } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";

function SearchModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="search-customers">Search Customers</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Enter either an ID or a name to search for a Customer</h2>
        <h4>Customer ID</h4>
        <input type="number"></input>
        <h4>Customer Name</h4>
        <input type="text"></input>
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

  const [customerToEdit, setCustomerToEdit] = useState(" ");
  const [customerToDelete, setCustomerToDelete] = useState(" ");

  const loadCustomers = async () => {
    const response = await fetch(
      "http://flip2.engr.oregonstate.edu:9100/displaycustomers"
    );
    const customers = await response.json();
    setCustomers(customers);
  };
  useEffect(() => {
    loadCustomers();
  }, []);

  function AddModal(props) {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [emailAddress, setEmailAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const submitButton = async (e) => {
      e.preventDefault();
      console.log(firstName, lastName, emailAddress, phoneNumber);

      let data = {
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        phoneNumber: phoneNumber,
      };

      // On submit of the form, send a POST request with the data to the server.
      const response = await fetch(
        "http://flip2.engr.oregonstate.edu:9100/createcustomer",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        alert("Successfully added the Customer!");
        loadCustomers();
      } else {
        alert(`Failed to add customer, status code = ${response.status}`);
        loadCustomers();
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
          <Modal.Title id="add-customer">Add Customer</Modal.Title>
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
          <h4>Email Address</h4>
          <input
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          ></input>
          <h4>Phone Number (XXX-XXX-XXXX)</h4>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => {
              props.onHide();
              submitButton(e);
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const onEdit = async (customerToEdit) => {
    setCustomerToEdit(customerToEdit);
    console.log(customerToEdit);
    setModalShowUpdate(true);
  };
  // const onEdit = async (e) => {
  //   console.log(firstName, lastName, emailAddress, phoneNumber);

  //   let data = {
  //     firstName: firstName,
  //     lastName: lastName,
  //     emailAddress: emailAddress,
  //     phoneNumber: phoneNumber,
  //   };

  //   // On submit of the form, send a POST request with the data to the server.
  //   const response = await fetch("http://localhost:8000/updatecustomer", {
  //     method: "PUT",
  //     body: JSON.stringify(data),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   if (response.status === 200 || response.status === 201) {
  //     alert("Successfully updated the Customer!");
  //   } else {
  //     alert(`Failed to add customer, status code = ${response.status}`);
  //   }
  // };

  function UpdateModal(props) {
    console.log("this is updateModa", props);

    const [customerID, setCustomerID] = useState(0);
    const [firstName, setFirstName] = useState(0);
    const [lastName, setLastName] = useState(0);
    const [emailAddress, setEmailAddress] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [checkedFirstName, setCheckedFirstName] = useState(false);
    const [checkedLastName, setCheckedLastName] = useState(false);
    const [checkedEmailAddress, setCheckedEmailAddress] = useState(false);
    const [checkedPhoneNumber, setCheckedPhoneNumber] = useState(false);

    let customerID1 = 0;
    let firstName1 = 0;
    let lastName1 = 0;
    let emailAddress1 = 0;
    let phoneNumber1 = 0;

    if (props.customerToEdit) {
      customerID1 = props.customerToEdit.customerID;
      firstName1 = props.customerToEdit.firstName;
      lastName1 = props.customerToEdit.lastName;
      emailAddress1 = props.customerToEdit.emailAddress;
      phoneNumber1 = props.customerToEdit.phoneNumber;
    }
    const submitButton = async (e) => {
      e.preventDefault();

      // On submit of the form, send a POST request with the data to the server.

      let data = {
        customerID: customerID1,
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        phoneNumber: phoneNumber,
      };
      console.log("this is data", data);
      const response = await fetch("http://localhost:9100/updatecustomers", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200 || response.status === 201) {
        alert("Successfully updated the Customer!");
        console.log(props);
        loadCustomers();
      } else {
        alert(
          `Failed to update the customer, status code = ${response.status}`
        );
        loadCustomers();
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
          <Modal.Title id="update-customer">Update Customer </Modal.Title>
          <h1> #{customerID1}</h1>
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
                if (props.customerToEdit) {
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
                if (props.customerToEdit) {
                  setLastName(lastName1);
                }
              } else {
                setCheckedLastName(false);
                setLastName(0);
              }
            }}
          ></input>
          <h4>Email Address</h4>
          <input value={emailAddress1} className="greyedOut"></input>

          <input
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          ></input>
          <input
            type="checkbox"
            className="checkbox-form"
            onClick={() => {
              if (checkedEmailAddress === false) {
                setCheckedEmailAddress(true);
                if (props.customerToEdit) {
                  setEmailAddress(emailAddress1);
                }
              } else {
                setCheckedEmailAddress(false);
                setEmailAddress(0);
              }
            }}
          ></input>
          <h4>Phone Number (XXX-XXX-XXXX)</h4>
          <input value={phoneNumber1} className="greyedOut"></input>

          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></input>
          <input
            type="checkbox"
            className="checkbox-form"
            onClick={() => {
              if (checkedPhoneNumber === false) {
                setCheckedPhoneNumber(true);
                if (props.customerToEdit) {
                  setPhoneNumber(phoneNumber1);
                }
              } else {
                setCheckedPhoneNumber(false);
                setPhoneNumber(0);
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

  const onDelete = async (customerToDelete) => {
    setCustomerToDelete(customerToDelete);
    console.log("this is customerToDelete", customerToDelete);
    setModalShowRemove(true);
    loadCustomers();
  };

  function RemoveModal(props) {
    console.log(props.customerToDelete.customerID);
    let customerID = 0;
    let firstName = 0;
    let lastName = 0;
    if (props.customerToDelete) {
      customerID = props.customerToDelete.customerID;
      firstName = props.customerToDelete.firstName;
      lastName = props.customerToDelete.lastName;
    }

    const submitButton = async (e) => {
      e.preventDefault();
      console.log(customerID);

      // On submit of the form, send a DELETE request with the ID to the server.
      let data = {
        customerID: customerID,
      };

      const response = await fetch(
        "http://flip2.engr.oregonstate.edu:9100/deletecustomer",
        {
          method: "DELETE",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        alert("Successfully deleted the Customer!");
        console.log(props);
        loadCustomers();
      } else {
        alert(
          `Failed to delete the customer, status code = ${response.status}`
        );
        loadCustomers();
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
          <Modal.Title id="delete-customer">Delete Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          Are you sure you want to delete this customer: ID #{customerID}, Name:{" "}
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

  // Add a search function
  return (
    <div>
      <h1> Customers</h1>
      <button className="crud-buttons" onClick={() => setModalShowAdd(true)}>
        Add
      </button>
      <AddModal
        loadCustomers={loadCustomers}
        show={modalShowAdd}
        onHide={() => setModalShowAdd(false)}
      />
      <button className="crud-buttons" onClick={() => setModalShowSearch(true)}>
        Search
      </button>
      <SearchModal
        show={modalShowSearch}
        onHide={() => setModalShowSearch(false)}
      />
      <CustomerList
        modalShowUpdate={modalShowUpdate}
        setModalShowUpdate={setModalShowUpdate}
        modalShowRemove={modalShowRemove}
        setModalShowRemove={setModalShowRemove}
        onEdit={onEdit}
        onDelete={onDelete}
        customers={customers}
      ></CustomerList>
      <UpdateModal
        customerToEdit={customerToEdit}
        show={modalShowUpdate}
        onHide={() => setModalShowUpdate(false)}
      />
      <RemoveModal
        customerToDelete={customerToDelete}
        show={modalShowRemove}
        onHide={() => setModalShowRemove(false)}
      />
    </div>
  );
}

export default Customers;
