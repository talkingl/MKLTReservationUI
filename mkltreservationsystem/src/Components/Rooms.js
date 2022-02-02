import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";

function Rooms() {
  return (
    <div>
      <h1> Rooms</h1>
      <Table id="Rooms" className="borderless">
        <thead>
          <th>roomID</th>
          <th>roomFloor</th>
          <th> roomNumber</th>
          <th>roomType</th>
          <th> roomPrice</th>
        </thead>
        <tbody>
          <td>1</td>
          <td>1</td>
          <td> 101</td>
          <td>King</td>
          <td> 400.00</td>
        </tbody>
      </Table>
    </div>
  );
}

export default Rooms;
