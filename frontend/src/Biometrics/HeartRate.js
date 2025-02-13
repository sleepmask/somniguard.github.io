import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; 
import './Biometrics.css'; 

const HeartRate = () => {
    const [heartRateData, setHeartRateData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchHeartRate = async () => {
            try {
                // Simulate fetching data for heart rate (replace with real API call)
                const sampleData = {
                    rate: 72, // Sample heart rate in BPM
                    timestamp: '2025-02-04 10:00:00',
                };
                setHeartRateData(sampleData); // Set the sample data as heart rate
            } catch (error) {
                setError(true);
                console.error('Error fetching heart rate data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHeartRate(); // Call the function when the component mounts
    }, []); // Empty dependency array ensures this runs once on mount
     // Sample heart rate history for graph (replace with real API data)
     const sampleGraphData = [
        { time: '10:00', bpm: 70 },
        { time: '10:01', bpm: 72 },
        { time: '10:02', bpm: 73 },
        { time: '10:03', bpm: 71 },
        { time: '10:04', bpm: 74 },
    ];

    if (loading) return <div>Loading heart rate data...</div>;
    if (error) return <div>Error fetching heart rate data.</div>;

    return (
        // <div className="heart-rate-container">
        //     <h1>Heart Rate</h1>
        //     <p><strong>BPM:</strong> {heartRateData?.rate}</p>
        //     <p><strong>Timestamp:</strong> {heartRateData?.timestamp}</p>
        // </div>
        <div className="heart-rate-container">
            <h2> Heart Rate </h2>
            {/* <h2 className="bpm-header">❤️ {heartRateData?.rate} BPM</h2> */}
            <h2 className="bpm-header">
                <svg className="heart" viewBox="0 0 32 29.6">
                    <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                        c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
                </svg> {heartRateData?.rate} BPM
            </h2>

            <div className="chart-container">
                <LineChart
                    width={600}
                    height={300}
                    data={sampleGraphData}
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

            <p className="timestamp-text">Last updated: {heartRateData?.timestamp}</p>
        </div>
    );
};

export default HeartRate;