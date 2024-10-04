import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you use react-router for navigation
import axios from 'axios'; // Import axios
import LoadingSpinner from '../components/LoadingSpinner'; // Import your LoadingSpinner component
import { AuthContext } from '../context/AuthContext';

const UserRoleSelection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to handle loading
  const { loginUser } = useContext(AuthContext); // Access loginUser function from context

  // Handle selection
  const handleRoleSelection = async (role) => {
    // Start loading
    setLoading(true);

    if (role === 'admin') {
      setLoading(false); // Stop loading for admin role
      navigate('/login'); // Redirect to the admin login page
    } else {
      try {
        // Make sure to await the axios call
        //await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await axios.post('http://localhost:4000/api/auth/loginUser');
        loginUser(response.data.token,response.data.role)
        // Stop loading when the API call is successful
        setLoading(false);
        navigate('/dashboardUser'); // Redirect to the user dashboard
      } catch (error) {
        setLoading(false); // Stop loading if there's an error
        console.error('Error logging in user:', error);
        // Optionally, display an error message to the user
      }
    }
  };

  return (
    <div style={styles.container}>
      {loading ? (
        <LoadingSpinner /> // Show spinner when loading
      ) : (
        <>
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
        </>
      )}
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
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease'
  }
};

export default UserRoleSelection;
//with loading 