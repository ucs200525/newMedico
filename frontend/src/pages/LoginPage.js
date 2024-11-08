// // src/pages/LoginPage.js
// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { login ,} = useContext(AuthContext); // Access login function from context

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { email, password });
//       console.log('Login successful', response.data);
//       localStorage.setItem('token', response.data.token);
//       login(response.data.token, response.data.role, response.data.name); // Pass the username
//       navigate('/verify-uid');
//     } catch (err) {
//       setError('Login failed. Please check your credentials.');
//       console.error('Login error:', err);
//     }
//   };
  
//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Email:
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//         <label>Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Login</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default LoginPage;


// src/pages/LoginPage.js
// src/pages/LoginPage.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner'; // Import the spinner component
import styles from './LoginPage.module.css'; // Import CSS module

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Access login function from context

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when the request starts
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { email, password });
      console.log('Login successful', response.data);
      localStorage.setItem('token', response.data.token);
      login(response.data.token, response.data.role, response.data.name); // Pass the username
      navigate('/verify-uid');
    } catch (err) {
      setError('Invalid LoginId/Password.');
      console.error('Login error:', err);
    } finally {
      setLoading(false); // Set loading to false after the API call completes
    }
  };

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <LoadingSpinner />
      </div>
    ); // Show spinner when loading
  }
  
  return (
    <div className={styles.container}>
      
      <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.heading}>Login</h2>
        <label className={styles.label}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button}>Login</button>
        </div>
        {error && <p id="loginError" className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
//with loading 