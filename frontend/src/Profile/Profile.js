import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = ({ onLogout }) => {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    console.error('No token found');
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
                    setUsername(data.username);
                } else {
                    console.error('Failed to fetch profile:', response.status);
                    setUsername(null); // Explicitly handle error state
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                setUsername(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <div className="profile-container"><p>Loading...</p></div>;
    if (username === null) return <div className="profile-container"><p>Error loading profile.</p></div>;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1>Welcome, {username}!</h1>
                <button className="logout-button" onClick={onLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Profile;
