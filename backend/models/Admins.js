const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
userSchema.index({ email: 1 });

// Create the User model
const Admins = mongoose.model('Admins', userSchema);

module.exports = Admins;
