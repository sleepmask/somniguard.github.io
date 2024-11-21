import React from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';  // Corrected import for Link
import './Home.css'; 

function Home() {
    return (
        <div className="home-container">
            <div className="logo-container">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="text-content">
                <h1>Welcome to SomniGuard</h1>
                <p className="tagline">Sleep Smarter, Wake Happier.</p>
                <div className="cta-buttons">
                    {/* Change "Learn React" to "About Us" and update the link */}
                    <Link to="/about-us" className="btn">About Us</Link>
                    <Link to="/login" className="btn">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
