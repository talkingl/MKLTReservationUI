import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";
import hotel from "./photos/hotel-pool.jpg";
import hotel2 from "./photos/hotel-pool2.jpg";

function Rooms() {
  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col sm={6}>
            <img src={hotel} className="image-home"></img>
          </Col>
          <Col sm={6}>
            <img src={hotel2} className="image-home"></img>
          </Col>
        </Row>
      </Container>
      <h1>Hotel MKLT Homepage</h1>
      <p>Welcome! Please follow a link below to get to your desired input.</p>
      <Container>
        <Row>
          <Col className="link-card">
            <Link to="/rooms" className="App-link">
              {" "}
              Rooms
            </Link>{" "}
            <p>
              The list of rooms in the hotel that can be booked is found here.
            </p>
          </Col>
          <Col className="link-card">
            <Link to="/customers" className="App-link">
              {" "}
              Customers
            </Link>
            <p>
              Our customer list is found here. Use this page to add new
              customers, update current customers, get customer's ID for
              reservations, or delete a customer.
            </p>
          </Col>
          <Col className="link-card">
            <Link to="/employees" className="App-link">
              {" "}
              Employees
            </Link>
            <p>
              This page has all our employees and new ones can be added here.
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="link-card">
            <Link to="/reservations" className="App-link">
              {" "}
              Reservations
            </Link>
            <p>Use this page to register a new reservation</p>
          </Col>
          <Col className="link-card">
            <Link to="/invoices" className="App-link">
              {" "}
              Invoices
            </Link>
            <p>
              Invoices can be found, created, updated or deleted on this page.
            </p>
          </Col>
          <Col className="link-card">
            <Link to="/guestcheckinout" className="App-link">
              {" "}
              Check-In/Out
            </Link>
            <p>Use this page to check guests in and out of their rooms</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Rooms;
