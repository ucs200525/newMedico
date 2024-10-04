import React from 'react';
import styles from './LoadingSpinner.module.css'; // Import the CSS module

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loadingBox}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Loading Please wait...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
