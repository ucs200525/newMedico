import React from 'react';

const PrescriptionList = ({ prescriptions }) => {
  return (
    <div>
      <h2>Prescription List</h2>
      {prescriptions.length === 0 ? (
        <p>No prescriptions available.</p>
      ) : (
        <ul>
          {prescriptions.map((prescription) => (
            <li key={prescription._id}>
              <h3>Medication: {prescription.medication}</h3>
              <h3>Dosage: {prescription.dosage}</h3>
              <h3>Instructions: {prescription.instructions}</h3>
              <p>Date: {new Date(prescription.createdAt).toLocaleDateString()}</p>
              {/* Removed Edit and Delete buttons for user view */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PrescriptionList;
