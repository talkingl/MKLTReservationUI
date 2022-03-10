import { Modal, Button } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import { useState } from "react";

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
      alert("Successfully added the Room!");
    } else {
      alert(`Failed to add room, status code = ${response.status}`);
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

export default UpdateRoomModal;
