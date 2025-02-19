import axios from 'axios';

const addPatients = async (patients) => {
    for (const patient of patients) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/patients`, patient);
            console.log('Patient added successfully:', response.data);
        } catch (error) {
            console.error('Error adding patient:', error);
        }
    }
};

// Example patients data
const patients = [
    {
        uidnumber: 10001,
        name: 'John Doe',
        age: 29,
        gender: 'Male',
        address: '123 Elm Street, Springfield',
        email: 'johndoe@gmail.com',
        phone: '9876543210'
    },
    {
        uidnumber: 10002,
        name: 'Jane Smith',
        age: 34,
        gender: 'Female',
        address: '456 Maple Avenue, Springfield',
        email: 'janesmith@gmail.com',
        phone: '9876543211'
    },
    {
        uidnumber: 10003,
        name: 'Michael Brown',
        age: 40,
        gender: 'Male',
        address: '789 Oak Drive, Springfield',
        email: 'michaelbrown@gmail.com',
        phone: '9876543212'
    },
    {
        uidnumber: 10004,
        name: 'Emily Davis',
        age: 25,
        gender: 'Female',
        address: '101 Pine Road, Springfield',
        email: 'emilydavis@gmail.com',
        phone: '9876543213'
    },
    {
        uidnumber: 10005,
        name: 'David Wilson',
        age: 28,
        gender: 'Male',
        address: '202 Birch Lane, Springfield',
        email: 'davidwilson@gmail.com',
        phone: '9876543214'
    },
    {
        uidnumber: 10006,
        name: 'Sarah Johnson',
        age: 30,
        gender: 'Female',
        address: '303 Cedar Street, Springfield',
        email: 'sarahjohnson@gmail.com',
        phone: '9876543215'
    },
    {
        uidnumber: 10007,
        name: 'Daniel Lee',
        age: 32,
        gender: 'Male',
        address: '404 Walnut Way, Springfield',
        email: 'daniellee@gmail.com',
        phone: '9876543216'
    },
    {
        uidnumber: 10008,
        name: 'Laura Martinez',
        age: 27,
        gender: 'Female',
        address: '505 Cherry Crescent, Springfield',
        email: 'lauramartinez@gmail.com',
        phone: '9876543217'
    }
];

// Usage
addPatients(patients);
