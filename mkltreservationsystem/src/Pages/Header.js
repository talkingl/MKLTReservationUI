import "../App.css";
import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Container, NavDropdown, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/home">
            MKLT Hotel Reservation System
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home Page</Nav.Link>
              <NavDropdown title="Tables" id="basic-nav-dropdown">
                <NavDropdown.Item href="/rooms">Rooms</NavDropdown.Item>
                <NavDropdown.Item href="/customers">Customers</NavDropdown.Item>
                <NavDropdown.Item href="/employees">Employees</NavDropdown.Item>
                <NavDropdown.Item href="/reservations">
                  Reservations
                </NavDropdown.Item>
                <NavDropdown.Item href="/invoices">Invoices</NavDropdown.Item>
                <NavDropdown.Item href="/roomsreservations">
                  Rooms Reservations
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>Welcome to MKLT</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
