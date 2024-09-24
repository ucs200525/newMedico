const express = require('express');
const Prescription = require('../models/Prescription');
const Patients = require('../models/Patients'); // Import Patients model
const router = express.Router();
const logger = require('../utils/logger');
const { authenticateToken } = require('../middleware/authMiddleware');


// @route   GET /api/prescriptions/by-uid/:uid
// @desc    Get all prescriptions by patient UID (Admin only)
// @access  Private (Admin)
router.get('/by-uid/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    // Find the patient by UID
    const patient = await Patients.findOne({ uid: req.params.uid });
    if (!patient) {
      logger.warn(`Patient not found for UID: ${uid}`);
      return res.status(404).json({ message: 'Patient not found' });
    }

    const prescriptions = await Prescription.find({  patientId: patient._id  });

    if (!prescriptions.length) {
      logger.warn(`No prescriptions found for UID: ${uid}`);
      return res.status(404).json({ message: 'No prescriptions found' });
    }

    logger.info(`Fetched prescriptions for UID: ${uid}`);
    res.json(prescriptions);
  } catch (error) {
    logger.error(`Error fetching prescriptions: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
});

// @route   POST /api/prescriptions/by-uid
// @desc    Add a new prescription by patient UID (Admin only)
// @access  Private (Admin)
router.post('/by-uid/:uid', async (req, res) => {
  const { uid, medication, dosage, instructions,date } = req.body;
 
  // // Validate input
  // const validationErrors = validateInput({ uid, medication, dosage, instructions });
  // if (validationErrors.length) {
  //   return res.status(400).json({ message: 'Invalid input', errors: validationErrors });
  // }
  
  try {
    // Find the patient by UID
    const patient = await Patients.findOne({ uid });
    if (!patient) {
      logger.warn(`Patient not found for UID: ${uid}`);
      return res.status(404).json({ message: 'Patient not found' });
    }

    const prescription = new Prescription({ 
      patientId: patient._id, // Use the patient's MongoDB ObjectId
      medication,
      dosage, 
      instructions ,
      date
    });
    await prescription.save();
    logger.info(`New prescription added for patient UID: ${uid}`);
    res.status(201).json(prescription);
  } catch (error) {
    logger.error(`Error adding new prescription: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
});

// @route   PUT /api/prescriptions/by-uid/:uid
// @desc    Update a prescription by patient UID (Admin only)
// @access  Private (Admin)
router.put('/by-uid/:uid', async (req, res) => {
  const { uid } = req.params;
  const updates = req.body;

  try {
    // Find the patient by UID
    const patient = await Patients.findOne({ uid });
    if (!patient) {
      logger.warn(`Patient not found for UID: ${uid}`);
      return res.status(404).json({ message: 'Patient not found' });
    }

    const prescription = await Prescription.findOneAndUpdate(
      { patientId: patient._id }, // Use the patient's MongoDB ObjectId
      updates,
      { new: true }
    );

    if (!prescription) {
      logger.warn(`Prescription not found for update by UID: ${uid}`);
      return res.status(404).json({ message: 'Prescription not found' });
    }

    logger.info(`Prescription updated successfully for UID: ${uid}`);
    res.json(prescription);
  } catch (error) {
    logger.error(`Error updating prescription: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
});

// @route   DELETE /api/prescriptions/by-uid/:uid
// @desc    Delete a prescription by patient UID (Admin only)
// @access  Private (Admin)
router.delete('/by-uid/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    // Find the patient by UID
    const patient = await Patients.findOne({ uid });
    if (!patient) {
      logger.warn(`Patient not found for UID: ${uid}`);
      return res.status(404).json({ message: 'Patient not found' });
    }

    const prescription = await Prescription.findOneAndDelete({ patientId: patient._id });

    if (!prescription) {
      logger.warn(`Prescription not found for deletion by UID: ${uid}`);
      return res.status(404).json({ message: 'Prescription not found' });
    }

    logger.info(`Prescription deleted successfully for UID: ${uid}`);
    res.json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting prescription: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
