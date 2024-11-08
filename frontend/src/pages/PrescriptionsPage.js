// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import PrescriptionList from '../components/PrescriptionList';

// const Prescriptions = ({ uid }) => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [editingPrescription, setEditingPrescription] = useState(null);
//   const [formData, setFormData] = useState({
//     uid: uid, // Initialize uid from props
//     medication: '',
//     dosage: '',
//     instructions: ''
//   });

//   // Fetch prescriptions
//   useEffect(() => {
//     const fetchPrescriptions = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/prescriptions/by-uid/${uid}`);
//         setPrescriptions(response.data);
//       } catch (error) {
//         console.error('Error fetching prescription data:', error);
//       }
//     };

//     if (uid) {
//       fetchPrescriptions();
//     }
//   }, [uid]); // Add uid as dependency

//   // Set form data when editing
//   useEffect(() => {
//     if (editingPrescription) {
//       setFormData({
//         uid: editingPrescription.uid,
//         medication: editingPrescription.medication,
//         dosage: editingPrescription.dosage,
//         instructions: editingPrescription.instructions
//       });
//     }
//   }, [editingPrescription]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editingPrescription) {
//       // Update prescription
//       try {
//         await axios.put(`${process.env.REACT_APP_API_URL}/api/prescriptions/by-uid/${uid}`, formData);
//         setPrescriptions(prescriptions.map(prescription =>
//           prescription._id === editingPrescription._id ? { ...prescription, ...formData } : prescription
//         ));
//         setEditingPrescription(null);
//         resetForm();
//       } catch (error) {
//         console.error('Error updating prescription:', error);
//       }
//     } else {
//       // Add new prescription
//       try {
//         const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/prescriptions/by-uid/${uid}`, formData);
//         setPrescriptions([...prescriptions, response.data]);  // Use the response data that contains the new prescription
//         resetForm();
//       } catch (error) {
//         console.error('Error adding prescription:', error);
//       }
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       uid: uid, // Keep the UID from props
//       medication: '',
//       dosage: '',
//       instructions: ''
//     });
//   };

//   const handleEdit = (prescription) => {
//     setEditingPrescription(prescription);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_API_URL}/api/prescriptions/by-uid/${uid}`);
//       setPrescriptions(prescriptions.filter(prescription => prescription._id !== id));
//     } catch (error) {
//       console.error('Error deleting prescription:', error);
//     }
//   };

//   return (
//     <div className='pr'>
//       <div >
//       <h1> Manage Prescriptions</h1>
//       <PrescriptionList 
//         onPrescriptionEdit={handleEdit} 
//         onPrescriptionDelete={handleDelete} 
//         prescriptions={prescriptions} 
//       />
//       </div>
//       <div className="ab">
//       <form onSubmit={handleSubmit}>
        
//         <h2>{editingPrescription ? 'Edit Prescription' : 'Add New Prescription'}</h2>
//         <input
//           type="text"
//           name="medication"
//           value={formData.medication}
//           onChange={handleInputChange}
//           placeholder="Medication"
//           required
//         />
//         <input
//           type="text"
//           name="dosage"
//           value={formData.dosage}
//           onChange={handleInputChange}
//           placeholder="Dosage"
//           required
//         />
//         <input
//           type="text"
//           name="instructions"
//           value={formData.instructions}
//           onChange={handleInputChange}
//           placeholder="Instructions"
//           required
//         />
//         <button type="submit">
//           {editingPrescription ? 'Update Prescription' : 'Add Prescription'}
//         </button>
        
//       </form>
//       </div>
      
//     </div>
//   );
// };

// export default Prescriptions;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrescriptionList from '../components/PrescriptionList';
import LoadingSpinner from '../components/LoadingSpinner'; // Import the loading spinner component
import styles from './Prescriptions.module.css'; // Import the CSS Module

const Prescriptions = ({ uid }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [formData, setFormData] = useState({
    uid: uid, // Initialize uid from props
    medication: '',
    dosage: '',
    instructions: ''
  });
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch prescriptions
  useEffect(() => {
    const fetchPrescriptions = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/prescriptions/by-uid/${uid}`);
        setPrescriptions(response.data);
      } catch (error) {
        console.error('Error fetching prescription data:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (uid) {
      fetchPrescriptions();
    }
  }, [uid]); // Add uid as dependency

  // Set form data when editing
  useEffect(() => {
    if (editingPrescription) {
      setFormData({
        uid: editingPrescription.uid,
        medication: editingPrescription.medication,
        dosage: editingPrescription.dosage,
        instructions: editingPrescription.instructions
      });
    }
  }, [editingPrescription]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingPrescription) {
      // Update prescription
      setLoading(true); // Start loading for the update
      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/prescriptions/by-uid/${uid}`, formData);
        setPrescriptions(prescriptions.map(prescription =>
          prescription._id === editingPrescription._id ? { ...prescription, ...formData } : prescription
        ));
        setEditingPrescription(null);
        resetForm();
      } catch (error) {
        console.error('Error updating prescription:', error);
      } finally {
        setLoading(false); // Stop loading after the update
      }
    } else {
      // Add new prescription
      setLoading(true); // Start loading for the submission
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/prescriptions/by-uid/${uid}`, formData);
        setPrescriptions([...prescriptions, response.data]);  // Use the response data that contains the new prescription
        resetForm();
      } catch (error) {
        console.error('Error adding prescription:', error);
      } finally {
        setLoading(false); // Stop loading after the submission
      }
    }
  };

  const resetForm = () => {
    setFormData({
      uid: uid, // Keep the UID from props
      medication: '',
      dosage: '',
      instructions: ''
    });
  };

  const handleEdit = (prescription) => {
    setEditingPrescription(prescription);
  };

  const handleDelete = async (id) => {
    setLoading(true); // Start loading for deletion
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/prescriptions/by-uid/${uid}`); // Ensure the correct endpoint is used
      setPrescriptions(prescriptions.filter(prescription => prescription._id !== id));
    } catch (error) {
      console.error('Error deleting prescription:', error);
    } finally {
      setLoading(false); // Stop loading after deletion
    }
  };

  const togglePrescriptionDetails = (id) => {
    setPrescriptions(prescriptions.map(prescription => {
      if (prescription._id === id) {
        return { ...prescription, showDetails: !prescription.showDetails };
      }
      return prescription;
    }));
  };

  if (loading) {
    return <LoadingSpinner />; // Show loading spinner
  }

  return (
    <div className={styles.pr}>
      <div className={styles.ab}>
        <form onSubmit={handleSubmit}>
          <h2>{editingPrescription ? 'Edit Prescription' : 'Add New Prescription'}</h2>
          <input
            type="text"
            name="medication"
            value={formData.medication}
            onChange={handleInputChange}
            placeholder="Medication"
            required
          />
          <input
            type="text"
            name="dosage"
            value={formData.dosage}
            onChange={handleInputChange}
            placeholder="Dosage"
            required
          />
          <input
            type="text"
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
            placeholder="Instructions"
            required
          />
          <button type="submit">
            {editingPrescription ? 'Update Prescription' : 'Add Prescription'}
          </button>
        </form>
      </div>
      <h1 className={styles.h1}> Manage Prescriptions</h1>
      <PrescriptionList 
        onPrescriptionEdit={handleEdit} 
        onPrescriptionDelete={handleDelete} 
        prescriptions={prescriptions} 
        onToggleDetails={togglePrescriptionDetails}
      />
    </div>
  );
};

export default Prescriptions;

//with loading