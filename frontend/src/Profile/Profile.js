﻿import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation links
import './Profile.css';
import { serverURL } from '../api';

const Profile = ({ onLogout }) => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('access_token');
                console.log("Token:", token);

                if (!token) {
                    console.error('No token found');
                    setError(true);
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${serverURL}profile/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 401) {
                    console.error('Token is invalid or expired');
                    localStorage.removeItem('access_token');  
                    navigate('/login'); 
                    return;
                }

                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched Profile Data:", data);
                    setUserData(data);
                } else {
                    setError(true);
                }
            } catch (error) {
                setError(true);
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();

        // Update time every second
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setUserData(null);  
        setError(false);    
        setLoading(false);
        onLogout();
        navigate('/');
    };

    const today = new Date().toLocaleDateString();

    // Age calculation function
    const calculateAge = (birthDate) => {
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDifference = today.getMonth() - birth.getMonth();
        // If the current month is before the birth month or if it's the same month but the current day is before the birth day, subtract 1 from age
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };


    if (loading) return <div className="profile-container"><p>Loading...</p></div>;

    if (!userData) {
        return <div className="profile-container"><p>Error loading user data. Please try again later.</p></div>;
    }

    return (
        <div className="profile-page">
            {/* Profile Header */}
            <header className="profile-header">
                <div className="header-content">
                    <div className="header-left">
                        <div className="welcome-container">
                            <h1 className="welcome-text">Welcome, {userData.first_name || userData.last_name || userData.username}!</h1>
                            <p className="date-time">{today} | {currentTime}</p>
                        </div>
                    </div>
                    <nav className="nav2bar">
                        <div className="nav2bar-buttons">
                            <Link to="/heart-rate" className="nav2-button">
                                Heart Rate
                            </Link>
                            <Link to="/movement" className="nav2-button">
                                Movement
                            </Link>
                            <Link to="/oxygen-saturation" className="nav2-button">
                                SpO2
                            </Link>
                            <button className="logout-button" onClick={handleLogout}>Logout</button>
                        </div>
                    </nav>
                </div>
            </header>

            <hr className="separator" />

            {!error && (
                <div className="user-info-container">
                    <h2 className="user-info-title">User Information</h2>

                    <div className="user-profile">
                        <div className="profile-picture-placeholder"></div>
                        <div className="profile-text">
                            <h3>Username</h3>
                            <p>{userData.username}</p>
                            <h3>Email</h3>
                            <p>{userData.email}</p>
                        </div>
                    </div>

                    <div className="user-info-grid">
                        <div className="info-card"><h3>Name</h3><p>{userData.first_name + " " + userData.last_name}</p></div>
                        <div className="info-card"><h3>Email</h3><p>{userData.email}</p></div>
                        <div className="info-card"><h3>Device ID</h3>Coming soon...<p>{}</p></div>
                        <div className="info-card"><h3>Date of Birth</h3><p>{userData.date_of_birth}</p></div>
                        <div className="info-card"><h3>Age</h3><p>{calculateAge(userData.date_of_birth)}</p></div>
                        <div className="info-card"><h3>Join Date</h3><p>{userData.date_joined}</p></div>

                    </div>
                </div>
            )}

            {!error && (
                <main className="metrics-section">
                    <h2>Sleep Metrics Overview</h2>
                    <div className="metrics-grid">
                        <div className="metric-card">
                            <Link to="/heart-rate" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <h3>Heart Rate</h3>
                                <p>Monitor your resting heart rate and heart rate variability for better insight into your health and sleep quality.</p>
                            </Link>
                            {/* <Link to="/heart-rate" className="text-blue-500">View Heart Rate Data</Link> */}
                        </div>
                        <div className="metric-card">
                            <Link to="/movement" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <h3>Movement</h3>
                                <p>Track your movement during sleep to understand restlessness and identify patterns that affect your sleep cycles.</p>
                            </Link>
                        </div>
                        <div className="metric-card">
                            <Link to="/oxygen-saturation" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <h3>SpO<sub>2</sub> Levels</h3>
                                <p>Measure the oxygen saturation in your blood to ensure you're getting enough oxygen during sleep.</p>
                            </Link>
                        </div>
                    </div>
                </main>
            )}

            <footer className="profile-footer">
                <p>Enhancing sleep one night at a time with cutting-edge technology.</p>
            </footer>
        </div>
    );
};

export default Profile;
