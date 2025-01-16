import React, { useState, useEffect } from 'react'; // Correctly import React and hooks
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

    if (loading) return <div className="profile-container"><p>Loading...</p></div>;

    return (
        <div className="profile-page">
            <header className="profile-header">
                {error ? (
                    <h1 className="error-text">Error Loading Profile</h1>
                ) : (
                    <div>
                        <h1 className="welcome-text">Welcome, {userData.username} {userData.last_name}!</h1>
                        <p className="profile-info">ID: {userData.id}</p>
                        <p className="profile-info">Email: {userData.email}</p>
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

export default Profile; // Ensure you are exporting the Profile component
