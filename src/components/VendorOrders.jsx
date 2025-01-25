import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VendorOrders.css'

const VendorOrders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('User not authenticated. Please log in.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/orders/vendor', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data);
            } catch (error) {
                setError(error.response?.data?.error || 'Failed to fetch orders.');
            }
        };

        fetchOrders();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className='orders-container'>
            <h2>Orders for Your Products</h2>
            {orders.length === 0 ? (
                <p className='no-orders'>No orders found.</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className="order">
                        <h4>Order ID: {order.id}</h4>
                        <p>Status: {order.status}</p>
                        <p>Total: ${order.total_amount}</p>
                        <p>Order Date: {new Date(order.created_at).toLocaleDateString()}</p>
                        <h5>Items:</h5>
                        <ul>
                            {order.items.map((item, index) => (
                                <li key={index}>
                                    Product ID: {item.product_id}, Quantity: {item.quantity}, Price: ${item.price}
                                </li>
                            ))}
                        </ul>
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
};

export default VendorOrders;
