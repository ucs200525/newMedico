import React, { useState } from 'react';
import styles from './PrescriptionList.module.css';

const PrescriptionList = ({ prescriptions, onPrescriptionEdit, onPrescriptionDelete }) => {
  const [expandedPrescriptionId, setExpandedPrescriptionId] = useState(null);

  const togglePrescriptionDetails = (id) => {
    setExpandedPrescriptionId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className={styles.prescriptionList}>
      {prescriptions.length === 0 ? (
        <p>No prescriptions available.</p>
      ) : (
        prescriptions.map((prescription) => (
          <div key={prescription._id} className={styles.prescriptionItem}>
            <p className={styles.date}>Date: {new Date(prescription.createdAt).toLocaleDateString()}</p>

            <button 
              className={styles.toggleButton} 
              onClick={() => togglePrescriptionDetails(prescription._id)}
            >
              {expandedPrescriptionId === prescription._id ? 'Hide Details' : 'See Prescription'}
            </button>

            {expandedPrescriptionId === prescription._id && (
              <div className={styles.details}>
                <h3 className={styles.medication}>Medication: {prescription.medication}</h3>
                <h3 className={styles.dosage}>Dosage: {prescription.dosage}</h3>
                <h3 className={styles.instructions}>Instructions: {prescription.instructions}</h3>

              </div>
            )}

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
          </div>
        ))
      )}
    </div>
  );
};

export default PrescriptionList;
