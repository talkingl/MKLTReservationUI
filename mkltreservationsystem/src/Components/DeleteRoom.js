import { Modal, Button } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import { useState } from "react";

function RemoveRoomModal(props) {
  console.log("this is roomtoEdit", props.roomToEdit);

  const [roomID, setRoomID] = useState(0);

  let roomID1 = 0;

  if (props.roomToEdit) {
    roomID1 = props.roomToEdit.roomID;
  }

  //   setRoomID(props.roomToEdit.roomID);
  //   setRoomFloor(props.roomToEdit.roomFloor);
  //   setRoomType(props.roomToEdit.roomType);
  //   setRoomNumber(props.roomToEdit.roomNumber);
  //   setRoomPrice(props.roomToEdit.roomPrice);

  return function RemoveModal(props) {
    console.log(props.roomToEdit.roomID);
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
          <h4> Are you sure you want to delete this room? </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Remove</Button>
        </Modal.Footer>
      </Modal>
    );
  };
}

export default UpdateRoomModal;
