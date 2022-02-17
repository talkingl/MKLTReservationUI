import React from "react";
import Employee from "./Employee";
import { Table } from "react-bootstrap";

function EmployeeList({
  employees,
  onDelete,
  onEdit,
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
}) {
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
          <th>Edit Employee</th>
          <th>Delete Employee</th>
        </thead>
        <tbody>
          <Employee
            modalShowUpdate={modalShowUpdate}
            setModalShowUpdate={setModalShowUpdate}
            modalShowRemove={modalShowRemove}
            setModalShowRemove={setModalShowRemove}
          ></Employee>
        </tbody>
      </Table>{" "}
    </div>
  );
}

export default EmployeeList;
