import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you use react-router for navigation
import axios from 'axios'; // Import axios
import { AuthContext } from '../context/AuthContext'; // Ensure correct path

const UserRoleSelection = () => {
  const navigate = useNavigate();

  // Handle selection
  const handleRoleSelection = async (role) => {
    localStorage.setItem('role', role);
    console.log("role: ", role);
    
    if (role === 'admin') {
      navigate('/login'); // Redirect to the admin login page
    } else {
      try {
        // Make sure to await the axios call
        const response = await axios.post('http://localhost:4000/api/auth/loginUser');
        localStorage.setItem('token', response.data.token);
        console.log("token :-", response.data.token);
        navigate('/dashboardUser'); // Redirect to the user dashboard
      } catch (error) {
        console.error('Error logging in user:', error);
        // Optionally, display an error message to the user
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1>Select Your Role</h1>
      <div style={styles.buttonContainer}>
        <button 
          style={styles.button} 
          onClick={() => handleRoleSelection('admin')}
        >
          Admin
        </button>
        <button 
          style={styles.button} 
          onClick={() => handleRoleSelection('user')}
        >
          User
        </button>
      </div>
    </div>
  );
};

// Basic inline styles for the page
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa'
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
    marginTop: '20px'
  },
  button: {
    padding: '15px 30px',
    fontSize: '18px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'blac',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease'
  }
};

export default UserRoleSelection;
