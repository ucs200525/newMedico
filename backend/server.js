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
const front = "https://new-medico.vercel.app" || "http://localhost:3000";
app.use(cors({
  origin: 'front', // Frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Enable sending cookies with cross-origin requests
}));

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

// Create HTTP server using the Express app
const server = http.createServer(app);

// WebSocket server setup
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    console.log(`Received from Arduino: ${message}`);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
        console.log('Message sent to client');
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Log a message when WebSocket server is ready
wss.on('listening', () => {
  console.log('WebSocket server running');
});

// Server listening
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
