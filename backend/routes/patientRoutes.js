const express = require('express');
const Patient = require('../models/Patients');
const jwt = require('jsonwebtoken');
const router = express.Router();
const logger = require('../utils/logger');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');



const JWT_SECRET=process.env.JWT_SECRET;


// @route   GET /api/patients/:uid
// @desc    Get patient profile by UID
// @access  Private (Admin)
router.get('/:uid', async (req, res) => {
  try {
    const patient = await Patient.findOne({ uid: req.params.uid });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patient);
  } catch (err) {
    logger.error('Error fetching patient by UID:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// @route   POST /api/patients
// @desc    Add a new patient
// @access  Private (Admin)
router.post('/', async (req, res) => {
  const { uid, name, age, gender, otherFields } = req.body;

  try {
    const newPatient = new Patient({ uid, name, age, gender, otherFields });
    await newPatient.save();
    logger.info(`New patient added: ${uid}`);
    res.status(201).json(newPatient);
  } catch (err) {
    logger.error('Error adding patient:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// @route   PUT /api/patients/:uid
// @desc    Update a patient by UID
// @access  Private (Admin)
router.put('/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const update = req.body;

    // Find the patient by UID and update the specific field(s)
    const updatedPatient = await Patient.findOneAndUpdate(
      { uid },
      { $set: update }, // Use $set to update only the provided fields
      { new: true, runValidators: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(updatedPatient);
  } catch (err) {
    logger.error('Error updating patient:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


/*
// @route   PUT /api/patients/:id
// @desc    Update patient details by ID
// @access  Private (Admin)
router.put('/:id', async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(updatedPatient);
  } catch (err) {
    logger.error('Error updating patient:', err);
    res.status(500).json({ message: 'Server error' });
  }
});*/


// @route   DELETE /api/patients/:uid
// @desc    Delete patient by UID
// @access  Private (Admin)
router.delete('/:uid', async (req, res) => {
  try {
    const { uid } = req.params;

    // Find the patient by UID and delete it
    const deletedPatient = await Patient.findOneAndDelete({ uid: uid });

    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json({ message: 'Patient deleted successfully' });
  } catch (err) {
    logger.error('Error deleting patient:', err);
    res.status(500).json({ message: 'Server error' });
  }
});




// @route   POST /api/patients/verify-uid
// @desc    Verify user UID
// @access  Public
router.post('/verify-uid', async (req, res) => {
  const { uid } = req.body;

  try {
    const patient = await Patient.findOne({ uid });
    if (!patient) {
      logger.warn(`UID verification failed: UID ${uid} not found`);
      return res.status(404).json({ message: 'UID not found' });
    }

    logger.info(`UID verified: ${uid}`);
    
    // Assuming the patient object includes a role and a token for the admin
    const token = jwt.sign({ id: patient._id }, JWT_SECRET, { expiresIn: '1h' });
    
    return res.status(200).json({
      token,
      uid: patient.uid ,// or however you store the UID
      name:patient.name
    });
  } catch (error) {
    logger.error(`Error during UID verification: ${error.message}`);
    return res.status(500).json({ message: 'Server error' });
  }
});

///new routes check uid url input///////////////////////////////////////////////////////////////////////




// Variable to store the latest UID from Arduino
let latestUID = ''; 
// @route   POST /api/patients/arduino/uid
// @desc    Receive UID from Arduino
// @access  Private (for Arduino to send UID)
router.post('/arduino/:uid', async (req, res) => {
  const { uid } = req.params;
  
  // if (!uid) {
  //   logger.warn('UID missing in Arduino request');
  //   return res.status(400).json({ message: 'UID is required' });
  // }

  latestUID = uid; // Store UID in the server variable
  logger.info(`Received UID from Arduino: ${uid}`); // Log the UID received

  // Sending the latest UID back to the frontend
  logger.info(`Sending latest UID to frontend: ${latestUID}`);
  return res.status(200).json({ uid: uid });
});

// @route   GET /api/patients/latest-uid
// @desc    Return the latest UID (polled by frontend)
// @access  Public
router.get('/latest-uid', (req, res) => {
  // if (!latestUID) {
  //   logger.warn('No UID received from Arduino yet');
  //   return res.status(404).json({ message: 'No UID available' });
  // }

  logger.info(`Sending latest UID to frontend: ${latestUID}`);
  return res.status(200).json({ uid: latestUID });
});


///new routes end/////////////////////////////////////////////////////////////////////////////////////

module.exports = router;
