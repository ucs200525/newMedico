// src/components/ReportList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReportList = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/api/reports');
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };

    fetchReports();
  }, []);

  const handleDelete = async (reportId) => {
    try {
      await axios.delete(`/api/reports/${reportId}`);
      setReports(reports.filter(report => report._id !== reportId));
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  return (
    <div>
      <h2>Report List</h2>
      <ul>
        {reports.map((report) => (
          <li key={report._id}>
            <h3>{report.name}</h3>
            {report.fileType === 'image' && <img src={`/uploads/${report.filePath}`} alt={report.name} />}
            {report.fileType === 'pdf' && (
              <a href={`/uploads/${report.filePath}`} target="_blank" rel="noopener noreferrer">View PDF</a>
            )}
            <button onClick={() => handleDelete(report._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportList;
