import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";

function RoomsReservations() {
  return (
    <div>
      <h1> Rooms Reservations</h1>
      <Table id="RoomsReservations" className="borderless">
        <thead>
          <th>reservationID</th>
          <th>roomID</th>
        </thead>
        <tbody>
          <td> 1</td>
          <td> 101</td>
        </tbody>
      </Table>
    </div>
  );
}

export default RoomsReservations;
