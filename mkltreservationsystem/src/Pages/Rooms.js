import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";
import React from "react";
import RoomList from "../Components/RoomList";
import { useState, useEffect } from "react";


function Rooms() {
  const [modalShowAdd, setModalShowAdd] = React.useState(false);
  const [modalShowRemove, setModalShowRemove] = React.useState(false);
  const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
  const [rooms, setRooms] = useState();

  const loadRooms = async () => {
    const response = await fetch("http://localhost:8000/displayrooms");
    const rooms = await response.json();
    setRooms(rooms);
  };
  useEffect(() => {
    loadRooms();
  }, []);

  function AddModal(props) {
    const [roomFloor, setRoomFloor] = useState();
    const [roomNumber, setRoomNumber] = useState();
    const [roomType, setRoomType] = useState();
    const [roomPrice, setRoomPrice] = useState();
    const submitButton = async (e) => {
      e.preventDefault();
      console.log(roomFloor, roomNumber, roomType, roomPrice);

      // On submit of the form, send a POST request with the data to the server.

      let data = {
        roomFloor: roomFloor,
        roomNumber: roomNumber,
        roomType: roomType,
        roomPrice: roomPrice,
      };

      const response = await fetch("http://localhost:8000/createroom", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        alert("Successfully added the Room!");
        loadRooms();
      } else {
        alert(`Failed to add room, status code = ${response.status}`);
        loadRooms();
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
          <select value={roomFloor}
            onChange={(e) => setRoomFloor(e.target.value)}
          >
            <option value="1">1st Floor</option>
            <option value="2">2nd Floor</option>
            <option value="3">3rd Floor</option>
            <option value="4">4th Floor</option>
            <option value="5">5th Floor</option>
          </select>
          <h4>Room Number</h4>
          <input type="number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          ></input>
          <h4>Room Type</h4>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="Queen">Two Queen Beds</option>
            <option value="King">One King Bed</option>
            <option value="JrSuite">Junior Suite</option>
            <option value="KingSuite">King Suite</option>
            <option value="HandicapQueen">Accessible with Two Queen Beds</option>
          </select>
          <h4>Room Price</h4>
          <input type="number"
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
      <button className="crud-buttons" onClick={() => setModalShowAdd(true)}>
        Add
      </button>
      <AddModal
        show={modalShowAdd}
        onHide={() => setModalShowAdd(false)}
        setModalShowAdd={setModalShowAdd}
      />
      <RoomList
        modalShowUpdate={modalShowUpdate}
        setModalShowUpdate={setModalShowUpdate}
        modalShowRemove={modalShowRemove}
        setModalShowRemove={setModalShowRemove}
        rooms={rooms}
      ></RoomList>
    </div>
  );
}

export default Rooms;
