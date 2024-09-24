const Report = require('../models/Report');
const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');

// Get all reports for a specific patient (Admin only)
exports.getReports = async (req, res) => {
  const { patientId } = req.query;

  try {
    const reports = await Report.find({ patientId });
    logger.info(`Fetched reports for patient ID: ${patientId}`);
    res.json(reports);
  } catch (error) {
    logger.error(`Error fetching reports: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Upload a new report (Admin only)
exports.uploadReport = async (req, res) => {
  const { patientId } = req.body;
  const file = req.file; // Using multer for file handling

  try {
    if (!file) {
      logger.warn('No file uploaded');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const report = new Report({
      patientId,
      filePath: file.path,
      fileName: file.originalname,
      fileType: file.mimetype
    });

    await report.save();
    logger.info(`Report uploaded successfully for patient ID: ${patientId}`);
    res.status(201).json(report);
  } catch (error) {
    logger.error(`Error uploading report: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a report (Admin only)
exports.deleteReport = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await Report.findById(id);

    if (!report) {
      logger.warn(`Report not found for deletion: ${id}`);
      return res.status(404).json({ message: 'Report not found' });
    }

    // Delete file from server
    fs.unlink(path.join(__dirname, '../uploads', report.fileName), (err) => {
      if (err) {
        logger.error(`Error deleting file: ${err.message}`);
        return res.status(500).json({ message: 'Server error', error: err });
      }
    });

    await report.remove();
    logger.info(`Report deleted successfully: ${id}`);
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting report: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
};
