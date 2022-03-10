import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";
import React from "react";
import RoomList from "../Components/RoomList";
import { useState, useEffect } from "react";
// import UpdateRoomModal from "../Components/UpdateRooms";

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

  const [rooms, setRooms] = useState();
  const [roomToEdit, setRoomToEdit] = useState(" ");
  const [roomToDelete, setRoomToDelete] = useState(" ");

  const onEdit = async (roomToEdit) => {
    setRoomToEdit(roomToEdit);
    console.log(roomToEdit);
    setModalShowUpdate(true);
  };

  function UpdateRoomModal(props) {
    console.log("this is roomtoEdit", props.roomToEdit);

    const [roomID, setRoomID] = useState(0);
    const [roomFloor, setRoomFloor] = useState(0);
    const [roomType, setRoomType] = useState(0);
    const [roomNumber, setRoomNumber] = useState(0);
    const [roomPrice, setRoomPrice] = useState(0);
    let roomID1 = 0;
    let roomFloor1 = 0;
    let roomType1 = 0;
    let roomNumber1 = 0;
    let roomPrice1 = 0;

    if (props.roomToEdit) {
      roomID1 = props.roomToEdit.roomID;
      roomFloor1 = props.roomToEdit.roomFloor;
      roomType1 = props.roomToEdit.roomType;
      roomNumber1 = props.roomToEdit.roomNumber;
      roomPrice1 = props.roomToEdit.roomPrice;
    }

    //   setRoomID(props.roomToEdit.roomID);
    //   setRoomFloor(props.roomToEdit.roomFloor);
    //   setRoomType(props.roomToEdit.roomType);
    //   setRoomNumber(props.roomToEdit.roomNumber);
    //   setRoomPrice(props.roomToEdit.roomPrice);

    const submitButton = async (e) => {
      e.preventDefault();
      console.log(roomFloor, roomNumber, roomType, roomPrice);

      // On submit of the form, send a POST request with the data to the server.

      let data = {
        roomID: roomID1,
        roomFloor: roomFloor,
        roomNumber: roomNumber,
        roomType: roomType,
        roomPrice: roomPrice,
      };

      const response = await fetch("http://localhost:8000/updaterooms", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        alert("Successfully updated the Room!");
        console.log(props);
        loadRooms();
      } else {
        alert(`Failed to update the room, status code = ${response.status}`);
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
            Update Room <h1>{roomID1}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Room Floor</h4>
          <input value={roomFloor1} className="greyedOut"></input>
          <input
            value={roomFloor}
            onChange={(e) => setRoomFloor(e.target.value)}
          ></input>
          <h4>Room Number</h4>
          <input value={roomNumber1} className="greyedOut"></input>
          <input
            value={roomNumber}
            onChange={(e) => {
              setRoomNumber(e.target.value);
            }}
          ></input>
          <h4>Room Type</h4>
          <input value={roomType1} className="greyedOut"></input>
          <input
            value={roomType}
            onChange={(e) => {
              setRoomType(e.target.value);
            }}
          ></input>
          <h4>Room Price</h4>
          <input value={roomPrice1} className="greyedOut"></input>
          <input
            value={roomPrice}
            onChange={(e) => {
              setRoomPrice(e.target.value);
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

  const loadRooms = async () => {
    const response = await fetch("http://localhost:8000/displayrooms");
    const rooms = await response.json();
    setRooms(rooms);
  };
  useEffect(() => {
    loadRooms();
  }, []);

  const onDelete = async (roomToDelete) => {
    setRoomToDelete(roomToDelete);
    console.log("this is roomtodelete", roomToDelete);
    setModalShowRemove(true);
    loadRooms();
  };

  function RemoveRoomModal(props) {
    console.log(props.roomToDelete.roomID);
    let roomID = 0;
    let roomNumber = 0;
    let roomFloor = 0;
    if (props.roomToDelete) {
      roomID = props.roomToDelete.roomID;
      roomNumber = props.roomToDelete.roomNumber;
      roomFloor = props.roomToDelete.roomFloor;
    }

    const submitButton = async (e) => {
      e.preventDefault();
      console.log(roomID);

      // On submit of the form, send a DELETE request with the ID to the server.
      let data = {
        roomID: roomID,
      };

      const response = await fetch("http://localhost:8000/deleteroom", {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        alert("Successfully deleted the Room!");
        console.log(props);
        loadRooms();
      } else {
        alert(`Failed to delete the room, status code = ${response.status}`);
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
            Delete Room
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            {" "}
            Are you sure you want to delete this room: ID #{roomID}, Room Floor #
            {roomFloor}, and Room Number {roomNumber}?{" "}
          </h4>
        </Modal.Body>
        <Modal.Footer>
        <Button
          onClick={(e) => {
            submitButton(e);
            props.onHide();
          }}
        >Remove</Button>
        </Modal.Footer>
      </Modal>
    );
  };

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
          <select
            value={roomFloor}
            onChange={(e) => setRoomFloor(e.target.value)}
          >
            <option value="1">1st Floor</option>
            <option value="2">2nd Floor</option>
            <option value="3">3rd Floor</option>
            <option value="4">4th Floor</option>
            <option value="5">5th Floor</option>
          </select>
          <h4>Room Number</h4>
          <input
            type="number"
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
            <option value="HandicapQueen">
              Accessible with Two Queen Beds
            </option>
          </select>
          <h4>Room Price</h4>
          <input
            type="number"
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
      <button className="crud-buttons" onClick={() => setModalShowSearch(true)}>
        Search
      </button>
      <SearchModal
        show={modalShowSearch}
        onHide={() => setModalShowSearch(false)}
      />
      <RoomList
        modalShowUpdate={modalShowUpdate}
        setModalShowUpdate={setModalShowUpdate}
        modalShowRemove={modalShowRemove}
        setModalShowRemove={setModalShowRemove}
        onEdit={onEdit}
        onDelete={onDelete}
        roomToEdit={roomToEdit}
        roomToDelete={roomToDelete}
        rooms={rooms}
      ></RoomList>
      <UpdateRoomModal
        roomToEdit={roomToEdit}
        show={modalShowUpdate}
        onHide={() => setModalShowUpdate(false)}
      />
      <RemoveRoomModal
        roomToDelete={roomToDelete}
        show={modalShowRemove}
        onHide={() => setModalShowRemove(false)}
      />
    </div>
  );
}

export default Rooms;
