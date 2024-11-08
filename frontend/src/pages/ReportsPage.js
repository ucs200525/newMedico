// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Reports = ({ uid }) => {
//   const [file, setFile] = useState(null);
//   const [ fileType,setFileType] = useState('');
//   const [name, setName] = useState('');
//   const [message, setMessage] = useState('');
//   const [reports, setReports] = useState([]);
//   const [editingReportId, setEditingReportId] = useState(null); // To track if a report is being edited

//   // Handle file change and set file type based on the selected file
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     const fileType = selectedFile.type.includes('image') ? 'image' : 'pdf';
//     setFileType(fileType);
//   };

//   // Fetch all reports by UID
//   const fetchReports = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/reports/by-uid/${uid}`);
//       setReports(response.data);
//     } catch (error) {
//       console.error('No reports found', error);
//     }
//   };

//   // Handle submit for adding a new report
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file || !name) {
//       setMessage('Please provide all fields');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('name', name);
//     formData.append('OrginalFileName',file.name);

//     try {
//       await axios.post(`${process.env.REACT_APP_API_URL}/api/reports/by-uid/${uid}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setMessage('Report added successfully');
//       setFile(null);
//       setName('');
//       fetchReports(); // Refetch reports after adding
//     } catch (error) {
//       setMessage('Error adding report');
//       console.error('Error adding report:', error);
//     }
//   };

//   // Handle update submission
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setMessage('Please select a file to upload');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       await axios.put(`${process.env.REACT_APP_API_URL}/api/reports/by-uid/${uid}/${editingReportId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setMessage('Report updated successfully');
//       setFile(null);
//       setEditingReportId(null); // Reset editing state
//       fetchReports(); // Refetch reports after updating
//     } catch (error) {
//       setMessage('Error updating report');
//       console.error('Error updating report:', error);
//     }
//   };

//   // Handle report edit click
//   const handleEdit = (report) => {
//     setFile(null); // Clear current file
//     setEditingReportId(report._id); // Set report ID for editing
//     setName(report.fileName); // Pre-fill name field with existing report name
//   };

//   // Handle report delete
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_API_URL}/api/reports/by-uid/${uid}/${id}`);
//       setMessage('Report deleted successfully');
//       fetchReports(); // Refetch reports after deletion
//     } catch (error) {
//       setMessage('Error deleting report');
//       console.error('Error deleting report:', error);
//     }
//   };

//   // Fetch reports when component mounts
//   useEffect(() => {
//     fetchReports();
//   }, []);

//   return (
//     <div>
//       <h1>Patient Reports for UID: {uid}</h1>
//       {message && <p>{message}</p>}
//       <form onSubmit={editingReportId ? handleUpdate : handleSubmit}>
//         <input type="file" accept=".pdf, .png, .jpg, .jpeg" onChange={handleFileChange} required />
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Report Name" required />
//         <button type="submit">{editingReportId ? 'Update Report' : 'Add Report'}</button>
//       </form>
//       <h2>Existing Reports</h2>
//       <ul>
//         {reports.map((report) => (
//           <li key={report._id}>
//             <span>{report.fileName}</span>
//             <button onClick={() => handleEdit(report)}>Edit</button>
//             <button onClick={() => handleDelete(report._id)}>Delete</button>
//             <a href={`${process.env.REACT_APP_API_URL}/api/reports/${encodeURIComponent(report.fileName)}`} target="_blank" rel="noopener noreferrer">
//   <button>Open</button>
// </a>

              

//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Reports;

// src/pages/Reports.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import styles from './Reports.module.css';

const Reports = ({ uid }) => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [reports, setReports] = useState([]);
  const [editingReportId, setEditingReportId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileType(selectedFile.type.includes('image') ? 'image' : 'pdf');
  };

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/reports/by-uid/${uid}`);
      setReports(response.data);
    } catch (error) {
      console.error('No reports found', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name) {
      setMessage('Please provide all fields');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('OrginalFileName', file.name);

    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/reports/by-uid/${uid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Report added successfully');
      setFile(null);
      setName('');
      fetchReports();
    } catch (error) {
      setMessage('Error adding report');
      console.error('Error adding report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/reports/by-uid/${uid}/${editingReportId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Report updated successfully');
      setFile(null);
      setEditingReportId(null);
      fetchReports();
    } catch (error) {
      setMessage('Error updating report');
      console.error('Error updating report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (report) => {
    setFile(null);
    setEditingReportId(report._id);
    setName(report.fileName);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/reports/by-uid/${uid}/${id}`);
      setMessage('Report deleted successfully');
      fetchReports();
    } catch (error) {
      setMessage('Error deleting report');
      console.error('Error deleting report:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Patient Reports</h1>
      {message && <p className={styles.message}>{message}</p>}
      <form className={styles.form} onSubmit={editingReportId ? handleUpdate : handleSubmit}>
        <input
          type="file"
          accept=".pdf, .png, .jpg, .jpeg"
          onChange={handleFileChange}
          required
          className={styles.fileInput}
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Report Name"
          required
          className={styles.textInput}
        />
        <button
          type="submit"
          className={`${styles.button} ${
            editingReportId ? styles.buttonUpdate : styles.buttonAdd
          }`}
        >
          {editingReportId ? 'Update Report' : 'Add Report'}
        </button>
      </form>
      <h2 className={styles.heading}>Existing Reports</h2>
      <ul className={styles.existingReports}>
        {reports.map((report) => (
          <li key={report._id} className={styles.reportItem}>
            <span className={styles.reportFileName}>{report.fileName}</span>
            <div className={styles.reportButtons}>
              <button className={`${styles.button} ${styles.buttonUpdate}`} onClick={() => handleEdit(report)}>
                Edit
              </button>
              <button className={`${styles.button} ${styles.buttonDelete}`} onClick={() => handleDelete(report._id)}>
                Delete
              </button>
              <a
                href={`${process.env.REACT_APP_API_URL}/api/reports/${encodeURIComponent(report.fileName)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={`${styles.button} ${styles.buttonOpen}`}>Open</button>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
