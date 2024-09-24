const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patients'}, 
  bloodGroup: { type: String, required: true }, 
  sugar: { type: Number, required: true }, 
  bp: { type: String, required: true }, 
  infections: { type: String }, 
  diseases: { type: String }
});

// Create the Health model
const Health = mongoose.model('Health', userSchema);

module.exports = Health;
