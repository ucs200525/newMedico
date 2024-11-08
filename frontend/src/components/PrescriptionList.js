import React, { useState } from 'react';
import styles from './PrescriptionList.module.css'; // Assuming you're using a CSS Module for styling

const PrescriptionList = ({ prescriptions, onPrescriptionEdit, onPrescriptionDelete }) => {
  const [expandedPrescriptionId, setExpandedPrescriptionId] = useState(null);

  const togglePrescriptionDetails = (id) => {
    setExpandedPrescriptionId(prevId => (prevId === id ? null : id));
  };

  return (
    <div>
      {prescriptions.length === 0 ? (
        <p>No prescriptions available.</p>
      ) : (
        <ul>
          {prescriptions.map((prescription) => (
            <li key={prescription._id} className={styles.prescriptionItem}>
              {/* Show only the date by default */}
              <p className={styles.date}>Date: {new Date(prescription.createdAt).toLocaleDateString()}</p>

              {/* Button to toggle prescription details */}
              <button 
                className={styles.toggleButton} 
                onClick={() => togglePrescriptionDetails(prescription._id)}
              >
                {expandedPrescriptionId === prescription._id ? 'Hide Details' : 'See Prescription'}
              </button>

              {/* Conditionally render full details if the prescription is expanded */}
              {expandedPrescriptionId === prescription._id && (
                <div className={styles.details}>
                  <h3>Medication: {prescription.medication}</h3>
                  <h3>Dosage: {prescription.dosage}</h3>
                  <h3>Instructions: {prescription.instructions}</h3>
                </div>
              )}

              {/* Buttons for Edit and Delete */}
              <div className={styles.buttonGroup}>
                <button 
                  className={styles.editButton} 
                  onClick={() => onPrescriptionEdit(prescription)}
                >
                  Edit
                </button>
                <button 
                  className={styles.deleteButton} 
                  onClick={() => onPrescriptionDelete(prescription._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PrescriptionList;
