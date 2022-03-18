import React from "react";
import Employee from "./Employee";
import { Table } from "react-bootstrap";

function EmployeeList({
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
  onEdit,
  onDelete,
  employees,
}) {
  return (
    <div>
      <h1> Employees</h1>
      <Table hover variant="dark">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Shift Worked</th>
            <th>Pay Rate</th>
            <th>Edit Employee</th>
            <th>Delete Employee</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((employee, i) => (
            <Employee
              key={i}
              modalShowUpdate={modalShowUpdate}
              setModalShowUpdate={setModalShowUpdate}
              modalShowRemove={modalShowRemove}
              setModalShowRemove={setModalShowRemove}
              onEdit={onEdit}
              onDelete={onDelete}
              employee={employee}
            ></Employee>
          ))}
        </tbody>
      </Table>{" "}
    </div>
  );
}

export default EmployeeList;
