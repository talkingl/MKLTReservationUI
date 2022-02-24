import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";

function Rooms() {
  return (
    <div>
      <h1>Hotel MKLT Homepage</h1>
      <p>Welcome! Please follow a link below to get to your desired input.</p>
      <Link to="/rooms" className="App-link">
        {" "}
        Rooms
      </Link>{" "}
      <p>The list of rooms in the hotel that can be booked is found here.</p>
      <br></br>
      <Link to="/customers" className="App-link">
        {" "}
        Customers
      </Link>
      <p>
        Our customer list is found here. Use this page to add new customers,
        update current customers, get customer's ID for reservations, or delete
        a customer.
      </p>
      <br></br>
      <Link to="/employees" className="App-link">
        {" "}
        Employees
      </Link>
      <p>This page has all our employees and new ones can be added here.</p>
      <br></br>
      <Link to="/reservations" className="App-link">
        {" "}
        Reservations
      </Link>
      <p>Use this page to register a new reservation</p>
      <br></br>
      <Link to="/invoices" className="App-link">
        {" "}
        Invoices
      </Link>
      <p>Invoices can be found, created, updated or deleted on this page.</p>
      <br></br>
      <Link to="/roomsreservations" className="App-link">
        {" "}
        Guest Check-In / Check-Out
      </Link>
      <p>Use this page to check guests in and out of their rooms</p>
      <br></br>
    </div>
  );
}

export default Rooms;
