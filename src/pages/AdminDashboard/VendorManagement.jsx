import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VendorManagement.css'

const VendorManagement = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVendors = async () => {
            const token = localStorage.getItem('token');
            try {
                // Get the list of vendors from the backend
                const response = await axios.get('http://localhost:5000/admin/vendors', {
                    headers: { authorization: `Bearer ${token}` },  // Add token for authentication
                });
                setVendors(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching vendors:", error);
                setLoading(false);
            }
        };

        fetchVendors();
    }, []);

    // Handle approve, suspend, and reactivate actions
    const handleAction = async (id, action) => {
        const token = localStorage.getItem('token');
        try {
            // Perform the corresponding action based on the vendor's ID and action type
            const response = await axios.put(`http://localhost:5000/admin/vendors/${action}/${id}`, {}, {
                headers: { authorization: `Bearer ${token}` },
            });

            // Update vendors list after performing the action
            setVendors(vendors.map(vendor => vendor.id === id ? { ...vendor, ...response.data } : vendor));
        } catch (error) {
            console.error("Error updating vendor:", error);
        }
    };

    return (
        <div className='vendor-management'>
            <h2>Vendor Management</h2>
            {loading ? <p>Loading...</p> : (
                <table>
                    <thead>
                        <tr>
                            <th>Business Name</th>
                            <th>Approval Status</th>
                            <th>Suspension Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendors.map(vendor => (
                            <tr key={vendor.id}>
                                <td>{vendor.business_name}</td>
                                <td>{vendor.is_approved ? 'Approved' : 'Pending'}</td>
                                <td>{vendor.is_suspended ? 'Suspended' : 'Active'}</td>
                                <td>
                                    {!vendor.is_approved && 
                                        <button className='approve' onClick={() => handleAction(vendor.id, 'approve')}>Approve</button>}
                                    {vendor.is_approved && !vendor.is_suspended && 
                                        <button className='suspend' onClick={() => handleAction(vendor.id, 'suspend')}>Suspend</button>}
                                    {vendor.is_suspended && 
                                        <button className='reactivate' onClick={() => handleAction(vendor.id, 'reactivate')}>Reactivate</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default VendorManagement;
