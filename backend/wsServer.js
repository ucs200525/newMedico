const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');  // Correct import for the parser

// Set up WebSocket server
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Set up serial port communication (adjust COM port and baud rate as per your Arduino configuration)
const port = new SerialPort({ path: 'COM3', baudRate: 9600 }); 
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' })); // Correctly instantiate the ReadlineParser

// On connection to WebSocket
wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');
  
  // Listen for data from Arduino
  parser.on('data', (uid) => {
    console.log('UID from Arduino:', uid);
    
    // Send UID to the frontend
    ws.send(uid);
  });

  ws.on('close', () => {
    console.log('Client disconnected from WebSocket');
  });
});

port.on('error', (err) => {
  console.error('Serial port error:', err.message);
});
