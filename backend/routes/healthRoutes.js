const express = require('express');
const Health = require('../models/Health');
const Patients = require('../models/Patients'); // Import Patients model
const router = express.Router();
const logger = require('../utils/logger');
const { authenticateToken } = require('../middleware/authMiddleware');

// @route   POST /api/health/by-uid
// @desc    Add health record by patient UID (Admin only)
// @access  Private (Admin)
router.post('/by-uid', async (req, res) => {
  const { uid, bloodGroup, sugar, bp, infections, diseases, eyeSite, height, weight, BMI } = req.body;

  try {
    // Find the patient by UID
    const patient = await Patients.findOne({ uid });
    if(!patient){
      logger.warn(`patient record not found for UID: ${uid}`);
      return res.status(404).json({ message: 'patient record not found for UID' });
    }
    const healthRecord = new Health({ uid, bloodGroup, sugar, bp, infections, diseases, eyeSite, height, weight, BMI });

    await healthRecord.save();
    logger.info(`New health record added for patient UID: ${uid}`);
    res.status(201).json(healthRecord);
  } catch (error) {
    logger.error(`Error adding health record: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
});

// @route   PUT /api/health/by-uid/:uid/:id
// @desc    Update health record by patient UID (Admin only)
// @access  Private (Admin)
router.put('/by-uid/:uid', async (req, res) => {
  const { uid } = req.params;
  const update = req.body;
  try {
    // Find the patient by UID
    const patient = await Patients.findOne({ uid });

    const healthRecord = await Health.findOneAndUpdate(
      { uid },
      { $set: update }, // Use $set to update only the provided fields
      { new: true, runValidators: true }
    );

    if (!healthRecord) {
      logger.warn(`Health record not found for update by UID: ${uid}`);
      return res.status(404).json({ message: 'Health record not found' });
    }

    logger.info(`Health record updated successfully for UID: ${uid}`);
    res.json(healthRecord);
  } catch (error) {
    logger.error(`Error updating health record: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
});

// @route   DELETE /api/health/by-uid/:uid/:id
// @desc    Delete health record by patient UID (Admin only)
// @access  Private (Admin)
router.delete('/by-uid/:uid', async (req, res) => {
  const { uid, id } = req.params;

  try {
    // Find the patient by UID
    const patient = await Patients.findOne({ uid });
    if (!patient) {
      logger.warn(`Patient not found for UID: ${uid}`);
      return res.status(404).json({ message: 'Patient not found' });
    }

    const healthRecord = await Health.findOneAndDelete({ _id: id, patientId: patient._id });

    if (!healthRecord) {
      logger.warn(`Health record not found for deletion by UID: ${uid}`);
      return res.status(404).json({ message: 'Health record not found' });
    }

    logger.info(`Health record deleted successfully for UID: ${uid}`);
    res.json({ message: 'Health record deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting health record: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
});

// // @route   GET /api/health/by-uid/:uid
// // @desc    Get all health records by patient UID (Admin only)
// // @access  Private (Admin)
// router.get('/by-uid/:uid', async (req, res) => {

//   try {
//     // Find the patient by UID
//     const patient = await Patients.findOne({ uid: req.params.uid  });
//     if (!patient) {
//       logger.warn(`Patient not found for UID: ${uid}`);
//       return res.status(404).json({ message: 'Patient not found' });
//     }

//     const healthRecords = await Health.find({ patientId: patient._id });

//     if (!healthRecords.length) {
//       logger.warn(`No health records found for UID: ${uid}`);
//       return res.status(404).json({ message: 'No health records found' });
//     }

//     logger.info(`Fetched health records for UID: ${uid}`);
//     res.json(healthRecords);
//   } catch (error) {
//     logger.error(`Error fetching health records: ${error.message}`);
//     res.status(500).json({ message: 'Server error', error });
//   }
// });



// @route   GET /api/health/by-uid/:uid
// @desc    Get all health records by patient UID (Admin only)
// @access  Private (Admin)
router.get('/by-uid/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    // Find all health records associated with the patient
    const healthRecords = await Health.findOne({ uid: req.params.uid });

    logger.info(`Fetched health records for UID: ${uid}`);
    res.json(healthRecords);  // Return the health records
  } catch (error) {
    logger.error(`Error fetching health records: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
