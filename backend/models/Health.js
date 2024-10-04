const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patients' }, 
  eyeSite: { type: String }, // Specify type for eyeSite
  height: { type: Number }, // Specify type for height
  weight: { type: Number }, // Corrected typo from 'wiehht' to 'weight'
  BMI: { type: Number }, // Specify type for BMI
  bloodGroup: { type: String, required: true }, 
  sugar: { type: Number, required: true }, 
  bp: { type: String, required: true }, 
  infections: { type: String }, 
  diseases: { type: String }
});

// Create the Health model
const Health = mongoose.model('Health', userSchema);

module.exports = Health;
