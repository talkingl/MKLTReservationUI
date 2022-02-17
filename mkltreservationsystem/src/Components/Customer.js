import React from 'react';
import {MdDelete, MdEdit} from 'react-icons/md';


function Customer({ customer, onDelete, onEdit }) {
    return (
        <tr>
            <td>{customer.customerID}</td>
            <td>{customer.firstName}</td>
            <td>{customer.lastName}</td>
            <td>{customer.emailAddress}</td>
            <td>{customer.phoneNumber}</td>
            <td><MdEdit onClick={() => onEdit(customer)}/></td>
            <td><MdDelete onClick={() => onDelete(customer.customerID)} /></td>
        </tr>
    );
}

export default Customer;