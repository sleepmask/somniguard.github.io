import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css'; // Add custom styles for the About Us page

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

            <h1>About Us</h1>
            <p>
                SomniGuard is dedicated to helping you improve your sleep quality through innovative technology.
                Our mission is to make sure you sleep smarter and wake happier. 

            </p>
            <p>
                Whether you suffer from sleep disorders or just want to improve your daily routine, our app is here to help!
            </p>
        </div>
    );
}

export default AboutUs;
