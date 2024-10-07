const mongoose = require('mongoose'); 

const healthSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patients' }, 
  uid: { type: String, required: true, unique: true },
  eyeSight: { type: String },  // Fixed typo from eyeSite to eyeSight
  height: { type: Number },
  weight: { type: Number },
  BMI: { type: Number },
  bloodGroup: { type: String, required: true }, 
  sugar: { type: Number, required: true }, 
  bp: { type: String, required: true }, 
  infections: { type: String },
  diseases: { type: String }
});

// Create the Health model
const Health = mongoose.model('Health', healthSchema);

module.exports = Health;
