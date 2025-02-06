import React, { useState, useEffect } from 'react';
// import '../Profile/Profile.css';

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

    if (loading) return <div>Loading heart rate data...</div>;
    if (error) return <div>Error fetching heart rate data.</div>;

    return (
        <div className="heart-rate-container">
            <h1>Heart Rate</h1>
            <p><strong>BPM:</strong> {heartRateData?.rate}</p>
            <p><strong>Timestamp:</strong> {heartRateData?.timestamp}</p>
        </div>
    );
};

export default HeartRate;