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
//       const response = await axios.post('http://localhost:4000/api/patients/verify-uid', { uid: uidInput });
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

const VerifyUIDPage = () => {
  const [uidInput, setUidInput] = useState(''); // State to store UID from WebSocket
  const { setUidContext, setRoleContext, role } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null); // State to manage WebSocket instance

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket('ws://localhost:8080'); // Assuming WebSocket server is on port 8080

      ws.onopen = () => {
        console.log('Connected to WebSocket');
      };

      ws.onmessage = async (message) => {
        const blob = message.data; // Retrieve the Blob from the WebSocket message
        const receivedUid = await blob.text(); // Convert Blob to text
        
        // Remove the "Card UID: " part and trim whitespace
        const uid = receivedUid.replace('Card UID: ', '').trim();
        
        console.log('Received UID from WebSocket:', uid);
        setUidInput(uid); // Auto-fill UID received from WebSocket
      };
      
      setSocket(ws); // Save socket instance
    };

    connectWebSocket(); // Establish WebSocket connection

    // Cleanup WebSocket connection when component is unmounted
    return () => {
      if (socket) socket.close();
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset error state before verification

    try {
      const response = await axios.post('http://localhost:4000/api/patients/verify-uid', { uid: uidInput });
      console.log('UID verification successful', response);

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token); // Save token in localStorage
        setUidContext(uidInput); // Set UID in AuthContext

        if (role === 'admin') {
          navigate('/dashboard'); // Redirect admin to dashboard
        } else {
          setRoleContext('user'); // Set role to user in context
          navigate('/dashboardUser'); // Redirect user to their dashboard
        }
      } else {
        throw new Error('Failed to verify UID');
      }
    } catch (err) {
      setError(`UID verification failed: ${err.message}`);
      console.error('UID verification error:', err);
    }
  };

  return (
    <div>
      <h2>Verify UID</h2>
      <form onSubmit={handleSubmit}>
        <label>
          UID received from Arduino:
          <input
            type="text"
            value={uidInput}
            // readOnly // Make input read-only since UID is auto-filled by WebSocket
            onChange={(e) => setUidInput(e.target.value)}
            required
          />
        </label>
        <button type="submit">Verify</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default VerifyUIDPage;

// // ///////////////////////////////////////////////// For WS socket

// // src/pages/VerifyUIDPage.js
// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext'; // Ensure correct path
// import LoadingSpinner from '../components/LoadingSpinner'; // Import the spinner component

// const VerifyUIDPage = () => {
//   const [uidInput, setUidInput] = useState(''); // State for UID input
//   const { setUidContext, role } = useContext(AuthContext); // Destructure role from AuthContext
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false); // Add loading state
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true); // Set loading to true when the request starts

//     try {
//       const response = await axios.post('http://localhost:4000/api/patients/verify-uid', { uid: uidInput });
//       console.log('UID verification successful', response);

//       if (response.status === 200) {
//         setUidContext(uidInput); // Set UID in context
//         if (role === 'admin') {
//           navigate('/dashboard'); // Redirect to admin dashboard
//         } else {
//           navigate('/dashboardUser'); // Redirect to user dashboard
//         }
//       } else {
//         throw new Error('Failed to verify UID'); // Handle non-200 responses
//       }
//     } catch (err) {
//       setError(`UID verification failed. ${err.message}`);
//       console.error('UID verification error:', err);
//     } finally {
//       setLoading(false); // Set loading to false after the API call completes
//     }
//   };

//   if (loading) {
//     return <LoadingSpinner />; // Show spinner when loading
//   }

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
// with loading