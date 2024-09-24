const User = require('../models/Admins');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password} = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (!name || !email || !password ) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }
    if (existingUser) {
      logger.warn(`Registration attempt failed: Email already exists`);
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create new user with plain text password
    const user = new User({ name, email, password});
    await user.save();

    logger.info(`User registered successfully: ${email}`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    logger.error(`Error registering user: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Authenticate user and return a token
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Login attempt failed: User not found`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password (plain text comparison)
    if (password !== user.password) {
      logger.warn(`Login attempt failed: Incorrect password`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    logger.info(`User logged in successfully: ${email}`);
    res.json({ token });
  } catch (error) {
    logger.error(`Error logging in: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Logout user (optional, can be handled by frontend)
exports.logout = (req, res) => {
  res.json({ message: 'Logout successful' });
};

module.exports = { registerUser, login, logout };
