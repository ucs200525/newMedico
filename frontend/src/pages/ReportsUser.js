// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserReports = ({ uid }) => {
//   const [reports, setReports] = useState([]);
//   const [message, setMessage] = useState('');

//   // Fetch all reports by UID
//   const fetchReports = async () => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/reports/by-uid/${uid}`);
//       setReports(response.data);
//     } catch (error) {
//       setMessage('Error fetching reports');
//       console.error('Error fetching reports:', error);
//     }
//   };

//   // Fetch reports when component mounts
//   useEffect(() => {
//     fetchReports();
//   }, [uid]);

//   return (
//     <div>
//       <h1>Your Reports for UID: {uid}</h1>
//       {message && <p>{message}</p>}
//       <h2>Existing Reports</h2>
//       <ul>
//         {reports.length === 0 ? (
//           <p>No reports available.</p>
//         ) : (
//           reports.map((report) => (
//             <li key={report._id}>
//               <span>{report.fileName}</span>
//               <a href={`http://localhost:4000/api/reports/${encodeURIComponent(report.fileName)}`} target="_blank" rel="noopener noreferrer">
//                 <button>Open</button>
//               </a>
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };

// export default UserReports;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner'; // Import the spinner component

const UserReports = ({ uid }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [message, setMessage] = useState('');

  // Fetch all reports by UID
  const fetchReports = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/reports/by-uid/${uid}`);
      setReports(response.data);
    } catch (error) {
      setMessage('Error fetching reports');
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  // Fetch reports when component mounts
  useEffect(() => {
    fetchReports();
  }, [uid]);

  if (loading) {
    return <LoadingSpinner />; // Show spinner when loading
  }

  return (
    <div>
      <h1>Your Reports for UID: {uid}</h1>
      {message && <p>{message}</p>}
      <h2>Existing Reports</h2>
      <ul>
        {reports.length === 0 ? (
          <p>No reports available.</p>
        ) : (
          reports.map((report) => (
            <li key={report._id}>
              <span>{report.fileName}</span>
              <a href={`http://localhost:4000/api/reports/${encodeURIComponent(report.fileName)}`} target="_blank" rel="noopener noreferrer">
                <button>Open</button>
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UserReports;
//with loaing