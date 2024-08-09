import React, { useState } from 'react';
import OrderForm from './Components/Orderform';
import PendingOrdersTable from './Components/Pendingordertable';
import CompletedOrdersTable from './Components/Completedordertable';
import PriceChart from './Components/Pricechart';
import Loader from './Components/Loader'; // Import the Loader component
import './Components/Styles/global.css';
import './Components/Styles/orderForm.css';
import './Components/Styles/orderTable.css';
import './Components/Styles/priceChart.css';
import './Components/Styles/loader.css';

const App = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [priceData, setPriceData] = useState([]);
    const [loading, setLoading] = useState(false); // State for loading

    // Function to handle order submission
    const handleOrderSubmit = (order) => {
        setLoading(true); // Show loader

        // Add new order to the pending orders
        const newPendingOrders = [...pendingOrders, order];

        // Process matching logic
        const { completedOrders, remainingOrders } = matchOrders(newPendingOrders);

        // Update state
        setPendingOrders(remainingOrders);
        setCompletedOrders(completedOrders);
        setPriceData(updatePriceData(completedOrders));

        setLoading(false); // Hide loader
    };

    // Function to match orders
    const matchOrders = (orders) => {
        const pendingBuyers = orders.filter(o => o.buyerQty > 0);
        const pendingSellers = orders.filter(o => o.sellerQty > 0);

        let completedOrders = [];
        let remainingOrders = [];

        pendingBuyers.forEach(buyer => {
            let remainingQty = buyer.buyerQty;

            pendingSellers.forEach(seller => {
                if (buyer.buyerPrice >= seller.sellerPrice && remainingQty > 0) {
                    const matchedQty = Math.min(remainingQty, seller.sellerQty);
                    remainingQty -= matchedQty;
                    completedOrders.push({
                        price: seller.sellerPrice,
                        qty: matchedQty
                    });
                    seller.sellerQty -= matchedQty;
                }
            });

            if (remainingQty > 0) {
                remainingOrders.push({
                    ...buyer,
                    buyerQty: remainingQty
                });
            }
        });

        // Include remaining sellers
        pendingSellers.forEach(seller => {
            if (seller.sellerQty > 0) {
                remainingOrders.push({
                    ...seller,
                    sellerQty: seller.sellerQty
                });
            }
        });

        return { completedOrders, remainingOrders };
    };

    // Function to update price data for the chart
    const updatePriceData = (completedOrders) => {
        const priceMap = {};

        completedOrders.forEach(order => {
            if (!priceMap[order.price]) {
                priceMap[order.price] = 0;
            }
            priceMap[order.price] += order.qty;
        });

        return Object.keys(priceMap).map(price => ({
            price: parseFloat(price),
            qty: priceMap[price]
        }));
    };

    return (
        <div className="container">
            <h1>Order Matching System</h1>
            <OrderForm onSubmit={handleOrderSubmit} />
            {loading && <Loader />} {/* Show loader when loading */}
            <h2>Pending Orders</h2>
            <PendingOrdersTable orders={pendingOrders} />
            <h2>Completed Orders</h2>
            <CompletedOrdersTable orders={completedOrders} />
            <h2>Price Chart</h2>
            <PriceChart data={priceData} />
        </div>
    );
};

export default App;
