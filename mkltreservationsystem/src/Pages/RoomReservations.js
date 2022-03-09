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
        <input></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Search</Button>
      </Modal.Footer>
    </Modal>
  );
}

function RoomsReservations() {
  const [modalShowRemove, setModalShowRemove] = React.useState(false);
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
  const [modalShowSearch, setModalShowSearch] = React.useState(false);
  const [reservations, setReservation] = useState();

  const loadReservations = async () => {
    const response = await fetch(
      "http://localhost:8000/displayroomreservations"
    );
    const reservations = await response.json();
    setReservation(reservations);
  };
  useEffect(() => {
    loadReservations();
  }, []);
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
        modalShowUpdate={modalShowUpdate}
        setModalShowUpdate={setModalShowUpdate}
        modalShowRemove={modalShowRemove}
        setModalShowRemove={setModalShowRemove}
        reservations={reservations}
      ></RRList>
    </div>
  );
}

export default RoomsReservations;
