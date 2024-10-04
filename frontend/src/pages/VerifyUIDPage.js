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

// // import React, { useState, useContext, useEffect } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import { AuthContext } from '../context/AuthContext';

// // const VerifyUIDPage = () => {
// //   const [uidInput, setUidInput] = useState(''); // State to store UID from WebSocket
// //   const { setUidContext, setRoleContext, role } = useContext(AuthContext);
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const socket = new WebSocket('ws://localhost:8080'); // Assuming the WebSocket server is running on port 8080

// //     socket.onopen = () => {
// //       console.log('Connected to WebSocket');
// //     };

// //     socket.onmessage = (message) => {
// //       const receivedUid = message.data; // Retrieve the UID from the WebSocket message
// //       console.log('Received UID from WebSocket:', receivedUid);
// //       setUidInput(receivedUid); // Automatically set the received UID
// //     };

// //     socket.onerror = (error) => {
// //       console.error('WebSocket error:', error);
// //     };

// //     socket.onclose = () => {
// //       console.log('WebSocket connection closed');
// //     };

// //     // Cleanup the WebSocket connection when the component is unmounted
// //     return () => {
// //       socket.close();
// //     };
// //   }, []);

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();

// //     try {
// //       const response = await axios.post('http://localhost:4000/api/patients/verify-uid', { uid: uidInput });
// //       console.log('UID verification successful', response);

// //       if (response.status === 200) {
// //         const { token } = response.data;
// //         localStorage.setItem('token', token); // Save token in localStorage
// //         setUidContext(uidInput); // Set UID in AuthContext

// //         if (role === 'admin') {
// //           navigate('/dashboard'); // Redirect admin to dashboard
// //         } else {
// //           setRoleContext('user'); // Set user role in context
// //           navigate('/dashboardUser'); // Redirect user to their dashboard
// //         }
// //       } else {
// //         throw new Error('Failed to verify UID');
// //       }
// //     } catch (err) {
// //       setError(`UID verification failed. ${err.message}`);
// //       console.error('UID verification error:', err);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Verify UID</h2>
// //       <form onSubmit={handleSubmit}>
// //         <label>
// //           UID received from Arduino:
// //           <input
// //             type="text"
// //             value={uidInput}
// //             readOnly // Make input read-only as the UID will be auto-filled by WebSocket
// //           />
// //         </label>
// //         <button type="submit">Verify</button>
// //       </form>
// //       {error && <p>{error}</p>}
// //     </div>
// //   );
// // };

// // export default VerifyUIDPage;
// ///////////////////////////////////////////////// For WS socket

// src/pages/VerifyUIDPage.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Ensure correct path
import LoadingSpinner from '../components/LoadingSpinner'; // Import the spinner component

const VerifyUIDPage = () => {
  const [uidInput, setUidInput] = useState(''); // State for UID input
  const { setUidContext, role } = useContext(AuthContext); // Destructure role from AuthContext
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when the request starts

    try {
      const response = await axios.post('http://localhost:4000/api/patients/verify-uid', { uid: uidInput });
      console.log('UID verification successful', response);

      if (response.status === 200) {
        setUidContext(uidInput); // Set UID in context
        if (role === 'admin') {
          navigate('/dashboard'); // Redirect to admin dashboard
        } else {
          navigate('/dashboardUser'); // Redirect to user dashboard
        }
      } else {
        throw new Error('Failed to verify UID'); // Handle non-200 responses
      }
    } catch (err) {
      setError(`UID verification failed. ${err.message}`);
      console.error('UID verification error:', err);
    } finally {
      setLoading(false); // Set loading to false after the API call completes
    }
  };

  if (loading) {
    return <LoadingSpinner />; // Show spinner when loading
  }

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
//with loading