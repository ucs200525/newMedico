import React, { useState } from 'react';
import styles from './PrescriptionListUser.module.css'; // Import the CSS module for styling

const PrescriptionList = ({ prescriptions }) => {
  const [visibleDetails, setVisibleDetails] = useState(null); // State to track which details are visible

  // Function to toggle visibility of prescription details
  const toggleDetails = (id) => {
    setVisibleDetails(visibleDetails === id ? null : id); // Toggle visibility
  };

  return (
    <div className={styles.prescriptionList}>
      {prescriptions.length === 0 ? (
        <p className={styles.noPrescriptions}>No prescriptions available.</p>
      ) : (
        <ul>
          <h2  className={styles.title}>Your Prescriptions</h2>
          {prescriptions.map((prescription) => (
            <li key={prescription._id} className={styles.prescriptionItem}>
              <h3>Medication: {prescription.medication}</h3>
              <p>Date: {new Date(prescription.createdAt).toLocaleDateString()}</p>

              {/* Show full details when visibleDetails matches the prescription id */}
              {visibleDetails === prescription._id && (
                <div>
                  <p>Dosage: {prescription.dosage}</p>
                  <p>Instructions: {prescription.instructions}</p>
                </div>
              )}

              {/* Button to toggle visibility */}
              <button
                onClick={() => toggleDetails(prescription._id)}
                className={`${styles.toggleButton} ${visibleDetails === prescription._id ? styles.hideDetails : ''}`}
              >
                {visibleDetails === prescription._id ? 'Hide Details' : 'See Details'}
              </button>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PrescriptionList;
