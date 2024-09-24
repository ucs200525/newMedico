const axios = require('axios');

axios.post('http://localhost:5000/api/auth/register', {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: 'password123',
})
.then(response => {
  console.log('User registered successfully:', response.data);
})
.catch(error => {
  console.error('Error registering user:', error.response ? error.response.data : error.message);
});
