import React, { useState } from 'react';
import { login } from '../api';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password
  const [error, setError] = useState(''); // State for error messages

  // Define the handleLogin function inside the component
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    try {
      const data = await login(username, password); // Call API function
      localStorage.setItem('token', data.token); // Store token in local storage
      alert(`Welcome ${data.username}`); // Show a success message
      window.location.href = '/dashboard'; // Redirect to dashboard or another page
    } catch (err) {
      setError(err.error || 'Login failed'); // Display error message
      console.error("Error logging in:", err);
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
          <button type="submit" className="btn">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
