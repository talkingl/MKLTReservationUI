import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";

function Rooms() {
  return (
    <div>
      <h1> Homepage</h1>
      <p>Please follow a link below to get to your desired input</p>
      <Link to="/rooms" className="App-link">
        {" "}
        Rooms
      </Link>{" "}
      <br></br>
      <Link to="/customers" className="App-link">
        {" "}
        Customers
      </Link>
      <br></br>
      <Link to="/employees" className="App-link">
        {" "}
        Employees
      </Link>
      <br></br>
      <Link to="/reservations" className="App-link">
        {" "}
        Reservations
      </Link>
      <br></br>
      <Link to="/invoices" className="App-link">
        {" "}
        Invoices
      </Link>
      <br></br>
      <Link to="/roomsreservations" className="App-link">
        {" "}
        Rooms Reservations
      </Link>
      <br></br>
    </div>
  );
}

export default Rooms;
