import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; 
import './Biometrics.css';
import { serverURL } from '../api';

const HeartRate = () => {
    const [heartRateData, setHeartRateData] = useState(null);
    const [averageHeartRate, setAverageHeartRate] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // e.g. "2025-04-09"
    });

    const fetchHeartRate = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${serverURL}api/heart-rate/?date=${selectedDate}`);
            if (!response.ok) throw new Error("Failed to fetch");
            const data = await response.json();
    
            const formattedData = data.map(entry => ({
                time: new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                bpm: entry.data_value
            }));
    
            setHeartRateData(formattedData);
    
            const totalBpm = formattedData.reduce((sum, entry) => sum + entry.bpm, 0);
            const avgBpm = formattedData.length ? (totalBpm / formattedData.length).toFixed(1) : 0;
            setAverageHeartRate(avgBpm);
        } catch (error) {
            setError(true);
            console.error("Error fetching heart rate data:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchHeartRate();
    }, [selectedDate]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setHeartRateData(null);
        setError(false);
        setLoading(false);
        navigate('/somniguard.github.io/');
    };

    const handleProfile = () => {
        // Navigate back to the profile page
        navigate('/profile'); 
    };

    if (loading) return <div>Loading heart rate data...</div>;
    if (error) return <div>Error fetching heart rate data.</div>;

    return (
        <div className="heart-rate-container">
            <div className="nav2bar">
                <div className="nav2bar-buttons">
                    <button className="nav2-button" onClick={handleProfile}>Profile</button>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <h2> Heart Rate </h2>
            <h2 className="bpm-header">
                <svg className="heart" viewBox="0 0 32 29.6">
                    <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                        c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
                 </svg> {averageHeartRate} BPM
            </h2>

            <div className="chart-container">
                <label htmlFor="date-picker">Select Sleep Night: </label>
                <input
                    id="date-picker"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                />
                <button onClick={fetchHeartRate}>Refresh</button>

                <LineChart
                    width={600}
                    height={300}
                    data={heartRateData || []} // If heartRateData is null, pass an empty array
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="bpm" stroke="#8884d8" />
                </LineChart>
            </div>

            <p className="avg-heart-rate">Average Heart Rate (Last Night): <strong>{averageHeartRate} BPM</strong></p>

            <p className="timestamp-text">
                Last updated: {heartRateData && heartRateData.length > 0 ? new Date().toLocaleString() : "--"}
            </p>
        </div>
    );
};

export default HeartRate;
