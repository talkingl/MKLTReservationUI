import React from 'react';
import Customer from './Customer';

function CustomerList({ customers, onDelete, onEdit }) {
    return (
        <table id="customers">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Edit Customer</th>
                    <th>Delete Customer</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer, i) => <Customer customer={customer}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default CustomerList;