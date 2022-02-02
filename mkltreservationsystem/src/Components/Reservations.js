import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";

function Reservations() {
  return (
    <div>
      <h1> Reservations</h1>
      <Table id="Reservations" className="borderless">
        <thead>
          <th>reservationID</th>
          <th>customerID</th>
          <th> employeeID</th>
          <th>checkInDate</th>
          <th> stayLength</th>
          <th> checkedIn</th>
          <th> checkedOut</th>
          <th> specialRequest</th>
        </thead>
        <tbody>
          <td>1</td>
          <td>1</td>
          <td> 1</td>
          <td> 2/1/2022</td>
          <td> 3</td>
          <td> Y</td>
          <td>N</td>
          <td> No </td>
        </tbody>
      </Table>
    </div>
  );
}

export default Reservations;
