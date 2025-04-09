import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Biometrics.css';
import { serverURL } from '../api';

const OxygenSaturation = () => {
    const [oxygenSaturationData, setOxygenSaturationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOxygenSaturation = async () => {
            try {
                const response = await fetch(`${serverURL}api/oxygen-saturation/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch oxygen saturation data");
                }
                const data = await response.json();

                // Convert timestamp to readable time format for chart
                const formattedData = data.map(entry => ({
                    time: new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    saturation: entry.data_value,
                }));

                setOxygenSaturationData(formattedData);
            } catch (error) {
                setError(true);
                console.error("Error fetching oxygen saturation data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOxygenSaturation();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setOxygenSaturationData(null);
        setError(false);
        setLoading(false);
        navigate('/'); 
    };

    const handleProfile = () => {
        // Navigate to the profile page
        navigate('/profile'); 
    };

    if (loading) return <div>Loading oxygen saturation data...</div>;
    if (error) return <div>Error fetching oxygen saturation data.</div>;

    return (
        <div className="heart-rate-container">
            <div className="nav2bar">
                <div className="nav2bar-buttons">
                    <button className="nav2-button" onClick={handleProfile}>Profile</button>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            
            <h2>Oxygen Saturation (SpO2)</h2>

            <div className="chart-container">
                <LineChart
                    width={600}
                    height={300}
                    data={oxygenSaturationData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="saturation" stroke="#82ca9d" />
                </LineChart>
            </div>

            <p className="timestamp-text">
                Current SpO2 Level: {oxygenSaturationData[oxygenSaturationData.length - 1]?.saturation}%
            </p>
            <p className="timestamp-text">
                Last Updated: {new Date().toLocaleString()}
            </p>
        </div>
    );
};

export default OxygenSaturation;
