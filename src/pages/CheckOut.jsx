import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext';
import axios from 'axios';

const CheckOut = () => {
    const { cart } = useCart();
    const [error, setError] = useState(null);
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    useEffect(() => {
        // Render PayPal button
        if (window.paypal) {
            window.paypal.Buttons({
                createOrder: async (data, actions) => {
                    const token = localStorage.getItem('token');

                    if (!token) {
                        setError('User not authenticated. Please log in.');
                        return;
                    }

                    try {
                        const response = await axios.post('http://localhost:5000/paypal/create-order', { totalAmount }, {
                            headers: {
                                authorization: `Bearer ${token}`,
                            },
                        });

                        return response.data.id; // Return the PayPal order ID to PayPal for approval
                    } catch (error) {
                        setError(error.response ? error.response.data.error : 'Error creating order');
                        console.error(error);
                    }
                },

                onApprove: async (data, actions) => {
                    const token = localStorage.getItem('token');

                    if (!token) {
                        setError('User not authenticated. Please log in.');
                        return;
                    }

                    try {
                        // Send request to capture the payment and process the order
                        const response = await axios.post('http://localhost:5000/paypal/capture-order', {
                            orderId: data.orderID,
                            items: cart,
                            totalAmount,
                        }, {
                            headers: {
                                authorization: `Bearer ${token}`,
                            },
                        });

                        alert('Payment Successful');
                        console.log(response.data); // You can handle the success response here
                    } catch (error) {
                        setError(error.response ? error.response.data.error : 'Error capturing payment');
                        console.error(error);
                    }
                },

                onError: (err) => {
                    console.error('Payment Error: ', err);
                    setError('Error processing the payment.');
                }
            }).render('#paypal-button-container');
        }
    }, [cart, totalAmount]);

    return (
        <div>
            <h2>Checkout</h2>
            {cart.map((item) => (
                <div key={item.id}>
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                </div>
            ))}
            <h3>Total: ${totalAmount.toFixed(2)}</h3>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div id="paypal-button-container"></div>
        </div>
    );
};

export default CheckOut;
