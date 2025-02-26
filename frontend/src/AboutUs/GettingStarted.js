import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

function GettingStarted() {
    return (
        <div className="about-us-page">
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="navbar-links">
                    <Link to="/login" className="btn">Login</Link>
                    <Link to="/signup" className="btn">Create an Account</Link>
                    <Link to="/" className="btn">Home</Link>
                </div>
            </nav>

            <h1>Instructions to set up your account</h1>
            <ol class="ordered-list">
                <li>Find your device ID</li>
                <li>Click Create an Account in the navigation bar at the top right.</li>
                <li>Enter your basic information and make sure you put in the correct device ID.</li>
                <li>You should start seeing results after you wear your device for one night!</li>
            </ol>
            
        </div>
    );
}

export default GettingStarted;