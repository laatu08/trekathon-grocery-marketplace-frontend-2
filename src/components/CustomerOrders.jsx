import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerOrders = () => {
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
                const response = await axios.get('http://localhost:5000/orders/customer', {
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
        <div>
            <h2>Your Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
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

export default CustomerOrders;
