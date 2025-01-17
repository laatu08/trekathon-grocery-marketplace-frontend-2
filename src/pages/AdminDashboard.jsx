import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Admin not authenticated. Please log in.");
        return;
      }

      try {
        const [userRes, productRes, orderRes] = await Promise.all([
          axios.get("http://localhost:5000/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/admin/products", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/admin/orders", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUsers(userRes.data);
        setProducts(productRes.data);
        setOrders(orderRes.data);
      } catch (error) {
        setError(error.response?.data?.error || "Failed to fetch data.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Users</h2>
        {users.map((user) => (
          <div key={user.id}>
            <p>
              {user.name} ({user.role})
            </p>
          </div>
        ))}
      </div>
      <div>
        <h2>Products</h2>
        {products.map((product) => (
          <div key={product.id}>
            <p>
              {product.name} - ${product.price}
            </p>
          </div>
        ))}
      </div>
      <div>
        <h2>Orders</h2>
        {orders.map((order) => (
          <div key={order.id}>
            <p>
              Order ID: {order.id}, Total: ${order.total_amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
