import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";

function Employees() {
  return (
    <div>
      <h1> Employees</h1>
      <Table id="Employees" className="borderless">
        <thead>
          <th>employeeID</th>
          <th>firstName</th>
          <th> lastName</th>
          <th>shiftWorked</th>
          <th> payRate</th>
        </thead>
        <tbody>
          <td>1</td>
          <td>Logan</td>
          <td> Talkington</td>
          <td>Night</td>
          <td> $42.22</td>
        </tbody>
      </Table>
    </div>
  );
}

export default Employees;
