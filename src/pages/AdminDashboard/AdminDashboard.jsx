import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import UserManagement from './UserManagement';
import VendorManagement from './VendorManagement';
import OrderAnalytics from './OrderAnalytics';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <nav>
                <ul>
                    {/* Use absolute paths */}
                    <li><Link to="/admin/users">User Management</Link></li>
                    <li><Link to="/admin/vendors">Vendor Management</Link></li>
                    <li><Link to="/admin/analytics">Order Analytics</Link></li>
                </ul>
            </nav>

            {/* Routes */}
            <Routes>
                <Route path="users" element={<UserManagement />} />
                <Route path="vendors" element={<VendorManagement />} />
                <Route path="analytics" element={<OrderAnalytics />} />
            </Routes>
        </div>
    );
};

export default AdminDashboard;
