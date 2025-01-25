import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import CustomerDashboard from './pages/CustomerDashboard/CustomerDashboard';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login/Login';
import Cart from './components/Cart';
import CheckOut from './pages/CheckOut/CheckOut';
import CustomerOrders from './components/CustomerOrders';
import VendorOrders from './components/VendorOrders';
import Notifications from './pages/Notification/Notification';
import ProductManagement from './pages/ProductManagement/ProductManagement';

const App=()=>{
  return (
    <Router>
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>

        <Route path="/customer" element={<CustomerDashboard></CustomerDashboard>}></Route>
        <Route path="/vendor" element={<VendorDashboard></VendorDashboard>}></Route>
        <Route path="/admin/*" element={<AdminDashboard></AdminDashboard>}></Route>

        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/checkout' element={<CheckOut></CheckOut>}></Route>

        <Route path='/customer/orders' element={<CustomerOrders></CustomerOrders>}></Route>
        <Route path='/vendor/orders' element={<VendorOrders></VendorOrders>}></Route>

        <Route path='/notify' element={<Notifications></Notifications>}></Route>

        <Route path="/vendor/products/add" element={<ProductManagement />} />
        <Route path="/vendor/products/edit/:productId" element={<ProductManagement />} />
      </Routes>

      <Footer></Footer>
    </Router>
  );
};


export default App;