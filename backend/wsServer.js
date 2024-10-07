const WebSocket = require('ws');
const http = require('http');
const wsPORT = process.env.wsPORT;
// HTTP server setup
const server = http.createServer((req, res) => {
  res.end('WebSocket server running...\n');
});

// WebSocket server setup
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    console.log(`Received from Arduino: ${message}`);
    wss.clients.forEach((client) => {
    console.log(`Client readyState: ${client.readyState}`); // Check the client's state
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

// Start server
server.listen(wsPORT, () => {
  console.log(`Server listening on port ${wsPORT}`);
});
