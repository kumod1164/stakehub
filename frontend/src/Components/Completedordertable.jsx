import React from 'react';

const CompletedOrdersTable = ({ orders }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Price</th>
                    <th>Qty</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                    <tr key={index}>
                        <td>{order.price}</td>
                        <td>{order.qty}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CompletedOrdersTable;
