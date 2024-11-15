import React from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './Home.css'; // Ensure you're importing the updated Home.css file

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
                    <Link to="/example" className="btn example-link">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
