import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import UserManagement from './UserManagement';
import VendorManagement from './VendorManagement';
import OrderAnalytics from './OrderAnalytics';
import './AdminDashboard.css'

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
            <div className='content'>
                <Routes>
                    <Route path="users" element={<UserManagement />} />
                    <Route path="vendors" element={<VendorManagement />} />
                    <Route path="analytics" element={<OrderAnalytics />} />
                </Routes>
            </div>
            
        </div>
    );
};

export default AdminDashboard;
