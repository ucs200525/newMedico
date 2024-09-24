const Prescription = require('../models/Prescription');
const logger = require('../utils/logger');

// Get all prescriptions (Admin only)
exports.getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    logger.info('Fetched all patient prescriptions');
    res.json(prescriptions);
  } catch (error) {
    logger.error(`Error fetching prescriptions: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Add a new prescription (Admin only)
exports.addPrescription = async (req, res) => {
  const { patientId, medication, dosage, instructions } = req.body;

  try {
    const prescription = new Prescription({ patientId, medication, dosage, instructions });
    await prescription.save();
    logger.info(`New prescription added for patient ID: ${patientId}`);
    res.status(201).json(prescription);
  } catch (error) {
    logger.error(`Error adding new prescription: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update an existing prescription (Admin only)
exports.updatePrescription = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const prescription = await Prescription.findByIdAndUpdate(id, updates, { new: true });

    if (!prescription) {
      logger.warn(`Prescription not found for update: ${id}`);
      return res.status(404).json({ message: 'Prescription not found' });
    }

    logger.info(`Prescription updated successfully: ${id}`);
    res.json(prescription);
  } catch (error) {
    logger.error(`Error updating prescription: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a prescription (Admin only)
exports.deletePrescription = async (req, res) => {
  const { id } = req.params;

  try {
    const prescription = await Prescription.findByIdAndDelete(id);

    if (!prescription) {
      logger.warn(`Prescription not found for deletion: ${id}`);
      return res.status(404).json({ message: 'Prescription not found' });
    }

    logger.info(`Prescription deleted successfully: ${id}`);
    res.json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting prescription: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
};
