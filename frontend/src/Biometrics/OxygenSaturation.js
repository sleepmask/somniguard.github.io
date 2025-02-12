import React, { useState, useEffect } from 'react';
// import '../Profile/Profile.css';

const OxygenSaturation = () => {
    const [oxygenSaturationData, setOxygenSaturationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchOxygenSaturation = async () => {
            try {
                // Simulate fetching data for oxygen saturation (replace with real API call)
                const sampleData = {
                    saturation: 98, // Example SpO2 value
                    timestamp: '2025-02-04 10:00:00',
                };
                setOxygenSaturationData(sampleData); // Set the sample data as oxygen saturation
            } catch (error) {
                setError(true);
                console.error('Error fetching oxygen saturation data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOxygenSaturation(); // Call the function when the component mounts
    }, []); // Empty dependency array ensures this runs once on mount

    if (loading) return <div>Loading oxygen saturation data...</div>;
    if (error) return <div>Error fetching oxygen saturation data.</div>;

    return (
        <div className="oxygen-saturation-container">
            <h1>Oxygen Saturation (SpO2)</h1>
            <p><strong>SpO2 Level:</strong> {oxygenSaturationData?.saturation}%</p>
            <p><strong>Timestamp:</strong> {oxygenSaturationData?.timestamp}</p>
        </div>
    );
};

export default OxygenSaturation;
