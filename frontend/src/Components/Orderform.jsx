import React, { useState } from 'react';

const OrderForm = ({ onSubmit }) => {
    const [buyerQty, setBuyerQty] = useState('');
    const [buyerPrice, setBuyerPrice] = useState('');
    const [sellerPrice, setSellerPrice] = useState('');
    const [sellerQty, setSellerQty] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            buyerQty: parseInt(buyerQty, 10),
            buyerPrice: parseFloat(buyerPrice),
            sellerPrice: parseFloat(sellerPrice),
            sellerQty: parseInt(sellerQty, 10)
        });
        setBuyerQty('');
        setBuyerPrice('');
        setSellerPrice('');
        setSellerQty('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Buyer Qty:</label>
            <input
                type="number"
                value={buyerQty}
                onChange={(e) => setBuyerQty(e.target.value)}
                required
            />
            <label>Buyer Price:</label>
            <input
                type="number"
                value={buyerPrice}
                onChange={(e) => setBuyerPrice(e.target.value)}
                required
            />
            <label>Seller Price:</label>
            <input
                type="number"
                value={sellerPrice}
                onChange={(e) => setSellerPrice(e.target.value)}
                required
            />
            <label>Seller Qty:</label>
            <input
                type="number"
                value={sellerQty}
                onChange={(e) => setSellerQty(e.target.value)}
                required
            />
            <button type="submit">Place Order</button>
        </form>
    );
};

export default OrderForm;
