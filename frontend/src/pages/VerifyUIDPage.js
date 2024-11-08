// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext'; // Ensure correct path

// const VerifyUIDPage = () => {
//   const [uidInput, setUidInput] = useState(''); // Rename to avoid confusion with UID from context
//   const { setUidContext, role } = useContext(AuthContext); // Destructure role from AuthContext
//   const [error, setError] = useState('');

//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/patients/verify-uid`, { uid: uidInput });
//       console.log('UID verification successful', response);

//       if (response.status === 200) {
//         setUidContext(uidInput); // Set UID in context
//         if (role === 'admin') {
//           // Set login state for admin
//           navigate('/dashboard'); // Redirect to admin dashboard
//         } else {
//           navigate('/dashboardUser'); // Redirect to user dashboard
//         }
//       } else {
//         throw new Error('Failed to verify UID'); // Throw error if response is not 200
//       }
//     } catch (err) {
//       setError(`UID verification failed. ${err.message}`);
//       console.error('UID verification error:', err);
//     }
//   };

//   return (
//     <div>
//       <h2>Verify UID</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Please enter UID:
//           <input
//             type="text"
//             value={uidInput}
//             onChange={(e) => setUidInput(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Verify</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default VerifyUIDPage;


import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import styles from './VerifyUIDPage.module.css';

const VerifyUIDPage = () => {
  const [uidInput, setUidInput] = useState('');
  const { setUidContext, role, LoginUserName } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket(`${process.env.REACT_APP_wsPORT}`);

      ws.onopen = () => {
        console.log('Connected to WebSocket');
      };

      ws.onmessage = async (message) => {
        const blob = message.data;
        const receivedUid = await blob.text();
        const uid = receivedUid.replace('Card UID: ', '').trim();
        setUidInput(uid);
      };
      
      setSocket(ws);
    };

    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/patients/verify-uid`, { uid: uidInput });
      LoginUserName(response.data.name);

      if (response.status === 200) {
        setUidContext(uidInput);
        role === 'admin' ? navigate('/dashboard') : navigate('/dashboardUser');
      } else {
        throw new Error('Failed to verify UID');
      }
    } catch (err) {
      setError(`UID verification failed, check UID.`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPatient = () => {
    navigate('/patients');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.container}>
      
      <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.heading}>Verify UID</h2>
        <label className={styles.label}>
          UID received from Arduino:
          <input
            type="text"
            value={uidInput}
            className={styles.input}
            onChange={(e) => setUidInput(e.target.value)}
            required
          />
        </label>
        <button type="submit" className={styles.button}>Verify</button>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
      {role === 'admin' && (
        <div className={styles.addPatientContainer}>
          <button onClick={handleAddPatient} className={styles.addPatientButton}>Add Patient</button>
        </div>
      )}
    </div>
  );
};

export default VerifyUIDPage;


// // ///////////////////////////////////////////////// For WS socket// with loading