import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";

function Invoices() {
  return (
    <div>
      <h1> Invoices</h1>
      <Table id="Invoices" className="borderless">
        <thead>
          <th>invoiceID</th>
          <th>reservationID</th>
          <th> invoiceAmount</th>
          <th> creditCard </th>
          <th> dueDate</th>
          <th> invoicePaid</th>
        </thead>
        <tbody>
          <td>1</td>
          <td>1</td>
          <td> 855.52</td>
          <td>123456789</td>
          <td> 3/1/22</td>
          <td> No</td>
        </tbody>
      </Table>
    </div>
  );
}

export default Invoices;
