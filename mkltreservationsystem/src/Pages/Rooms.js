import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";
import React from "react";
import RoomList from "../Components/RoomList";
import { useState } from "react";

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
          Search Rooma
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2> Enter any of the following to search for a Room</h2>
        <h4>Room ID</h4>
        <input></input>
        <h4>Room Floor</h4>
        <input></input>
        <h4>Room Number</h4>
        <input></input>
        <h4>Room Type</h4>
        <input></input>
        <h4>Room Price</h4>
        <input></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Search</Button>
      </Modal.Footer>
    </Modal>
  );
}
function Rooms() {
  const [modalShowAdd, setModalShowAdd] = React.useState(false);
  const [modalShowRemove, setModalShowRemove] = React.useState(false);
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
  const [modalShowSearch, setModalShowSearch] = React.useState(false);
  function AddModal(props) {
    const [roomFloor, setRoomFloor] = useState();
    const [roomNumber, setRoomNumber] = useState();
    const [roomType, setRoomType] = useState();
    const [roomPrice, setRoomPrice] = useState();
    const submitButton = async (e) => {
      console.log(roomFloor, roomNumber, roomType, roomPrice);
      e.preventDefault();
      // On submit of the form, send a POST request with the data to the server.

      let data = {
        roomFloor: roomFloor,
        roomNumber: roomNumber,
        roomType: roomType,
        roomPrice: roomPrice,
      };

      const response = await fetch("/createroom", {
        method: "POST",
        mode: "no-cors",
        body: data,
      });
      if (response.status === 200) {
        // re-render table
        // const response = await fetch('https://writers-block-serve.herokuapp.com/posts');
        // const posts = await response.json();
        // setPosts(posts);

        // clear input values
        setRoomFloor("");
        setRoomNumber("");

        setRoomType("");
        setRoomPrice("");
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
            Add Rooms
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Room Floor</h4>
          <input
            value={roomFloor}
            onChange={(e) => setRoomFloor(e.target.value)}
          ></input>
          <h4>Room Number</h4>
          <input
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          ></input>
          <h4>Room Type</h4>
          <input
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          ></input>
          <h4>Room Price</h4>
          <input
            value={roomPrice}
            onChange={(e) => setRoomPrice(e.target.value)}
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
  return (
    <div>
      <RoomList
        modalShowUpdate={modalShowUpdate}
        setModalShowUpdate={setModalShowUpdate}
        modalShowRemove={modalShowRemove}
        setModalShowRemove={setModalShowRemove}
      ></RoomList>
      <button className="crud-buttons" onClick={() => setModalShowAdd(true)}>
        Add
      </button>
      <AddModal
        show={modalShowAdd}
        onHide={() => setModalShowAdd(false)}
        setModalShowAdd={setModalShowAdd}
      />
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

export default Rooms;
