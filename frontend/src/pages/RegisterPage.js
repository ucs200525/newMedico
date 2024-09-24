import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    const response = await axios.post('http://localhost:4000/api/auth/register', { name, email, password });
    console.log('Registration successful', response.data);
      if (response.status === 201) {
        
        alert("Successfully Registered");
        navigate('/Login');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        // Display specific error message from server
        setError(err.response.data.message || 'Registration failed. Please try again.');
      } else {
        // Network or other errors
        setError('Registration failed. Please check your connection and try again.');
      }
      console.error('Registration error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default RegisterPage;
