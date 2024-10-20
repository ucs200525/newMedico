const socket = new WebSocket('ws://localhost:8080');

// Event: Connection opened
socket.onopen = () => {
  console.log('Connected to WebSocket server');
  socket.send('Hello from Client');
};

// Event: Message received from server
socket.onmessage = (event) => {
  console.log(`Message from server: ${event.data}`);
};

// Event: Connection closed
socket.onclose = () => {
  console.log('Disconnected from WebSocket server');
};

// Event: Error occurred
socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};


