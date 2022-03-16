import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";
import React from "react";
import RRList from "../Components/RRList";
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
        <h2>Choose a Date for filtering reservations</h2>
        <h4>Check In Date</h4>
        <input type="date"></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Search</Button>
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
          Check in Customer to Room
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Reservation ID</h4>
        <input type="number"></input>
        <h4>Room ID</h4>
        <input type="number"></input>
        <h4>Checked In</h4>
        <input value="0" className="greyedOut"></input>
        <select>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
        <h4>Checked Out</h4>
        <input value="0" className="greyedOut"></input>
        <select>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
        <h4>Special Request(s)</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Check In</Button>
      </Modal.Footer>
    </Modal>
  );
}

function RoomsReservations() {
  const [modalShowRemove, setModalShowRemove] = React.useState(false);
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
  const [modalShowSearch, setModalShowSearch] = React.useState(false);
  const [roomReservations, setRoomReservation] = useState();
  const [roomList, setRoomList] = useState();
  const [reservationList, setReservationList] = useState();

  const loadRoomReservations = async () => {
    const response = await fetch(
      "http://localhost:9100/displayguestcheckinout"
    );
    const reservations = await response.json();
    setRoomReservation(reservations);
  };
  useEffect(() => {
    loadRoomReservations();
  }, []);

  // load rooms for dropdown
  const loadRoomList = async () =>{
      const response = await fetch('http://localhost:9100/listrooms', {
          headers: {
              'Content-Type': 'application/json',
          }
      });
      const rooms = await response.json();
      setRoomList(rooms);
  }
  useEffect(() => {
    loadRoomList();
  }, []);

  // load reservations for dropdown
  const loadReservationList = async () =>{
      const response = await fetch('http://localhost:9100/listreservations', {
          headers: {
              'Content-Type': 'application/json',
          }
      });
      const reservations = await response.json();
      setReservationList(reservations);
  }
  useEffect(() => {
    loadReservationList();
  }, []);

  // add modal
  function AddModal(props) {
    const [roomID, setRoomID] = useState();
    const [reservationID, setReservationID] = useState();

    const submitButton = async (e) => {
      e.preventDefault();

      let data = {
        roomID: roomID,
        reservationID: reservationID,
      };
      console.log(data);

      // On submit of the form, send a POST request with the data to the server.
      const response = await fetch(
        "http://localhost:9100/createroomreservation",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        alert("Successfully added the Room to the reservation!");
        loadReservations();
      } else {
        alert(`Failed to add Room to the reservation, status code = ${response.status}`);
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
            Add a Room to a Reservation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Choose a Reservation</h4>
          <select onChange={(e) => setReservationID(e.target.value)}>
              {reservationList?.map((item)=>{
                return (
                  <option
                  value={item.reservationID}
                  selected={item.reservationID === reservationID}>
                    Customer: {item.firstName} {item.lastName} Check-in on: {item.checkInDate}
                  </option>
                )
              })}
          </select>
          <h4>Choose a Room to Add</h4>
          <select onChange={(e) => setRoomID(e.target.value)}>
              {employeeList?.map((item)=>{
                return (
                  <option
                  value={item.roomID}
                  selected={item.roomID === roomID}>
                    Room #{item.roomNumber} {item.roomType}
                  </option>
                )
              })}
          </select>
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

  // onEditCheckIn
  function onEditCheckIn(reservation) = async (e) => {
    e.preventDefault();

    // On submit of the form, send a POST request with the data to the server.
    let data = {
      reservationID: reservation.reservationID,
      roomID: reservation.roomID,
      checkedIn: reservation.checkedIn,
    };
    console.log("this is data", data);
    const response = await fetch("http://localhost:9100/updatecheckin", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      alert("Successfully updated the CheckIn Status!");
      console.log(props);
      loadRoomReservations();
    } else {
      alert(
        `Failed to update the check-in status, status code = ${response.status}`
      );
      loadRoomReservations();
    }
  };

  // onEditCheckOut
  function onEditCheckIn(reservation) = async (e) => {
    e.preventDefault();

    // On submit of the form, send a POST request with the data to the server.
    let data = {
      reservationID: reservation.reservationID,
      roomID: reservation.roomID,
      checkedOut: reservation.checkedOut,
    };
    console.log("this is data", data);
    const response = await fetch("http://localhost:9100/updatecheckout", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      alert("Successfully updated the CheckOut Status!");
      console.log(props);
      loadRoomReservations();
    } else {
      alert(
        `Failed to update the check-out status, status code = ${response.status}`
      );
      loadRoomReservations();
    }
  };

  return (
    <div>
      <button className="crud-buttons" onClick={() => setModalShowSearch(true)}>
        Search
      </button>
      <SearchModal
        show={modalShowSearch}
        onHide={() => setModalShowSearch(false)}
      />
      <RRList
        onEditCheckIn={onEditCheckIn}
        onEditCheckOut={onEditCheckOut}
        roomReservations={roomReservations}
      ></RRList>
    </div>
  );
}

export default RoomsReservations;
