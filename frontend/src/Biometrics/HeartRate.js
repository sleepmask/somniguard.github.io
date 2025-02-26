import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; 
import './Biometrics.css'; 

const HeartRate = () => {
    const [heartRateData, setHeartRateData] = useState(null);
    const [averageHeartRate, setAverageHeartRate] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchHeartRate = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/heart-rate/");
                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }
                const data = await response.json();

                // Convert timestamp to readable time format for chart
                const formattedData = data.map(entry => ({
                    time: new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    bpm: entry.data_value
                }));

                setHeartRateData(formattedData);

                // Calculate average heart rate
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

        fetchHeartRate();
    }, []);

    if (loading) return <div>Loading heart rate data...</div>;
    if (error) return <div>Error fetching heart rate data.</div>;

    return (
        <div className="heart-rate-container">
            <h2> Heart Rate </h2>
            <h2 className="bpm-header">
                <svg className="heart" viewBox="0 0 32 29.6">
                    <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                        c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
                 </svg> {heartRateData.length > 0 ? heartRateData[heartRateData.length - 1].bpm : "--"} BPM
            </h2>

            <div className="chart-container">
                <LineChart
                    width={600}
                    height={300}
                    data={heartRateData}
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

            {/* Display Average Heart Rate */}
            <p className="avg-heart-rate">Average Heart Rate (Last Night): <strong>{averageHeartRate} BPM</strong></p>

            {/* <p className="timestamp-text">Last updated: {heartRateData?.timestamp}</p> */}
            <p className="timestamp-text">
                Last updated: {heartRateData.length > 0 ? new Date().toLocaleString() : "--"}
            </p>
        </div>
    );
};

export default HeartRate;

// sample code to display different tabs for day, week, month, year 

// const HeartRate = () => {
//     // Sample data for a day (hourly intervals)
//     const hourlyData = [
//         { time: '00:00', bpm: 72 },
//         { time: '01:00', bpm: 74 },
//         { time: '02:00', bpm: 70 },
//         { time: '03:00', bpm: 75 },
//         { time: '04:00', bpm: 68 },
//         { time: '05:00', bpm: 71 },
//         { time: '06:00', bpm: 76 },
//         { time: '07:00', bpm: 78 },
//         { time: '08:00', bpm: 80 },
//         { time: '09:00', bpm: 74 },
//         { time: '10:00', bpm: 72 },
//         { time: '11:00', bpm: 70 },
//         { time: '12:00', bpm: 75 },
//         { time: '13:00', bpm: 78 },
//         { time: '14:00', bpm: 76 },
//         { time: '15:00', bpm: 74 },
//         { time: '16:00', bpm: 72 },
//         { time: '17:00', bpm: 71 },
//         { time: '18:00', bpm: 73 },
//         { time: '19:00', bpm: 77 },
//         { time: '20:00', bpm: 79 },
//         { time: '21:00', bpm: 75 },
//         { time: '22:00', bpm: 74 },
//         { time: '23:00', bpm: 72 },
//     ];

//     const [selectedTab, setSelectedTab] = useState('day');

//     return (
//         <div className="heart-rate-container">
//             <h1 className="bpm-header">Heart Rate Data</h1>

//             {/* Tabs for Day, Week, Month, Year */}
//             <div className="tabs">
//                 <button
//                     className={selectedTab === 'day' ? 'active-tab' : 'tab'}
//                     onClick={() => setSelectedTab('day')}
//                 >
//                     Day
//                 </button>
//                 <button
//                     className={selectedTab === 'week' ? 'active-tab' : 'tab'}
//                     onClick={() => setSelectedTab('week')}
//                 >
//                     Week
//                 </button>
//                 <button
//                     className={selectedTab === 'month' ? 'active-tab' : 'tab'}
//                     onClick={() => setSelectedTab('month')}
//                 >
//                     Month
//                 </button>
//                 <button
//                     className={selectedTab === 'year' ? 'active-tab' : 'tab'}
//                     onClick={() => setSelectedTab('year')}
//                 >
//                     Year
//                 </button>
//             </div>

//             {/* Display Chart for Day View */}
//             {selectedTab === 'day' && (
//                 <ResponsiveContainer width="95%" height={400}>
//                     <LineChart data={hourlyData}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="time" />
//                         <YAxis />
//                         <Tooltip />
//                         <Line type="monotone" dataKey="bpm" stroke="#ff0000" strokeWidth={2} />
//                     </LineChart>
//                 </ResponsiveContainer>
//             )}

//             <p>Timestamp: {new Date().toLocaleString()}</p>
//         </div>
//     );
// };

// export default HeartRate;
