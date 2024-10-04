const axios = require('axios');

axios.post('http://localhost:4000/api/patients/arduino/uid001', { uid: 'uid001' })
  .then(response => {
    console.log('Data:', response.data);
  })
  .catch(error => {
    console.error('Error sending data:', error);
  });

  