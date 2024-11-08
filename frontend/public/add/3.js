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
        "patientId": { "$oid": "66f02940b1b144c0e6500073" },
        "medication": "Salbutamol Inhaler",
        "dosage": "1 puff as needed for wheezing",
        "instructions": "Use as needed for wheezing relief",
        "createdAt": "2024-11-08T20:16:22.001+00:00",
        "updatedAt": "2024-11-08T20:16:22.001+00:00"
    },
    {
        "patientId": { "$oid": "66f02940b1b144c0e6500073" },
        "medication": "Cetirizine",
        "dosage": "10 mg once daily",
        "instructions": "As needed for allergies",
        "createdAt": "2024-11-08T20:16:22.001+00:00",
        "updatedAt": "2024-11-08T20:16:22.001+00:00"
    },
    {
        "patientId": { "$oid": "66f02940b1b144c0e6500073" },
        "medication": "Amlodipine",
        "dosage": "5 mg once daily",
        "instructions": "Indefinitely for hypertension",
        "createdAt": "2024-11-08T20:16:22.001+00:00",
        "updatedAt": "2024-11-08T20:16:22.001+00:00"
    },
    {
        "patientId": { "$oid": "66f02940b1b144c0e6500073" },
        "medication": "Oseltamivir",
        "dosage": "75 mg twice daily",
        "instructions": "5 days for flu",
        "createdAt": "2024-11-08T20:16:22.001+00:00",
        "updatedAt": "2024-11-08T20:16:22.001+00:00"
    },
    {
        "patientId": { "$oid": "66f02940b1b144c0e6500073" },
        "medication": "Atorvastatin",
        "dosage": "10 mg once daily",
        "instructions": "As prescribed for cholesterol",
        "createdAt": "2024-11-08T20:16:22.001+00:00",
        "updatedAt": "2024-11-08T20:16:22.001+00:00"
    },
    {
        "patientId": { "$oid": "66f02940b1b144c0e6500073" },
        "medication": "Iron supplements",
        "dosage": "Iron 65 mg once daily",
        "instructions": "Until blood levels are normal",
        "createdAt": "2024-11-08T20:16:22.001+00:00",
        "updatedAt": "2024-11-08T20:16:22.001+00:00"
    },
    {
        "patientId": { "$oid": "66f02940b1b144c0e6500073" },
        "medication": "Ibuprofen",
        "dosage": "400 mg as needed for pain",
        "instructions": "As needed",
        "createdAt": "2024-11-08T20:16:22.001+00:00",
        "updatedAt": "2024-11-08T20:16:22.001+00:00"
    },
    {
        "patientId": { "$oid": "66f02940b1b144c0e6500073" },
        "medication": "Eye drops",
        "dosage": "1 drop in each eye twice daily",
        "instructions": "Until symptoms improve",
        "createdAt": "2024-11-08T20:16:22.001+00:00",
        "updatedAt": "2024-11-08T20:16:22.001+00:00"
    }
];

// Usage
prescriptions.forEach(data => addPrescription(data));
