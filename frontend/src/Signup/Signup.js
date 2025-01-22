import React, { useState } from 'react';
import { signup } from '../api';
import './Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setValidationErrors({});  // Reset validation errors

        try {
            await signup({
                username,
                password,
                email,
                first_name: firstName,
                last_name: lastName,
            });
            setSuccess('Account created successfully! You can now log in.');
            setUsername('');
            setPassword('');
            setEmail('');
            setFirstName('');
            setLastName('');
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
                        {/* Display errors for first name */}
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
                        {/* Display errors for last name */}
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
                        {/* Display errors for username */}
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
                        {/* Display errors for email */}
                        {validationErrors.email && validationErrors.email.map((error, idx) => (
                            <p key={idx} className="error-message">{error}</p>
                        ))}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* Display errors for password */}
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
