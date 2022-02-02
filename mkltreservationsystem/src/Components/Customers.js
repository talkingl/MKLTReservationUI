import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";

function Customers() {
  return (
    <div>
      <h1> Customers</h1>
      <Table id="Customerss" className="borderless">
        <thead>
          <th>customerID</th>
          <th>firstName</th>
          <th> lastName</th>
          <th>emailAddress</th>
          <th> phoneNumber</th>
        </thead>
        <tbody>
          <td>1</td>
          <td>Logan</td>
          <td> Talkington</td>
          <td>talkingl@oregonstate.edu</td>
          <td> 2176912481</td>
        </tbody>
      </Table>
    </div>
  );
}

export default Customers;
