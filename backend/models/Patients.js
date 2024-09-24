const mongoose = require('mongoose');

// Define the schema for the Patient model
const patientSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patients' },  // Refers to the patient's _id
  uid: { type: String, required: true, unique: true }, // Ensure each UID is unique
  name: { type: String, required: true }, 
  age: { type: Number, required: true }, 
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  /* 
    photo: {
    type: String, // To store image URLs or base64 strings
    required: false
  }
  */
  otherFields: { type: Map, of: String } 
  /*
  Other fields are address,email,phone number 
  */
});

// Create the Patient model
const Patients = mongoose.model('Patients', patientSchema);

module.exports = Patients;
