import axios from 'axios';

const addPrescription = async (prescriptionData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/prescriptions`, prescriptionData);
        console.log('Prescription added successfully:', response.data);
    } catch (error) {
        console.error('Error adding prescription:', error);
    }
};

// Example prescription data for each patient without uid
const prescriptions = [
    {
        medication: 'Salbutamol Inhaler',
        dosage: '1 puff as needed for wheezing',
        duration: 'Until symptoms resolve'
    },
    {
        medication: 'Cetirizine',
        dosage: '10 mg once daily',
        duration: 'As needed for allergies'
    },
    {
        medication: 'Amlodipine',
        dosage: '5 mg once daily',
        duration: 'Indefinitely for hypertension'
    },
    {
        medication: 'Oseltamivir',
        dosage: '75 mg twice daily',
        duration: '5 days for flu'
    },
    {
        medication: 'Atorvastatin',
        dosage: '10 mg once daily',
        duration: 'As prescribed for cholesterol'
    },
    {
        medication: 'Iron supplements',
        dosage: 'Iron 65 mg once daily',
        duration: 'Until blood levels are normal'
    },
    {
        medication: 'Ibuprofen',
        dosage: '400 mg as needed for pain',
        duration: 'As needed'
    },
    {
        medication: 'Eye drops',
        dosage: '1 drop in each eye twice daily',
        duration: 'Until symptoms improve'
    }
];

// Usage
prescriptions.forEach(data => addPrescription(data));
