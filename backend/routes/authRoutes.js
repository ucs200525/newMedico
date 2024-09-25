const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admins');
const router = express.Router(); // Use express.Router() instead of express()
const { validateRegister, validateLogin } = require('../middleware/validationMiddleware');
const logger = require('../utils/logger.js');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET=process.env.JWT_SECRET||"e24a7e342be9ef60b84f73f4698f4227d5ae4dfc5e452d7f012bf5fe02f58e4c8f73a2c5baf980927f1e9e2e645d8473f1df9ad7f4c53ae7c5ef4fdc7f1c2e0b";

// @route   POST /api/auth/register
// @desc    Register a new admin
// @access  Public
router.post('/register', validateRegister, async (req, res) => {
  const { name, email, password} = req.body; 
  try {
    const userExists = await Admin.findOne({ email });

    if (userExists) {
      logger.warn(`Registration attempt failed: User with email ${email} already exists`);
      return res.status(400).json({ message: 'User already exists' });
    }

    const admin = new Admin({ name, email, password }); 
    await admin.save();
    logger.info(`User registered successfully: ${email}`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    logger.error(`Error during registration: ${error.message}`);
    res.status(500).json({ message: 'Server error', error });
  }
});


// @route   DELETE /api/admins/:id
// @desc    Delete admin
// @access  Private (Assuming authentication is required)
router.delete('/:id', async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    await admin.remove();
    return res.json({ message: 'Admin deleted successfully' });

  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/login
// @desc    Login user and return token
// @access  Public
router.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const admin = await Admin.findOne({ email });

    if (!admin) { // User not found
      logger.warn(`Login attempt failed: User not found for email ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Direct comparison for plain text password
    if (password !== admin.password) {
      logger.warn(`Login attempt failed: Invalid credentials for email ${email}`);
      console.log(`Entered password: ${password}`);
      console.log(` password: ${admin.password}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, {
      expiresIn: '1h' //1m,1s,1h
    });

    logger.info(`User logged in successfully: ${email}`);
    res.json({ token });
  } catch (error) {
    logger.error('JWT_SECRET:', JWT_SECRET);
    const admin = await Admin.findOne({ email });
    logger.error(`Error during login: ${error.message}`);
    logger.warn(`Entered password: ${password}`);
    logger.warn(` password: ${admin.password}`);
    res.status(500).json({ message: 'Server error', error });
  }
});


// @route   POST /api/auth/loginUser
// @desc    Login user and return token
// @access  Public
router.post('/loginUser', async (req, res) => {
  try {
    // Generate JWT token
    const token = jwt.sign({ role: 'user' }, JWT_SECRET, {
      expiresIn: '1h' // Set expiration time for the token
    });

    // Here you can add logic to handle user data, e.g., saving user info in a database if needed

    logger.info(`User logged in successfully`);
    res.json({ token });
  } catch (error) {
    logger.error('JWT_SECRET:', JWT_SECRET);
    res.status(500).json({ message: 'Server error', error });
  }
});



// // Secret key for token validation (replace with your own secret key)
// const secretKey = JWT_SECRET;

// //    /api/auth/validate-token
// // API endpoint to validate a token
// router.post('/validate-token', (req, res) => {
//   try {
//     // Extract the token from the request body
//     const { token } = req.body;

//     // Check if the token is provided
//     if (!token) {
//       return res.status(400).json({ error: 'Token is required' });
//     }

//     // Verify the token using the secret key
//     jwt.verify(token, secretKey, (err, decoded) => {
//       if (err) {
//         // Token is invalid or expired
//         return res.status(401).json({ error: 'Invalid or expired token' });
//       }

//       // Token is valid, return the decoded payload
//       return res.json({ isValid: true, payload: decoded });
//     });
//   } catch (error) {
//     // Handle any unexpected errors
//     console.error(error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



// @route   POST /api/auth/logout
// @desc    Logout user (client-side handling required)
// @access  Public
router.post('/logout', (req, res) => {
  // Here, you might want to handle token invalidation on the client side
  // For example, by instructing the client to remove the token from local storage
  logger.info('Logout request received');
  res.json({ message: 'Logout successful. Please remove the token from client-side storage.' });
});

module.exports = router;


//Extra functionalities :- send otp for register and delete using nodemailer