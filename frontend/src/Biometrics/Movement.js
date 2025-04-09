import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Biometrics.css';
import { serverURL } from '../api';

const MovementData = () => {
    const [movementData, setMovementData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovementData = async () => {
            try {
                const response = await fetch(`${serverURL}api/movement/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch movement data");
                }
                const data = await response.json();
                const formattedData = data.map(entry => {
                    const magnitude = Math.sqrt(
                        Math.pow(entry.accel_x, 2) + Math.pow(entry.accel_y, 2) + Math.pow(entry.accel_z, 2)
                    );
                    return {
                        timestamp: new Date(entry.timestamp),
                        time: new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        accel_x: entry.accel_x,
                        accel_y: entry.accel_y,
                        accel_z: entry.accel_z,
                        magnitude: magnitude
                    };
                });
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
        navigate('/');
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#333', color: '#fff', padding: '10px', borderRadius: '5px' }}>
                    <p><strong>Time:</strong> {payload[0].payload.timestamp.toLocaleString()}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }}>
                            {entry.name}: {entry.value.toFixed(2)}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
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
                    <XAxis dataKey="time" interval="preserveStartEnd" tickFormatter={(tick) => tick} />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="accel_x" stroke="#8884d8" />
                    <Line type="monotone" dataKey="accel_y" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="accel_z" stroke="#ff0000" />
                </LineChart>
            </div>

            <h2>Movement Data Magnitude</h2>

            <div className="chart-container">
                <LineChart
                    width={600}
                    height={300}
                    data={movementData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" interval="preserveStartEnd" tickFormatter={(tick) => tick} />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="magnitude" stroke="#ff7300" />
                </LineChart>
            </div>

            <p className="timestamp-text">
                Last updated: {new Date().toLocaleString()}
            </p>
        </div>
    );
};

export default MovementData;
