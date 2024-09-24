const mongoose = require('mongoose');

// Define the schema for the Prescription model
const prescriptionSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patients' },  // Refers to the patient's _id
  medication: { type: String, required: true }, 
  dosage: { type: String, required: true }, 
  instructions: { type: String, required: true }
}, { timestamps: true });  

// Create the Prescription model
const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
