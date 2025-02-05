
import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = ({ onLogout }) => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('access_token');

                if (!token) {
                    console.error('No token found');
                    setError(true);
                    setLoading(false);
                    return;
                }

                const response = await fetch('http://127.0.0.1:8000/profile/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched Profile Data:", data);  // Debugging line
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
    }, []);


    const handleLogout = () => {
        localStorage.removeItem('access_token');
        onLogout();
        window.location.href = '/login';
    };

    // Function to calculate age
    const calculateAge = (dob) => {
        if (!dob) return 'N/A';
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    if (loading) return <div className="profile-container"><p>Loading...</p></div>;

    return (
        <div className="profile-page">
            <header className="profile-header">
                {error ? (
                    <h1 className="error-text">Error Loading Profile</h1>
                ) : (
                    <div>
                        <h1 className="welcome-text">Welcome, {userData.first_name} {userData.last_name}!</h1>
                        <p className="profile-info">Username: {userData.username}</p>
                        <p className="profile-info">User ID: {userData.id}</p>
                        <p className="profile-info">Email: {userData.email}</p>
                        <p className="profile-info">Date of Birth: {userData.date_of_birth}</p>
                        <p className="profile-info">Age: {calculateAge(userData.date_of_birth)}</p>
                    </div>
                )}
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </header>

            {!error && (
                <main className="metrics-section">
                    <h2>Sleep Metrics Overview</h2>
                    <div className="metrics-grid">
                        <div className="metric-card">
                            <h3>Heart Rate</h3>
                            <p>Monitor your resting heart rate and heart rate variability for better insight into your health and sleep quality.</p>
                        </div>
                        <div className="metric-card">
                            <h3>Movement</h3>
                            <p>Track your movement during sleep to understand restlessness and identify patterns that affect your sleep cycles.</p>
                        </div>
                        <div className="metric-card">
                            <h3>SpO<sub>2</sub> Levels</h3>
                            <p>Measure the oxygen saturation in your blood to ensure you're getting enough oxygen during sleep.</p>
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