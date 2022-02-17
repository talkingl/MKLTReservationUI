import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";
import React from "react";
import RRList from "../Components/RRList";

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
          Add Rooms/Reservation Table
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>reservationID</h4>
        <input></input>
        <h4>roomID</h4>
        <input></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}

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
        <h2> Enter any of the following to search for a Room/Reservation</h2>
        <h4>Reservation ID</h4>
        <input></input>
        <h4>Room ID</h4>
        <input></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Search</Button>
      </Modal.Footer>
    </Modal>
  );
}

function RoomsReservations() {
  const [modalShowAdd, setModalShowAdd] = React.useState(false);
  const [modalShowRemove, setModalShowRemove] = React.useState(false);
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
  const [modalShowSearch, setModalShowSearch] = React.useState(false);

  return (
    <div>
      <RRList
        modalShowUpdate={modalShowUpdate}
        setModalShowUpdate={setModalShowUpdate}
        modalShowRemove={modalShowRemove}
        setModalShowRemove={setModalShowRemove}
      ></RRList>
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
    </div>
  );
}

export default RoomsReservations;
