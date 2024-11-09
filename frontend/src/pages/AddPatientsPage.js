// import React, { useState } from 'react';
// import axios from 'axios';

// const Patients = () => {
//   const [patientData, setPatientData] = useState({
//     uid: '',
//     name: '',
//     age: '',
//     gender: '',
//     otherFields: {
//       address: '',
//       email: '',
//       phone: '',
//     }
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Check if the name is for a nested field
//     if (name.startsWith('otherFields')) {
//       const fieldName = name.split('[')[1].split(']')[0]; // Extract the field name
//       setPatientData({
//         ...patientData,
//         otherFields: {
//           ...patientData.otherFields,
//           [fieldName]: value // Update the specific nested field
//         }
//       });
//     } else {
//       setPatientData({ ...patientData, [name]: value }); // Update top-level fields
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/patients`, patientData);
//       console.log('Patient added successfully:', response.data);
//       // Clear form or show success message
//       resetForm(); // Optional: Reset form after submission
//       alert("Patient Added Successfully");
//     } catch (error) {
//       console.error('Error adding patient:', error.response ? error.response.data : error.message);
//     }
//   };

//   const resetForm = () => {
//     setPatientData({
//       uid: '',
//       name: '',
//       age: '',
//       gender: '',
//       otherFields: {
//         address: '',
//         email: '',
//         phone: '',
//       }
//     });
//   };

//   return (
//     <div>
//       <h2>Add Patient</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="uid" placeholder="UID" onChange={handleChange} required />
//         <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//         <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
//         <select name="gender" onChange={handleChange} required>
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
//         <input type="text" name="otherFields[address]" placeholder="Address" onChange={handleChange} />
//         <input type="text" name="otherFields[email]" placeholder="Email" onChange={handleChange} />
//         <input type="text" name="otherFields[phone]" placeholder="Phone" onChange={handleChange} />
//         <button type="submit">Add Patient</button>
//       </form>
//     </div>
//   );
// };

// export default Patients;




// import React, { useState } from 'react';
// import axios from 'axios';
// import {useNavigate} from "react-router-dom"

// const Patients = () => {
//   const Navigate = useNavigate();
//   const [patientData, setPatientData] = useState({
//     uid: '',
//     name: '',
//     age: '',
//     gender: '',
//     otherFields: {
//       address: '',
//       email: '',
//       phone: '',
//     }
//   });
  
//   const [loading, setLoading] = useState(false); // Loading state
//   const [errorMessage, setErrorMessage] = useState(''); // Error message state

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Check if the name is for a nested field
//     if (name.startsWith('otherFields')) {
//       const fieldName = name.split('[')[1].split(']')[0]; // Extract the field name
//       setPatientData({
//         ...patientData,
//         otherFields: {
//           ...patientData.otherFields,
//           [fieldName]: value // Update the specific nested field
//         }
//       });
//     } else {
//       setPatientData({ ...patientData, [name]: value }); // Update top-level fields
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Start loading
//     setErrorMessage(''); // Reset any previous error messages
//     Navigate("/HealthPage");
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/patients`, patientData);
//       console.log('Patient added successfully:', response.data);
//       alert("Patient Added Successfully");
//       resetForm(); // Reset form after successful submission
//     } catch (error) {
//       console.error('Error adding patient:', error.response ? error.response.data : error.message);
//       setErrorMessage('Error adding patient: ' + (error.response ? error.response.data : error.message)); // Set error message
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   const resetForm = () => {
//     setPatientData({
//       uid: '',
//       name: '',
//       age: '',
//       gender: '',
//       otherFields: {
//         address: '',
//         email: '',
//         phone: '',
//       }
//     });
//   };

//   return (
//     <div>
//       <h2>Add Patient</h2>
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="uid" placeholder="UID" onChange={handleChange} required />
//         <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//         <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
//         <select name="gender" onChange={handleChange} required>
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
//         <input type="text" name="otherFields[address]" placeholder="Address" onChange={handleChange} />
//         <input type="text" name="otherFields[email]" placeholder="Email" onChange={handleChange} />
//         <input type="text" name="otherFields[phone]" placeholder="Phone" onChange={handleChange} />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Adding...' : 'Add Patient'} {/* Show loading state on button */}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Patients;

// //with loading 
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styles from './Patients.module.css';  // Import the CSS module for styling

const Patients = () => {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState({
    uid: '',
    name: '',
    age: '',
    gender: '',
    otherFields: {
      address: '',
      email: '',
      phone: '',
    }
  });
  
  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('otherFields')) {
      const fieldName = name.split('[')[1].split(']')[0]; // Extract the field name
      setPatientData({
        ...patientData,
        otherFields: {
          ...patientData.otherFields,
          [fieldName]: value
        }
      });
    } else {
      setPatientData({ ...patientData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/patients`, patientData);
      console.log('Patient added successfully:', response.data);
      alert("Patient Added Successfully");

      // Pass UID to HealthPage on successful patient addition
      navigate("/HealthPage", { state: { uid: patientData.uid } });
      
      resetForm(); // Reset form after submission
    } catch (error) {
      console.error('Error adding patient:', error.response ? error.response.data : error.message);
      setErrorMessage('Error adding patient: ' + (error.response ? error.response.data : error.message));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPatientData({
      uid: '',
      name: '',
      age: '',
      gender: '',
      otherFields: {
        address: '',
        email: '',
        phone: '',
      }
    });
  };

  return (
    <div className={styles['patient-form-container']}>
      <h2 className={styles.heading}>Add Patient</h2>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="uid" placeholder="UID" onChange={handleChange} value={patientData.uid} required className={styles.input} />
        <input type="text" name="name" placeholder="Name" onChange={handleChange} value={patientData.name} required className={styles.input} />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} value={patientData.age} required className={styles.input} />
        
        {/* Gender select input */}
        <select name="gender" onChange={handleChange} value={patientData.gender} required className={styles.input}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input type="text" name="otherFields[address]" placeholder="Address" onChange={handleChange} value={patientData.otherFields.address} className={styles.input} />
        <input type="text" name="otherFields[email]" placeholder="Email" onChange={handleChange} value={patientData.otherFields.email} className={styles.input} />
        <input type="text" name="otherFields[phone]" placeholder="Phone" onChange={handleChange} value={patientData.otherFields.phone} className={styles.input} />
        
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Adding...' : 'Add Patient'}
        </button>
      </form>
    </div>
  );
};

export default Patients;
