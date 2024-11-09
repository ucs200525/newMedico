// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import PrescriptionList from '../components/PrescriptionListUser';

// const UserPrescriptions = ({ uid }) => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [message, setMessage] = useState(''); // For displaying messages

//   // Fetch prescriptions
//   useEffect(() => {
//     const fetchPrescriptions = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/prescriptions/by-uid/${uid}`);
//         setPrescriptions(response.data);
//       } catch (error) {
//         console.error('Error fetching prescription data:', error);
//         setMessage('Error fetching prescriptions. Please try again later.');
//       }
//     };

//     if (uid) {
//       fetchPrescriptions();
//     }
//   }, [uid]); // Add uid as dependency

//   return (
//     <div>
//       <h1>Your Prescriptions</h1>
//       {message && <p>{message}</p>} {/* Display any error message */}
//       <PrescriptionList prescriptions={prescriptions} />
//       {prescriptions.length === 0 && <p>No prescriptions found.</p>} {/* Message if no prescriptions exist */}
//       <br/>
//     </div>
    
//   );
// };

// export default UserPrescriptions;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrescriptionList from '../components/PrescriptionListUser';
import LoadingSpinner from '../components/LoadingSpinner';

const UserPrescriptions = ({ uid }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/prescriptions/by-uid/${uid}`);
        setPrescriptions(response.data);
      } catch (error) {
        console.error('Error fetching prescription data:', error);
        setMessage('Error fetching prescriptions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchPrescriptions();
    }
  }, [uid]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="user-prescriptions">
      
      {message && <p>{message}</p>}
      <PrescriptionList prescriptions={prescriptions} />
      {prescriptions.length === 0 && <p>No prescriptions found.</p>}
      <br />
    </div>
  );
};

export default UserPrescriptions;

//with loading