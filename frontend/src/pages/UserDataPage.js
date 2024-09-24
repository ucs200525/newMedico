import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDataPage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get the UID from localStorage
    const uid = localStorage.getItem('uid');
    
    // Fetch the user data based on the UID
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/patients/uid/${uid}`);
        setUserData(response.data);
      } catch (err) {
        setError('Failed to fetch user data.');
      }
    };

    if (uid) {
      fetchData();
    } else {
      setError('UID not found. Please enter UID again.');
    }
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Data</h1>
      <p><strong>UID:</strong> {userData.uid}</p>
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      {/* Add other relevant user fields as needed */}
    </div>
  );
};

export default UserDataPage;
