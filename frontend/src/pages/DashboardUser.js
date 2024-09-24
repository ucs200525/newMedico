import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const DashboardUser = ({ uid }) => {
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatientData = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/patients/${uid}`);
          setPatient(response.data);
        } catch (error) {
          setError('Error fetching patient data: ' + error.message);
        }
  
    };

    fetchPatientData();
  }, [uid]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!patient) {
    return <p>No patient data found.</p>;
  }

  return (
    <div>
      <h2>Patient Dashboard</h2>
      <div>
        <strong>Name:</strong> {patient.name}
      </div>
      <div>
        <strong>Age:</strong> {patient.age}
      </div>
      <div>
        <strong>Gender:</strong> {patient.gender}
      </div>
      <div>
        <strong>Address:</strong> {patient.otherFields?.address || 'N/A'}
      </div>
      <div>
        <strong>Email:</strong> {patient.otherFields?.email || 'N/A'}
      </div>
      <div>
        <strong>Phone:</strong> {patient.otherFields?.phone || 'N/A'}
      </div>
    </div>
  );
};

export default DashboardUser;
