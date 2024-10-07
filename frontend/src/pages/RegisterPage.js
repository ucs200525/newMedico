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
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, { name, email, password });
    console.log('Registration successful', response.data);
      if (response.status === 201) {
        alert("Successfully Registered");
        navigate('/Login');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Registration failed. Please try again.');
      } else {
        setError('Registration failed. Please check your connection and try again.');
      }
      console.error('Registration error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required />
      <button type="submit">Register</button>
      {error && <p id='registerError' style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default RegisterPage;
