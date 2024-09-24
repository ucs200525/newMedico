import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientList = ({ onPatientEdit, onPatientDelete }) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('/api/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleEdit = (patient) => {
    onPatientEdit(patient);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/patients/${id}`);
      setPatients(patients.filter(patient => patient._id !== id));
      onPatientDelete(id);
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div>
      <h2>Patient List</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient._id}>
            <h3>{patient.name}</h3>
            <p>Age: {patient.age}</p>
            <p>Gender: {patient.gender}</p>
            <p>Phone: {patient.phoneNumber}</p>
            <button onClick={() => handleEdit(patient)}>Edit</button>
            <button onClick={() => handleDelete(patient._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
