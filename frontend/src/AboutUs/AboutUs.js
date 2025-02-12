import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css'; 

function AboutUs() {
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

            <h1>Our Mission</h1>
            <p>
                SomniGuard is a smart sleep mask device designed to provide personalized therapeutics for users. Our goal is to help you implement small lifestyle changes to sleep smarter and wake happier.
            </p>
            <p>
                Whether you suffer from sleep disorders or just want to improve your daily routine, our app is here to help!
            </p>

            <h1>Who We Are</h1>
            <p>
                SomniGuard is a smart sleep mask device designed to provide personalized therapeutics for users. Our goal is to help you implement small lifestyle changes to sleep smarter and wake happier.
            </p>

             <div className="button-container">
                <Link to="/signup" className="btn">Getting Started</Link>
            </div>
            
        </div>
    );
}

export default AboutUs;
