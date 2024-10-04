import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DashboardUser.css';
import LoadingSpinner from '../components/LoadingSpinner'; // Import the spinner component

const DashboardUser = ({ uid }) => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        //await new Promise((resolve) => setTimeout(resolve, 20));
        const response = await axios.get(`http://localhost:4000/api/patients/${uid}`);
        setPatient(response.data);
      } catch (error) {
        setError('Error fetching patient data: ' + error.message);
      } finally {
        setLoading(false); // Set loading to false after the API call
      }
    };

    fetchPatientData();
  }, [uid]);

  if (loading) {
    return <LoadingSpinner />; // Show spinner when loading
  }

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
//with loading