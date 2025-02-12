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
            <h1>and start improving your sleep below!</h1>
            <p>
                1. Find your device ID 
                2. Click Create an Account in the navigation bar at the top right.
                3. Enter your basic information and make sure you put in the correct device ID.
                4. You should start seeing results after you wear your device for one night!
            </p>
            
        </div>
    );
}

export default GettingStarted;