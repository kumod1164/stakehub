import React from 'react';

const PendingOrdersTable = ({ orders }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Buyer Qty</th>
                    <th>Buyer Price</th>
                    <th>Seller Price</th>
                    <th>Seller Qty</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                    <tr key={index}>
                        <td>{order.buyerQty || '-'}</td>
                        <td>{order.buyerPrice || '-'}</td>
                        <td>{order.sellerPrice || '-'}</td>
                        <td>{order.sellerQty || '-'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PendingOrdersTable;
