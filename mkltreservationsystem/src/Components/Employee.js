import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";


function Employee({
  modalShowUpdate,
  setModalShowUpdate,
  modalShowRemove,
  setModalShowRemove,
  onEdit,
  onDelete,
  employee,
}) {
  return (
    <tr>
      <td>{employee.employeeID}</td>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.shiftWorked}</td>
      <td>${employee.payRate}</td>
      <td>
        <MdEdit onClick={() => {
          onEdit(employee);
          setModalShowUpdate(true)
        }} />
      </td>
      <td>
        <MdDelete onClick={() => {
          onDelete(employee);
          setModalShowRemove(true)
        }} />
      </td>
    </tr>
  );
}

export default Employee;
