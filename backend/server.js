const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors'); // Import cors
const authRoute = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const reportRoutes = require('./routes/reportRoutes');
const healthRoutes = require('./routes/healthRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const dbUrl = process.env.MONGO_URL;
const port = process.env.PORT;


const app = express();
// Enable CORS for all routes
app.use(cors({
   origin: "*", //  Frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Enable sending cookies with cross-origin requests
}));


// Middleware to parse JSON bodies
app.use(express.json());
app.use(morgan('dev'));  // Logging middleware

// MongoDB connection
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Routes
app.use('/api/auth', authRoute);               // Admin routes
app.use('/api/patients', patientRoutes);        // Patient routes
app.use('/api/prescriptions', prescriptionRoutes); // Prescription routes
app.use('/api/reports', reportRoutes);          // Report routes
app.use('/api/health', healthRoutes);          // Health routes
// Error handling middleware
app.use(errorHandler);

// Server listening

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
