import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";
import React from "react";
import ReservationList from "../Components/ReservationList";
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
        <Modal.Title id="contained-modal-title-vcenter">
          Search Reservations
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Enter a customer name or room number to search for a Reservation</h2>
        <h4>Customer Name</h4>
        <input></input>
        <h4>Room Number</h4>
        <input></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Search</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Reservations() {
  const [modalShowAdd, setModalShowAdd] = React.useState(false);
  const [modalShowRemove, setModalShowRemove] = React.useState(false);
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
  const [modalShowSearch, setModalShowSearch] = React.useState(false);
  const [reservations, setReservation] = useState();

  function AddModal(props) {
    const [customerID, setCustomerID] = useState();
    const [employeeID, setEmployeeID] = useState();
    const [checkInDate, setCheckInDate] = useState();
    const [stayLength, setStayLength] = useState();
    const [checkedIn, setCheckedIn] = useState();
    const [checkedOut, setCheckedOut] = useState();
    const [specialRequests, setSpecialRequests] = useState();
    const submitButton = async (e) => {
      e.preventDefault();

      let data = {
        customerID: customerID,
        employeeID: employeeID,
        checkInDate: checkInDate,
        stayLength: stayLength,
        specialRequests: specialRequests,
        checkedIn: checkedIn,
        checkedOut: checkedOut,
      };
      console.log(data);

      // On submit of the form, send a POST request with the data to the server.
      const response = await fetch("http://localhost:8000/createreservation", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        alert("Successfully added the Reservation!");
        loadReservations();
      } else {
        alert(`Failed to add Reservation, status code = ${response.status}`);
        loadReservations();
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
            Add Reservation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>customerID</h4>
          <input
            value={customerID}
            onChange={(e) => setCustomerID(e.target.value)}
          ></input>
          <h4>employeeID</h4>
          <input
            value={employeeID}
            onChange={(e) => setEmployeeID(e.target.value)}
          ></input>
          <h4>checkInDate</h4>
          <input
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          ></input>
          <h4>stayLength</h4>
          <input
            value={stayLength}
            onChange={(e) => setStayLength(e.target.value)}
          ></input>

          <h4>checkedIn</h4>
          <input
            value={checkedIn}
            onChange={(e) => setCheckedIn(e.target.value)}
          ></input>
          <h4>checkedOut</h4>
          <input
            value={checkedOut}
            onChange={(e) => setCheckedOut(e.target.value)}
          ></input>
          <h4>specialRequest</h4>
          <input
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
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

  const loadReservations = async () => {
    const response = await fetch("http://localhost:8000/displayreservations");
    const reservations = await response.json();
    setReservation(reservations);
  };
  useEffect(() => {
    loadReservations();
  }, []);
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
      <ReservationList
        modalShowUpdate={modalShowUpdate}
        setModalShowUpdate={setModalShowUpdate}
        modalShowRemove={modalShowRemove}
        setModalShowRemove={setModalShowRemove}
        reservations={reservations}
      ></ReservationList>
    </div>
  );
}

export default Reservations;
