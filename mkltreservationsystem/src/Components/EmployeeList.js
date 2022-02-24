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
          <th>Employee ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Shift Worked</th>
          <th>Pay Rate</th>
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
