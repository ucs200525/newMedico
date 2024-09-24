const Patient = require('../models/Patients');
const logger = require('../utils/logger');

// Get all patient profiles (Admin only)
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    logger.info('Fetched all patient profiles');
    res.json(patients);
  } catch (error) {
    logger.error(`Error fetching patient profiles: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Add a new patient profile (Admin only)
exports.addPatient = async (req, res) => {
  const { uid, name, age, gender, phoneNumber, otherFields } = req.body;

  try {
    const patient = new Patient({ uid, name, age, gender, phoneNumber, otherFields });
    await patient.save();
    logger.info(`New patient profile added: ${name}`);
    res.status(201).json(patient);
  } catch (error) {
    logger.error(`Error adding new patient profile: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update an existing patient profile (Admin only)
exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const patient = await Patient.findByIdAndUpdate(id, updates, { new: true });

    if (!patient) {
      logger.warn(`Patient not found for update: ${id}`);
      return res.status(404).json({ message: 'Patient not found' });
    }

    logger.info(`Patient profile updated successfully: ${id}`);
    res.json(patient);
  } catch (error) {
    logger.error(`Error updating patient profile: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a patient profile (Admin only)
exports.deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findByIdAndDelete(id);

    if (!patient) {
      logger.warn(`Patient not found for deletion: ${id}`);
      return res.status(404).json({ message: 'Patient not found' });
    }

    logger.info(`Patient profile deleted successfully: ${id}`);
    res.json({ message: 'Patient profile deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting patient profile: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
};
