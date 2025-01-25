import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderAnalytics.css'

const OrderAnalytics = () => {
    const [analytics, setAnalytics] = useState({
        totalSales: 0,
        topProducts: [],
        vendorPerformance: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            const token = localStorage.getItem('token');
            try {
                const totalSales = await axios.get('http://localhost:5000/admin/analytics/total-sales', {
                    headers: { authorization: `Bearer ${token}` },
                });
                const topProducts = await axios.get('http://localhost:5000/admin/analytics/top-products', {
                    headers: { authorization: `Bearer ${token}` },
                });
                const vendorPerformance = await axios.get('http://localhost:5000/admin/analytics/vendor-performance', {
                    headers: { authorization: `Bearer ${token}` },
                });
                setAnalytics({
                    totalSales: totalSales.data.totalSales,
                    topProducts: topProducts.data,
                    vendorPerformance: vendorPerformance.data
                });
                console.log(analytics);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching analytics:", error);
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    return (
        <div className='order-analytics'>
            <h2>Order Analytics</h2>
            {loading ? <p>Loading...</p> : (
                <div>
                    <h3>Total Sales: ${analytics.totalSales}</h3>
                    <h4>Top Selling Products</h4>
                    <ul>
                        {analytics.topProducts.map(product => (
                            <li key={product.name}>{product.name}: {product.total_quantity} units sold</li>
                        ))}
                    </ul>
                    <h4>Vendor Performance</h4>
                    <ul>
                        {analytics.vendorPerformance.map(vendor => (
                            <li key={vendor.vendor_name}>{vendor.vendor_name}: ${vendor.total_sales} in sales</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default OrderAnalytics;
