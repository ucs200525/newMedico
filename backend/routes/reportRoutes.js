const express = require('express');
const multer = require('multer');
const path = require('path');
const Report = require('../models/Report');
const Patients = require('../models/Patients'); // Import Patients model
const router = express.Router();
const logger = require('../utils/logger');
const { authenticateToken } = require('../middleware/authMiddleware');
const fs = require('fs'); // Import fs module

// Set up multer for file upload with original filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Ensure the directory exists
  },
  filename: (req, file, cb) => {
    // Save file with its original name
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20 MB limit
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf|jpg|jpeg|png/; // Accept various image formats
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and image files are allowed.'));
    }
  }
});

// @route   POST /api/reports/by-uid/:uid
// @desc    Upload a new report by patient UID (Admin only)
// @access  Private (Admin)
router.post('/by-uid/:uid', upload.single('file'), async (req, res) => {
  const { uid } = req.params; // Correctly get uid from params
  const file = req.file;

  if (!file) {
    logger.warn('No file uploaded');
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    // Find the patient by UID
    const patient = await Patients.findOne({ uid });
    if (!patient) {
      logger.warn(`Patient not found for UID: ${uid}`);
      return res.status(404).json({ message: 'Patient not found' });
    }

    const report = new Report({
      patientId: patient._id, // Use the patient's MongoDB ObjectId
      filePath: file.path, // Path will have the original name
      fileName: file.originalname, // Store original file name
      fileType: file.mimetype
    });
    await report.save();

    logger.info(`New report uploaded for patient UID: ${uid}`);
    res.status(201).json(report);
  } catch (error) {
    logger.error(`Error uploading report: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
});

// @route   PUT /api/reports/by-uid/:uid/:id
// @desc    Update a report by patient UID (Admin only)
// @access  Private (Admin)
router.put('/by-uid/:uid/:id', upload.single('file'), async (req, res) => {
  const { uid, id } = req.params;
  const file = req.file;

  try {
    // Find the patient by UID
    const patient = await Patients.findOne({ uid });
    if (!patient) {
      logger.warn(`Patient not found for UID: ${uid}`);
      return res.status(404).json({ message: 'Patient not found' });
    }

    const updateData = {
      filePath: file ? file.path : undefined,
      fileName: file ? file.originalname : undefined,
      fileType: file ? file.mimetype : undefined 
    };

    const report = await Report.findOneAndUpdate(
      { _id: id, patientId: patient._id },
      updateData,
      { new: true }
    );

    if (!report) {
      logger.warn(`Report not found for update by UID: ${uid}`);
      return res.status(404).json({ message: 'Report not found' });
    }

    logger.info(`Report updated successfully for UID: ${uid}`);
    res.json(report);
  } catch (error) {
    logger.error(`Error updating report: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
});

// @route   DELETE /api/reports/by-uid/:uid/:id
// @desc    Delete a report by patient UID (Admin only)
// @access  Private (Admin)
router.delete('/by-uid/:uid/:id', async (req, res) => {
  const { uid, id } = req.params;

  try {
    // Find the patient by UID
    const patient = await Patients.findOne({ uid });
    if (!patient) {
      logger.warn(`Patient not found for UID: ${uid}`);
      return res.status(404).json({ message: 'Patient not found' });
    }

    const report = await Report.findOneAndDelete({ _id: id, patientId: patient._id });

    if (!report) {
      logger.warn(`Report not found for deletion by UID: ${uid}`);
      return res.status(404).json({ message: 'Report not found' });
    }

    // Remove the file from the server
    fs.unlink(report.filePath, (err) => {
      if (err) {
        logger.error(`Error deleting file: ${err.message}`);
      }
    });

    logger.info(`Report deleted successfully for UID: ${uid}`);
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting report: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
});

// @route   GET /api/reports/by-uid/:uid
// @desc    Get all reports by patient UID (Admin only)
// @access  Private (Admin)
router.get('/by-uid/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    // Find the patient by UID
    const patient = await Patients.findOne({ uid });
    if (!patient) {
      logger.warn(`Patient not found for UID: ${uid}`);
      return res.status(404).json({ message: 'Patient not found' });
    }

    const reports = await Report.find({ patientId: patient._id });

    if (!reports.length) {
      logger.warn(`No reports found for UID: ${uid}`);
      return res.status(404).json({ message: 'No reports found' });
    }

    logger.info(`Fetched reports for UID: ${uid}`);
    res.json(reports);
  } catch (error) {
    logger.error(`Error fetching reports: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
});

// @route   GET /api/reports/:filePath
// @desc    Get a report file by its file path
// @access  Public
router.get('/:filePath', (req, res) => {
  const { filePath } = req.params;

  // Construct the full path to the file
  const fullPath = path.join(__dirname, '../uploads', filePath);
  console.log(`Full path: ${fullPath}`); // Log the full path for debugging

  // Check if the file exists
  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (err) {
      logger.warn(`File not found: ${fullPath}`);
      return res.status(404).json({ message: 'File not found' });
    }

    // Send the file as a response
    res.sendFile(fullPath, (err) => {
      if (err) {
        logger.error(`Error sending file: ${err.message}`);
        res.status(500).json({ message: 'Error sending file' });
      }
    });
  });
});

module.exports = router;
