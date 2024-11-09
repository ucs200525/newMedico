import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { AuthContext } from '../context/AuthContext';
import styles from './UserRoleSelection.module.css';

const UserRoleSelection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { loginUser } = useContext(AuthContext);

  const handleRoleSelection = async (role) => {
    setLoading(true);

    if (role === 'admin') {
      setLoading(false);
      navigate('/login');
    } else {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/loginUser`);
        loginUser(response.data.token, response.data.role);
        setLoading(false);
        navigate('/dashboardUser');
      } catch (error) {
        setLoading(false);
        console.error('Error logging in user:', error);
      }
    }
  };

  return (
    <div className={styles.outerContainer}>
      <nav className={styles.navbar}>
        <h1 className={styles.navTitle}>MediCo</h1>
      </nav>
      <div className={styles.container}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <h1 className={styles.header}>Welcome to MediCo Portal</h1>
            <p className={styles.description}>
              Please select your role to access the MediCo portal. <br />
              <strong>Admin</strong> can manage patients, prescriptions, and reports. <br />
               <strong>Users</strong> can view their medical information and reports.
            </p>
            <div className={styles.buttonContainer}>
              <button
                className={`${styles.button} ${styles.adminButton}`}
                onClick={() => handleRoleSelection('admin')}
              >
                Admin Access
              </button>
              <button
                className={`${styles.button} ${styles.userButton}`}
                onClick={() => handleRoleSelection('user')}
              >
                User Access
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserRoleSelection;
