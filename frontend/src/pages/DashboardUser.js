import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DashboardUser.css';

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
    <div className="dashboard-container">
      <h2>Patient Dashboard</h2>
      <table className="patient-table">
        <tbody>
          <tr>
            <td><strong>Name:</strong></td>
            <td>{patient.name}</td>
          </tr>
          <tr>
            <td><strong>Age:</strong></td>
            <td>{patient.age}</td>
          </tr>
          <tr>
            <td><strong>Gender:</strong></td>
            <td>{patient.gender}</td>
          </tr>
          <tr>
            <td><strong>Address:</strong></td>
            <td>{patient.otherFields?.address || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{patient.otherFields?.email || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Phone:</strong></td>
            <td>{patient.otherFields?.phone || 'N/A'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DashboardUser;
