import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import './Home.css';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
          try {
            const token=localStorage.getItem('token');

            if(!token){
                setError('User not authenticated. Please log in.');
                return;
            }

            const response=await axios.get('http://localhost:5000/products',{
                headers:{
                    authorization:`Bearer ${token}`,
                },
            });
            
            setFeaturedProducts(response.data);
        } catch (error) {
            console.log('Error in fetching product ',error);
        }
        };

        fetchFeaturedProducts();
    }, []);

    return (
        <div className="home-page">
            {/* Welcome Section */}
            <section className="welcome-section">
                <h1>Welcome to Our Store</h1>
                <p>All your daily needs at one place!</p>
                <Link to="/customer" className="cta-button">Shop Now</Link>
            </section>

            {/* Featured Products Section */}
            <section className="featured-products">
                <h2>Featured Products</h2>
                <div className="product-grid">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
