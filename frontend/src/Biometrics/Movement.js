import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Biometrics.css';

const MovementData = () => {
    const [movementData, setMovementData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchMovementData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/movement/");
                if (!response.ok) {
                    throw new Error("Failed to fetch movement data");
                }
                const data = await response.json();
                const formattedData = data.map(entry => ({
                  time: new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  accel_x: entry.accel_x,
                  accel_y: entry.accel_y,
                  accel_z: entry.accel_z
              }));
              setMovementData(formattedData);
            } catch (error) {
                setError(true);
                console.error("Error fetching movement data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovementData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setMovementData(null);
        setError(false);
        setLoading(false);
        // Redirect to the login page after logging out
        window.location.href = '/login'; 
    };

    const handleProfile = () => {
        // Navigate back to the profile page
        window.location.href = '/profile'; 
    };

    if (loading) return <div>Loading movement data...</div>;
    if (error) return <div>Error fetching movement data.</div>;

    return (
        <div className="heart-rate-container">
            <div className="nav2bar">
                <div className="nav2bar-buttons">
                    <button className="nav2-button" onClick={handleProfile}>Profile</button>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            
            <h2>Movement Data (Acceleration on X, Y, Z)</h2>

            <div className="chart-container">
                <LineChart
                    width={600}
                    height={300}
                    data={movementData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="accel_x" stroke="#8884d8" />
                    <Line type="monotone" dataKey="accel_y" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="accel_z" stroke="#ff0000" />
                </LineChart>
            </div>

            <p className="timestamp-text">
                Last updated: {new Date().toLocaleString()}
            </p>
        </div>
    );
};

export default MovementData;
