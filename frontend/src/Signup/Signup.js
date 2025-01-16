import React, { useState } from 'react';
import { signup } from '../api'; 
import './Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent form submission from refreshing the page
        setError('');
        setSuccess('');

        try {
            await signup({ username, password, email }); // Call the signup API function
            setSuccess('Account created successfully! You can now log in.');
            setUsername('');
            setPassword('');
            setEmail('');
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
            console.error('Error signing up:', err);
        }
    };

    return (
        <div className="signup-container">
            <div className="form-wrapper">
                <h1 className="signup-heading">Sign Up</h1>
                <form onSubmit={handleSignup} className="signup-form">
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
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit" className="btn">Sign Up</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </div>
        </div>
    );
};

export default Signup;