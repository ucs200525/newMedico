import React, { useState } from 'react';
import axios from 'axios';

const Health = () => {
  const [healthData, setHealthData] = useState({
    uid: '',
    eyeSite: '',
    height: '',
    weight: '',
    BMI: '',
    bloodGroup: '',
    sugar: '',
    bp: '',
    infections: '',
    diseases: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHealthData({ ...healthData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/health/by-uid', healthData);
      console.log('Health record added successfully:', response.data);
      alert("Health Record Added Successfully");
      resetForm(); // Reset form after submission
    } catch (error) {
      console.error('Error adding health record:', error.response ? error.response.data : error.message);
    }
  };

  const resetForm = () => {
    setHealthData({
      uid: '',
      eyeSite: '',
      height: '',
      weight: '',
      BMI: '',
      bloodGroup: '',
      sugar: '',
      bp: '',
      infections: '',
      diseases: ''
    });
  };

  return (
    <div>
      <h2>Add Health Record</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="uid" placeholder="UID" onChange={handleChange} required />
        <input type="text" name="eyeSite" placeholder="Eye Site" onChange={handleChange} required />
        <input type="number" name="height" placeholder="Height (cm)" onChange={handleChange} required />
        <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} required />
        <input type="number" name="BMI" placeholder="BMI" onChange={handleChange} required />
        <input type="text" name="bloodGroup" placeholder="Blood Group" onChange={handleChange} required />
        <input type="number" name="sugar" placeholder="Sugar Level" onChange={handleChange} required />
        <input type="text" name="bp" placeholder="Blood Pressure" onChange={handleChange} required />
        <input type="text" name="infections" placeholder="Infections" onChange={handleChange} />
        <input type="text" name="diseases" placeholder="Diseases" onChange={handleChange} />
        <button type="submit">Add Health Record</button>
      </form>
    </div>
  );
};

export default Health;
