// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from  './Dashboard.module.css'; // Import the CSS module

// const Dashboard = ({ uid }) => {
//   const [patient, setPatient] = useState(null);
//   const [updatedData, setUpdatedData] = useState({});
//   const [health, setHealth] = useState(null);
//   const [updatedHealthData, setUpdatedHealthData] = useState({});  // State for health updates

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       if (uid) {
//         try {
//           const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/patients/${uid}`);
//           setPatient(response.data);
          
//           const health_response = await axios.get(`${process.env.REACT_APP_API_URL}/api/health/by-uid/${uid}`);
//           setHealth(health_response.data);
          
//           setUpdatedData({
//             ...response.data,
//             otherFields: response.data.otherFields || { address: '', email: '', phone: '' },
//           });
          
//           setUpdatedHealthData(health_response.data); // Initialize health data state
//         } catch (error) {
//           console.error('Error fetching patient:', error.response ? error.response.data : error.message);
//         }
//       }
//     };

//     fetchPatientData();
//   }, [uid]);

//   // Handle updates for both patient and health data
//   const handleUpdateChange = (e) => {
//     const { name, value } = e.target;

//     if (name.startsWith('otherFields')) {
//       const fieldName = name.split('[')[1].slice(0, -1);
//       setUpdatedData((prevData) => ({
//         ...prevData,
//         otherFields: {
//           ...prevData.otherFields,
//           [fieldName]: value,
//         },
//       }));
//     } else {
//       setUpdatedData({ ...updatedData, [name]: value });
//     }
//   };

//   const handleHealthChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedHealthData({ ...updatedHealthData, [name]: value });
//   };

//   const handleUpdateSubmit = async (field) => {
//     try {
//       let dataToSend;

//       if (field.startsWith('otherFields.')) {
//         const nestedField = field.split('.')[1];
//         dataToSend = {
//           otherFields: {
//             ...updatedData.otherFields,
//             [nestedField]: updatedData.otherFields[nestedField],
//           },
//         };
//       } else {
//         dataToSend = { [field]: updatedData[field] };
//       }

//       const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/patients/${uid}`, dataToSend);
//       if (response.status === 200) {
//         alert("Patient Updated Successfully");
//       } else {
//         Promise.reject();
//       }
//       console.log('Patient updated successfully:', response.data);
//     } catch (error) {
//       console.error('Error updating patient:', error.response ? error.response.data : error.message);
//     }
//   };

//   const handleHealthUpdateSubmit = async () => {
//     try {
//       const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/health/by-uid/${uid}`, updatedHealthData);
//       if (response.status === 200) {
//         alert("Health Record Updated Successfully");
//         setHealth(updatedHealthData); // Update local state
//       }
//     } catch (error) {
//       console.error('Error updating health record:', error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <div className={styles.dashboardContainer}>
//       <div className={styles.dashboard}>
//         <h2>Patient Dashboard ( UID: {uid} )</h2>
//         {patient && (
//           <table className={styles.patientTable}>
//             <tbody>
//               <tr>
//                 <td>NAME:</td>
//                 <td>
//                   <input type="text" name="name" value={updatedData.name || ''} onChange={handleUpdateChange} />
//                 </td>
//                 <td><button onClick={() => handleUpdateSubmit('name')}>UPDATE</button></td>
//               </tr>
//               <tr>
//                 <td>AGE:</td>
//                 <td>
//                   <input type="number" name="age" value={updatedData.age || ''} onChange={handleUpdateChange} />
//                 </td>
//                 <td><button onClick={() => handleUpdateSubmit('age')}>UPDATE</button></td>
//               </tr>
//               <tr>
//                 <td>GENDER:</td>
//                 <td>
//                   <select name="gender" value={updatedData.gender || ''} onChange={handleUpdateChange}>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </td>
//                 <td><button onClick={() => handleUpdateSubmit('gender')}>UPDATE</button></td>
//               </tr>
//               <tr>
//                 <td>ADDRESS:</td>
//                 <td>
//                   <input
//                     type="text"
//                     name="otherFields[address]"
//                     value={updatedData.otherFields?.address || ''}
//                     onChange={handleUpdateChange}
//                   />
//                 </td>
//                 <td><button onClick={() => handleUpdateSubmit('otherFields.address')}>UPDATE</button></td>
//               </tr>
//               <tr>
//                 <td>EMAIL:</td>
//                 <td>
//                   <input
//                     type="text"
//                     name="otherFields[email]"
//                     value={updatedData.otherFields?.email || ''}
//                     onChange={handleUpdateChange}
//                   />
//                 </td>
//                 <td><button onClick={() => handleUpdateSubmit('otherFields.email')}>UPDATE</button></td>
//               </tr>
//               <tr>
//                 <td>PHONE:</td>
//                 <td>
//                   <input
//                     type="text"
//                     name="otherFields[phone]"
//                     value={updatedData.otherFields?.phone || ''}
//                     onChange={handleUpdateChange}
//                   />
//                 </td>
//                 <td><button onClick={() => handleUpdateSubmit('otherFields.phone')}>UPDATE</button></td>
//               </tr>
//               <tr>
//                 <td><strong>Blood Pressure:</strong></td>
//                 <td>
//                   <input
//                     type="text"
//                     name="bp"
//                     value={updatedHealthData.bp || ''}
//                     onChange={handleHealthChange}
//                   />
//                 </td>
//                 <td><button onClick={handleHealthUpdateSubmit}>UPDATE</button></td>
//               </tr>
//               <tr>
//                 <td><strong>Sugar:</strong></td>
//                 <td>
//                   <input
//                     type="number"
//                     name="sugar"
//                     value={updatedHealthData.sugar || ''}
//                     onChange={handleHealthChange}
//                   />
//                 </td>
//                 <td><button onClick={handleHealthUpdateSubmit}>UPDATE</button></td>
//               </tr>
//               <tr>
//                 <td><strong>Blood Group:</strong></td>
//                 <td>
//                   <input
//                     type="text"
//                     name="bloodGroup"
//                     value={updatedHealthData.bloodGroup || ''}
//                     onChange={handleHealthChange}
//                   />
//                 </td>
//                 <td><button onClick={handleHealthUpdateSubmit}>UPDATE</button></td>
//               </tr>
//               <tr>
//                 <td><strong>Height:</strong></td>
//                 <td>
//                   <input
//                     type="number"
//                     name="height"
//                     value={updatedHealthData.height || ''}
//                     onChange={handleHealthChange}
//                   />
//                 </td>
//                 <td><button onClick={handleHealthUpdateSubmit}>UPDATE</button></td>
//               </tr>
//               <tr>
//                 <td><strong>Weight:</strong></td>
//                 <td>
//                   <input
//                     type="number"
//                     name="weight"
//                     value={updatedHealthData.weight || ''}
//                     onChange={handleHealthChange}
//                   />
//                 </td>
//                 <td><button onClick={handleHealthUpdateSubmit}>UPDATE</button></td>
//               </tr>
//               <tr>
//                 <td><strong>BMI:</strong></td>
//                 <td>
//                   <input
//                     type="number"
//                     name="BMI"
//                     value={updatedHealthData.BMI || ''}
//                     onChange={handleHealthChange}
//                   />
//                 </td>
//                 <td><button onClick={handleHealthUpdateSubmit}>UPDATE</button></td>
//               </tr>
//               <tr>
//                 <td><strong>Eye Sight:</strong></td>
//                 <td>
//                   <input
//                     type="text"
//                     name="eyeSight"
//                     value={updatedHealthData.eyeSight || ''}
//                     onChange={handleHealthChange}
//                   />
//                 </td>
//                 <td><button onClick={handleHealthUpdateSubmit}>UPDATE</button></td>
//               </tr>
//               <tr>
//                 <td><strong>Infections:</strong></td>
//                 <td>
//                   <input
//                     type="text"
//                     name="infections"
//                     value={updatedHealthData.infections || ''}
//                     onChange={handleHealthChange}
//                   />
//                 </td>
//                 <td><button onClick={handleHealthUpdateSubmit}>UPDATE</button></td>
//               </tr>
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css'; // Import the CSS module
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ uid }) => {
  const [patient, setPatient] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [health, setHealth] = useState(null);
  const [updatedHealthData, setUpdatedHealthData] = useState({});  // State for health updates
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientData = async () => {
      if (uid) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/patients/${uid}`);
          setPatient(response.data);
          
          const health_response = await axios.get(`${process.env.REACT_APP_API_URL}/api/health/by-uid/${uid}`);
          setHealth(health_response.data);
          if(health_response.data===null){
            navigate('/HealthPage');
          }
          
          setUpdatedData({
            ...response.data,
            otherFields: response.data.otherFields || { address: '', email: '', phone: '' },
          });
          
          setUpdatedHealthData(health_response.data); // Initialize health data state
        } catch (error) {
          console.error('Error fetching patient:', error.response ? error.response.data : error.message);
        }
      }
    };

    fetchPatientData();
  }, [uid]);

  // Handle updates for both patient and health data
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('otherFields')) {
      const fieldName = name.split('[')[1].slice(0, -1);
      setUpdatedData((prevData) => ({
        ...prevData,
        otherFields: {
          ...prevData.otherFields,
          [fieldName]: value,
        },
      }));
    } else {
      setUpdatedData({ ...updatedData, [name]: value });
    }
  };

  const handleHealthChange = (e) => {
    const { name, value } = e.target;
    setUpdatedHealthData({ ...updatedHealthData, [name]: value });
  };

  const handleUpdateSubmit = async (field) => {
    try {
      let dataToSend;

      if (field.startsWith('otherFields.')) {
        const nestedField = field.split('.')[1];
        dataToSend = {
          otherFields: {
            ...updatedData.otherFields,
            [nestedField]: updatedData.otherFields[nestedField],
          },
        };
      } else {
        dataToSend = { [field]: updatedData[field] };
      }

      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/patients/${uid}`, dataToSend);
      if (response.status === 200) {
        alert("Patient Updated Successfully");
      } else {
        Promise.reject();
      }
      console.log('Patient updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating patient:', error.response ? error.response.data : error.message);
    }
  };

  const handleHealthUpdateSubmit = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/health/by-uid/${uid}`, updatedHealthData);
      if (response.status === 200) {
        alert("Health Record Updated Successfully");
        setHealth(updatedHealthData); // Update local state
      }
    } catch (error) {
      console.error('Error updating health record:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboard}>
        <h2 className={styles.title}>Patient Dashboard ( UID: {uid} )</h2>
        {patient && (
          <table className={styles.patientTable}>
            <tbody>
              <tr>
                <td className={styles.label}>NAME:</td>
                <td>
                  <input className={styles.inputField} type="text" name="name" value={updatedData.name || ''} onChange={handleUpdateChange} />
                </td>
                <td><button className={styles.button} onClick={() => handleUpdateSubmit('name')}>UPDATE</button></td>
              </tr>
              <tr>
                <td className={styles.label}>AGE:</td>
                <td>
                  <input className={styles.inputField} type="number" name="age" value={updatedData.age || ''} onChange={handleUpdateChange} />
                </td>
                <td><button className={styles.button} onClick={() => handleUpdateSubmit('age')}>UPDATE</button></td>
              </tr>
              <tr>
                <td className={styles.label}>GENDER:</td>
                <td>
                  <select className={styles.selectField} name="gender" value={updatedData.gender || ''} onChange={handleUpdateChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </td>
                <td><button className={styles.button} onClick={() => handleUpdateSubmit('gender')}>UPDATE</button></td>
              </tr>
              <tr>
                <td className={styles.label}>ADDRESS:</td>
                <td>
                  <input className={styles.inputField} type="text" name="otherFields[address]" value={updatedData.otherFields?.address || ''} onChange={handleUpdateChange} />
                </td>
                <td><button className={styles.button} onClick={() => handleUpdateSubmit('otherFields.address')}>UPDATE</button></td>
              </tr>
              <tr>
                <td className={styles.label}>EMAIL:</td>
                <td>
                  <input className={styles.inputField} type="text" name="otherFields[email]" value={updatedData.otherFields?.email || ''} onChange={handleUpdateChange} />
                </td>
                <td><button className={styles.button} onClick={() => handleUpdateSubmit('otherFields.email')}>UPDATE</button></td>
              </tr>
              <tr>
                <td className={styles.label}>PHONE:</td>
                <td>
                  <input className={styles.inputField} type="text" name="otherFields[phone]" value={updatedData.otherFields?.phone || ''} onChange={handleUpdateChange} />
                </td>
                <td><button className={styles.button} onClick={() => handleUpdateSubmit('otherFields.phone')}>UPDATE</button></td>
              </tr>
              <tr>
                <td className={styles.label}><strong>Blood Pressure:</strong></td>
                <td>
                  <input className={styles.inputField} type="text" name="bp" value={updatedHealthData.bp || ''} onChange={handleHealthChange} />
                </td>
                <td><button className={styles.button} onClick={handleHealthUpdateSubmit}>UPDATE</button></td>
              </tr>
              <tr>
                <td className={styles.label}><strong>Sugar:</strong></td>
                <td>
                  <input className={styles.inputField} type="number" name="sugar" value={updatedHealthData.sugar || ''} onChange={handleHealthChange} />
                </td>
                <td><button className={styles.button} onClick={handleHealthUpdateSubmit}>UPDATE</button></td>
              </tr>
              <tr>
                <td className={styles.label}><strong>Blood Group:</strong></td>
                <td>
                  <input className={styles.inputField} type="text" name="bloodGroup" value={updatedHealthData.bloodGroup || ''} onChange={handleHealthChange} />
                </td>
                <td><button className={styles.button} onClick={handleHealthUpdateSubmit}>UPDATE</button></td>
              </tr>
              <tr>
                <td className={styles.label}><strong>Height:</strong></td>
                <td>
                  <input className={styles.inputField} type="number" name="height" value={updatedHealthData.height || ''} onChange={handleHealthChange} />
                </td>
                <td><button className={styles.button} onClick={handleHealthUpdateSubmit}>UPDATE</button></td>
              </tr>
              <tr>
                <td className={styles.label}><strong>Weight:</strong></td>
                <td>
                  <input className={styles.inputField} type="number" name="weight" value={updatedHealthData.weight || ''} onChange={handleHealthChange} />
                </td>
                <td><button className={styles.button} onClick={handleHealthUpdateSubmit}>UPDATE</button></td>
              </tr>
              <tr>
                <td className={styles.label}><strong>BMI:</strong></td>
                <td>
                  <input className={styles.inputField} type="number" name="BMI" value={updatedHealthData.BMI || ''} onChange={handleHealthChange} />
                </td>
                <td><button className={styles.button} onClick={handleHealthUpdateSubmit}>UPDATE</button></td>
              </tr>
              <tr>
                <td className={styles.label}><strong>Eye Sight:</strong></td>
                <td>
                  <input className={styles.inputField} type="text" name="eyeSight" value={updatedHealthData.eyeSight || ''} onChange={handleHealthChange} />
                </td>
                <td><button className={styles.button} onClick={handleHealthUpdateSubmit}>UPDATE</button></td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
