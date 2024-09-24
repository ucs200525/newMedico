import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Ensure correct path

const VerifyUIDPage = () => {
  const [uidInput, setUidInput] = useState(''); // Rename to avoid confusion with UID from context
  const { userRole, setUidContext, setRoleContext, role } = useContext(AuthContext); // Destructure role from AuthContext
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/patients/verify-uid', { uid: uidInput });
      console.log('UID verification successful', response);

      if (response.status === 200) {
        const { token } = response.data; // Destructure response data
        localStorage.setItem('token', token); // Store token in localStorage
        console.log("up token:",token);
        setUidContext(uidInput); // Set UID in context
        if (role === 'admin') {
          // Set login state for admin
          navigate('/dashboard'); // Redirect to admin dashboard
        } else {
          userRole();
          navigate('/dashboardUser'); // Redirect to user dashboard
          
          
        }
      } else {
        throw new Error('Failed to verify UID'); // Throw error if response is not 200
      }
    } catch (err) {
      setError(`UID verification failed. ${err.message}`);
      console.error('UID verification error:', err);
    }
  };

  return (
    <div>
      <h2>Verify UID</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Please enter UID:
          <input
            type="text"
            value={uidInput}
            onChange={(e) => setUidInput(e.target.value)}
            required
          />
        </label>
        <button type="submit">Verify</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default VerifyUIDPage;
