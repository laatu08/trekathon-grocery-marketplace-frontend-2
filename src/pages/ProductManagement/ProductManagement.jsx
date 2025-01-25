import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProductManagement.css'


const ProductManagement = () => {
    const [product, setProduct] = useState({ name: '', price: '', image_url: '', stock: '', category: '' });
    const { productId } = useParams();
    // const history = useHistory();

    useEffect(() => {
        if (productId) {
            // Fetch product details if editing
            const fetchProduct = async () => {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/vendor/products/${productId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProduct(response.data);
            };
            fetchProduct();
        }
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            if (productId) {
                // Update existing product
                await axios.put(`http://localhost:5000/vendor/products/${productId}`, product, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                // Add new product
                await axios.post('http://localhost:5000/vendor/products', product, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            // history.push('/vendor');
        } catch (error) {
            console.error('Error submitting product:', error);
        }
    };

    return (
        <div className='product-management-container'>
            <h2>{productId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={product.name} onChange={handleChange} required />
                </label>
                <label>
                    Price:
                    <input type="number" name="price" value={product.price} onChange={handleChange} required />
                </label>
                <label>
                    Image Url:
                    <textarea name="description" value={product.image_url} onChange={handleChange}></textarea>
                </label>
                <label>
                    Stock:
                    <input type="number" name="stock" value={product.stock} onChange={handleChange} required />
                </label>
                <label>
                    Category:
                    <input type="text" name="category" value={product.category} onChange={handleChange} required />
                </label>
                <button type="submit">{productId ? 'Update Product' : 'Add Product'}</button>
            </form>
        </div>
    );
};

export default ProductManagement;
