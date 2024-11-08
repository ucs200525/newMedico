const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors'); // Import cors
const WebSocket = require('ws'); // Import WebSocket
const http = require('http'); // Import http

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
const front = ['https://new-medico-cukslsvdh-ucs-projects-765a2e85.vercel.app', 'http://localhost:3000'];
const corsOptions = {
  origin: 'https://new-medico-mvh4msv8w-ucs-projects-765a2e85.vercel.app', // Allow this domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));


app.get("/", (req, res) => {
  res.json("Server Running Successful");
});

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

// app.use((req, res, next) => {
//   res.setHeader('Content-Security-Policy', "connect-src 'self' ws://localhost:4000");
//   next();
// });


// Server listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
