import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { login } from '../api';  // Import the login function from api.js
import './Login.css';  

const Login = () => {
    const [username, setUsername] = useState(''); // State for username
    const [password, setPassword] = useState(''); // State for password
    const [error, setError] = useState(''); // State for error messages

    // Define the handleLogin function inside the component
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form submission from refreshing the page

        try {
            const data = await login(username, password); // Call login API function
            // Store the access token in localStorage
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

             // Log the stored tokens to confirm
            console.log('Access Token Stored:', localStorage.getItem('access_token'));
            console.log('Refresh Token Stored:', localStorage.getItem('refresh_token'));

            alert(`Welcome ${username}`); // Optionally show a welcome message
            window.location.href = '/profile'; // Redirect to the profile page
        } catch (err) {
            // Display error message if login fails
            setError(err.message || 'Login failed');
            console.error('Error logging in:', err);
        }
    };

    return (
        <div className="login-container">
            <div className="form-wrapper">
                <h1 className="login-heading">Login</h1>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit" className="btn">Login</button>
                        <Link to="/signup" className="btn">Create Account</Link>
                    </div>
                    
                </form>
                {error && <p className="error-message">{error}</p>} {/* Show error message */}
            </div>
        </div>
    );
};

export default Login;
