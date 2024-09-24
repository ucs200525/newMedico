const mongoose = require('mongoose');

// Define the schema for the Report model
const reportSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patients' }, 
  filePath: { type: String, required: true }, 
  fileName: { type: String, required: true }, 
  fileType: { type: String, required: true }, 
  uploadedAt: { type: Date, default: Date.now }
});

// Create the Report model
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
