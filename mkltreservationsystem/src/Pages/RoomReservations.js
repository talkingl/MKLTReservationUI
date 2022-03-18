import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";
import React from "react";
import RRList from "../Components/RRList";
import { useEffect, useState } from "react";

function RoomsReservations() {
  const [modalShowRemove, setModalShowRemove] = React.useState(false);
  const [modalShowAdd, setModalShowAdd] = React.useState(false);
  const [modalShowSearch, setModalShowSearch] = React.useState(false);
  const [roomReservations, setRoomReservation] = useState();
  const [roomReservationToEdit, setRoomReservationToEdit] = useState(" ");
  const [roomList, setRoomList] = useState();
  const [reservationList, setReservationList] = useState();

  const loadRoomReservations = async () => {
    const response = await fetch(
      "http://flip2.engr.oregonstate.edu:9100/displayguestcheckinout"
    );
    const reservations = await response.json();
    setRoomReservation(reservations);
  };
  useEffect(() => {
    loadRoomReservations();
  }, []);

  // load rooms for dropdown
  const loadRoomList = async () => {
    const response = await fetch("http://flip2.engr.oregonstate.edu:9100/listrooms", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const rooms = await response.json();
    setRoomList(rooms);
  };
  useEffect(() => {
    loadRoomList();
  }, []);

  // load reservations for dropdown
  const loadReservationList = async () => {
    const response = await fetch("http://flip2.engr.oregonstate.edu:9100/listreservations", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const reservations = await response.json();
    setReservationList(reservations);
  };
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

      // On submit of the form, send a POST request with the data to the server.
      const response = await fetch(
        "http://flip2.engr.oregonstate.edu:9100/createroomreservation",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        alert("Successfully added the Room to the reservation!");
        loadRoomReservations();
      } else {
        alert(
          `Failed to add Room to the reservation, status code = ${response.status}`
        );
        loadRoomReservations();
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
            {reservationList?.map((item) => {
              return (
                <option
                  value={item.reservationID}
                  selected={item.reservationID === reservationID}
                >
                  Customer: {item.firstName} {item.lastName} Check-in on:{" "}
                  {item.checkInDate}
                </option>
              );
            })}
          </select>
          <h4>Choose a Room to Add</h4>
          <select onChange={(e) => setRoomID(e.target.value)}>
            {roomList?.map((item) => {
              return (
                <option value={item.roomID} selected={item.roomID === roomID}>
                  Room #{item.roomNumber} {item.roomType}
                </option>
              );
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

  function SearchModal(props) {
    const [searchDate, setSearchDate] = useState(" ");

    const submitButton = async (e) => {
      e.preventDefault();

      let data = { searchDate: searchDate };

      // On submit of the form, send a GET request with the date to the server
      const response = await fetch(
        `http://flip2.engr.oregonstate.edu:9100/displayguestcheckinout/filter/date/${searchDate}`,
        { headers: { "Content-Type": "application/json" } }
      );
      const reservations = await response.json();
      setRoomReservation(reservations);
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
            Search Reservations by Check-In Date
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Choose a Date for filtering reservations</h2>
          <h4>Check In Date</h4>
          <input
            type="date"
            onChange={(e) => setSearchDate(e.target.value)}
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

  // onEditCheckIn
  const onEditCheckIn = async (roomReservationToEdit, roomID) => {
    setRoomReservationToEdit(roomReservationToEdit);

    let reservationID = roomReservationToEdit.reservationID;
    let checkedIn = !roomReservationToEdit.checkedIn;

    // On submit of the form, send a POST request with the data to the server.
    let data = {
      reservationID: reservationID,
      roomID: roomID,
      checkedIn: checkedIn,
    };
    const response = await fetch("http://flip2.engr.oregonstate.edu:9100/updatecheckin", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || response.status === 201) {
      alert("Successfully updated the CheckIn Status!");
      loadRoomReservations();
    } else {
      alert(
        `Failed to update the check-in status, status code = ${response.status}`
      );
      loadRoomReservations();
    }
  };

  // onEditCheckOut
  const onEditCheckOut = async (roomReservationToEdit, roomID) => {
    setRoomReservationToEdit(roomReservationToEdit);

    let reservationID = roomReservationToEdit.reservationID;
    let checkedOut = !roomReservationToEdit.checkedOut;

    // On submit of the form, send a POST request with the data to the server.
    let data = {
      reservationID: reservationID,
      roomID: roomID,
      checkedOut: checkedOut,
    };
    const response = await fetch("http://flip2.engr.oregonstate.edu:9100/updatecheckout", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || response.status === 201) {
      alert("Successfully updated the CheckOut Status!");
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
      <RRList
        onEditCheckIn={onEditCheckIn}
        onEditCheckOut={onEditCheckOut}
        roomReservations={roomReservations}
      ></RRList>
    </div>
  );
}

export default RoomsReservations;
