import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/notification', {
                    headers: { authorization: `Bearer ${token}` },
                });
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((note, index) => (
                    <li key={index}>{note.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
