// Movement.js
import React, { useState, useEffect } from 'react';

// const Movement = () => {
//     const [movementData, setMovementData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         const fetchMovementData = async () => {
//             try {
//                 // Simulate fetching movement data (replace with real API call)
//                 const sampleData = {
//                     movement: 'Low', // Example movement level
//                     timestamp: '2025-02-04 10:00:00',
//                 };
//                 setMovementData(sampleData); // Set the sample movement data
//             } catch (error) {
//                 setError(true);
//                 console.error('Error fetching movement data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMovementData(); // Call the function when the component mounts
//     }, []); // Empty dependency array ensures this runs once on mount

//     if (loading) return <div>Loading movement data...</div>;
//     if (error) return <div>Error fetching movement data.</div>;

//     return (
//         <div className="movement-container">
//             <h1>Movement</h1>
//             <p><strong>Movement Level:</strong> {movementData?.movement}</p>
//             <p><strong>Timestamp:</strong> {movementData?.timestamp}</p>
//         </div>
//     );
// };

// export default Movement;
const Movement = () => {
    const [sleepData, setSleepData] = useState([]);
  
    useEffect(() => {
      fetch("http://127.0.0.1:8000/api/sleep-data/") // Adjust URL if needed
        .then((response) => response.json())
        .then((data) => setSleepData(data))
        .catch((error) => console.error("Error fetching sleep data:", error));
    }, []);
  
    return (
      <div>
        <h1>Sleep Data</h1>
        <ul>
          {sleepData.map((entry) => (
            <li key={entry.data_id}>
              {entry.data_type}: {entry.data_value} (Recorded at {entry.timestamp})
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Movement;