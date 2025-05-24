import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]); // ✅ Initialize as array
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch("https://deploy-mern-app-1-api.vercel.app/products", {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            console.log(result);

            // ✅ Handle response structure
            if (Array.isArray(result)) {
                setProducts(result);
            } else if (Array.isArray(result.products)) {
                setProducts(result.products);
            } else {
                handleError("Unexpected response format");
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Welcome, {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>

            <h2 style={{ marginTop: '2rem' }}>Products</h2>
            <div>
                {products.length > 0 ? (
                    products.map((item, index) => (
                        <ul key={index}>
                            <li><strong>{item.name}</strong>: ₹{item.price}</li>
                        </ul>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>

            <ToastContainer />
        </div>
    );
}

export default Home;
