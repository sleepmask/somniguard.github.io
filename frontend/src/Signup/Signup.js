import React, { useState } from 'react';
import { signup } from '../api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Signup.css';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setValidationErrors({}); // Reset validation errors

        try {
            await signup({
                first_name: firstName,
                last_name: lastName,
                username,
                email,
                password
            });
            setSuccess('Account created successfully! Redirecting to login...');
            // Clear form fields
            setUsername('');
            setPassword('');
            setEmail('');
            setFirstName('');
            setLastName('');

            // Navigate to the login page after a short delay
            setTimeout(() => {
                navigate('/login'); // Replace '/login' with your actual login route
            }, 2000);
        } catch (err) {
            // Parse and set validation errors
            const errorData = JSON.parse(err.message);
            setValidationErrors(errorData);
            console.error('Error signing up:', errorData);
        }
    };

    return (
        <div className="signup-container">
            <div className="form-wrapper">
                <h1 className="signup-heading">Sign Up</h1>
                <form onSubmit={handleSignup} className="signup-form">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        {validationErrors.first_name && validationErrors.first_name.map((error, idx) => (
                            <p key={idx} className="error-message">{error}</p>
                        ))}
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {validationErrors.last_name && validationErrors.last_name.map((error, idx) => (
                            <p key={idx} className="error-message">{error}</p>
                        ))}
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {validationErrors.username && validationErrors.username.map((error, idx) => (
                            <p key={idx} className="error-message">{error}</p>
                        ))}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {validationErrors.email && validationErrors.email.map((error, idx) => (
                            <p key={idx} className="error-message">{error}</p>
                        ))}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password (at least 4 characters):</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {validationErrors.password && validationErrors.password.map((error, idx) => (
                            <p key={idx} className="error-message">{error}</p>
                        ))}
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
