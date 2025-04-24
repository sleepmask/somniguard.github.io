import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Biometrics.css';
import { serverURL } from '../api';

const MovementData = () => {
    const [movementData, setMovementData] = useState(null);
    const [averageMagnitude, setAverageMagnitude] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });
    const [availableDates, setAvailableDates] = useState([]);
    const [notableMovements, setNotableMovements] = useState([]);
    const navigate = useNavigate();

    const fetchMovementData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${serverURL}api/movement/?date=${selectedDate}`);
            if (!response.ok) throw new Error("Failed to fetch movement data");
            const data = await response.json();

            const formatted = data.map(entry => {
                const magnitude = Math.sqrt(
                    entry.accel_x ** 2 + entry.accel_y ** 2 + entry.accel_z ** 2
                );
                return {
                    time: new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    magnitude,
                    accel_x: entry.accel_x,
                    accel_y: entry.accel_y,
                    accel_z: entry.accel_z,
                    timestamp: entry.timestamp,
                };
            });

            setMovementData(formatted);

            const totalMag = formatted.reduce((sum, e) => sum + e.magnitude, 0);
            const avg = formatted.length ? (totalMag / formatted.length).toFixed(2) : 0;
            setAverageMagnitude(avg);

            // Adjusting the threshold and limiting the number of notable movements
            const notable = formatted
                .filter(entry => entry.magnitude > 15)  // Adjust threshold here
                .sort((a, b) => b.magnitude - a.magnitude) // Sort by magnitude descending
                .slice(0, 4);  // Limit to top 4 notable movements

            setNotableMovements(notable);
        } catch (err) {
            setError(true);
            console.error("Error fetching movement data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovementData();
    }, [selectedDate]);

    useEffect(() => {
        const fetchAvailableDates = async () => {
            try {
                const response = await fetch(`${serverURL}api/available-sleep-dates/`);
                const dates = await response.json();
                setAvailableDates(dates);
                if (dates.length > 0) setSelectedDate(dates[0]);
            } catch (err) {
                console.error("Failed to fetch available dates:", err);
            }
        };

        fetchAvailableDates();
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

    if (error) return <div>Error fetching movement data.</div>;

    return (
        <div className="heart-rate-container">
            <div className="nav2bar">
                <div className="nav2bar-buttons">
                    <button className="nav2-button" onClick={handleProfile}>Profile</button>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <h2 className="bpm-header">Sleep Movement Activity</h2>
            <h3 className="subheading">
            Track your movement patterns throughout the night to gain insights into sleep quality and activity
            <br />
             levels. This data can help you understand sleep interruptions, trends, and overall movement behavior.

            </h3>
            <br />

            {availableDates.length > 0 && (
                <div className="controls-container">
                    <label htmlFor="date-picker">Select Sleep Night:</label>
                    <select
                        id="date-picker"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="date-select"
                    >
                        {availableDates.map(date => (
                            <option key={date} value={date}>{date}</option>
                        ))}
                    </select>

                    <p className="date-range-text">
                        Showing data from <strong>{selectedDate} 6:00 PM</strong> to <strong>
                        {new Date(new Date(selectedDate).getTime() + 16 * 60 * 60 * 1000).toISOString().split('T')[0]} 12:00 PM
                        </strong>
                    </p>
                </div>
            )}

            {loading ? (
                <div>Loading movement data...</div>
            ) : (
                <div className="chart-container">
                    <LineChart
                        width={600}
                        height={300}
                        data={movementData || []}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip
                        content={({ payload }) => {
                            if (payload && payload.length > 0) {
                                const { time, magnitude } = payload[0].payload;
                            return (
                        <div className="custom-tooltip">
                        <p>{`Time: ${time}`}</p>
                        <p>{`Magnitude: ${magnitude.toFixed(2)}`}</p>
                        </div>
            );
        }
        return null;
    }}
/>

                        <Legend />
                        <Line type="monotone" dataKey="magnitude" stroke="#82ca9d" name="Movement Magnitude" />
                    </LineChart>
                    {movementData && movementData.length === 0 && (
                        <p>No movement data found for the selected sleep night.</p>
                    )}
                </div>
            )}

            <p className="timestamp-text">
                Last updated: {movementData && movementData.length > 0 ? new Date().toLocaleString() : "--"}
            </p>

            {/* Notable Movement Summary Section */}
            <div className="mt-6 bg-white rounded-2xl shadow-md p-4">
                <div className="flex items-center justify-between cursor-pointer">
                    <h2 className="text-lg font-semibold text-gray-800">Notable Movement Over the Session</h2>
                </div>

                {notableMovements.length > 0 ? (
                    notableMovements.map((event, idx) => (
                        <div key={idx} className="p-3 border rounded-lg bg-gray-50 mt-3">
                            <div className="text-sm text-gray-600 font-medium">
                                {new Date(event.timestamp).toLocaleTimeString()}
                            </div>
                            <div className="text-gray-800">
                                Significant movement detected. Magnitude: {event.magnitude.toFixed(2)}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No significant movement detected during this session.</p>
                )}
            </div>
        </div>
    );
};

export default MovementData;
