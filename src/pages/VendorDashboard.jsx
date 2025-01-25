import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './VendorDashBoard.css'

const VendorDashboard = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch vendor products
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/vendor/products', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(response.data);
        };

        // Fetch vendor orders
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/orders/vendor', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(response.data);
        };

        fetchProducts();
        fetchOrders();
    }, []);

    return (
        <div className='vendor-dashboard-container'>
            <h2>Vendor Dashboard</h2>
            <div>
                <h3>Products</h3>
                <Link to="/vendor/products/add">Add New Product</Link>
                <ul className='order-list'>
                    {products.map((product) => (
                        <li key={product.id}>
                            <h4>{product.name}</h4>
                            <p>Price: ${product.price}</p>
                            <p>Stock: {product.stock}</p>
                            <Link to={`/vendor/products/edit/${product.id}`}>Edit</Link> |
                            <button>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Orders</h3>
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            <h4>Order ID: {order.id}</h4>
                            <p>Total: ${order.total_amount}</p>
                            <p>Status: {order.status}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VendorDashboard;
