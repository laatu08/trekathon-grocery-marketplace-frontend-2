import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import './Navbar.css'

// const socket = io('http://localhost:5000'); // Backend URL

const Navbar = () => {
//     const [notifications, setNotifications] = useState([]);

//     useEffect(() => {
//         const userId = localStorage.getItem('userId'); // Replace with your logic for user ID
//         if (userId) {
//             socket.emit('register', userId); // Register the user for notifications
//         }

//         socket.on('notification', (data) => {
//             setNotifications((prev) => [...prev, data.message]);
//         });

//         return () => {
//             socket.disconnect(); // Cleanup on unmount
//         };
//     }, []);

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/customer">Customer Dashboard</Link>
            <Link to="/vendor">Vendor Dashboard</Link>
            <Link to="/admin">Admin Dashboard</Link>
            <Link to="/cart">Cart</Link>
            {/* <Link to="/checkout">Checkout</Link> */}
            <Link to="/notify">Notification</Link>
            <Link to="/customer/orders">Orders</Link>
            <Link to="/vendor/orders">Sales</Link>
            <Link to="/login">Login</Link>

            {/* <div className="notifications">
                <span>Notifications ({notifications.length})</span>
                <div className="notification-dropdown">
                    {notifications.map((note, index) => (
                        <p key={index}>{note}</p>
                    ))}
                </div>
            </div> */}
        </nav>
    );
};

export default Navbar;
