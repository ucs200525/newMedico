import axios from 'axios';

const addHealthData = async (uid, healthData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/health/by-uid`, {
            uid,
            ...healthData
        });
        console.log('Health data added successfully:', response.data);
    } catch (error) {
        console.error('Error adding health data:', error);
    }
};

// Example health data for each patient
const healthDataList = [
    {
        uid: 10001,
        eyeSight: 'Right: -1.75, Left: -0.50',
        height: '180 cm',
        weight: '75 kg',
        BMI: '23.15',
        bloodGroup: 'O+',
        sugar: 'Normal',
        bp: '120/80 mmHg',
        infections: 'Recent cold infection',
        diseases: 'Mild asthma, Allergies'
    },
    {
        uid: 10002,
        eyeSight: 'Right: -0.50, Left: -0.75',
        height: '165 cm',
        weight: '60 kg',
        BMI: '22.04',
        bloodGroup: 'A+',
        sugar: 'Normal',
        bp: '115/75 mmHg',
        infections: 'None',
        diseases: 'Seasonal allergies'
    },
    {
        uid: 10003,
        eyeSight: 'Right: -0.25, Left: -0.50',
        height: '175 cm',
        weight: '80 kg',
        BMI: '26.12',
        bloodGroup: 'B+',
        sugar: 'Normal',
        bp: '130/85 mmHg',
        infections: 'None',
        diseases: 'Hypertension'
    },
    {
        uid: 10004,
        eyeSight: 'Right: -1.00, Left: -1.50',
        height: '170 cm',
        weight: '55 kg',
        BMI: '19.03',
        bloodGroup: 'AB+',
        sugar: 'Normal',
        bp: '110/70 mmHg',
        infections: 'Recent flu',
        diseases: 'None'
    },
    {
        uid: 10005,
        eyeSight: 'Right: -0.75, Left: -0.25',
        height: '178 cm',
        weight: '68 kg',
        BMI: '21.50',
        bloodGroup: 'O-',
        sugar: 'Normal',
        bp: '125/80 mmHg',
        infections: 'None',
        diseases: 'Cholesterol'
    },
    {
        uid: 10006,
        eyeSight: 'Right: -1.25, Left: -1.00',
        height: '160 cm',
        weight: '50 kg',
        BMI: '19.53',
        bloodGroup: 'A-',
        sugar: 'Normal',
        bp: '118/76 mmHg',
        infections: 'None',
        diseases: 'Anemia'
    },
    {
        uid: 10007,
        eyeSight: 'Right: -0.75, Left: -0.50',
        height: '185 cm',
        weight: '90 kg',
        BMI: '26.33',
        bloodGroup: 'B-',
        sugar: 'Normal',
        bp: '128/82 mmHg',
        infections: 'None',
        diseases: 'None'
    },
    {
        uid: 10008,
        eyeSight: 'Right: -1.50, Left: -1.25',
        height: '167 cm',
        weight: '62 kg',
        BMI: '22.24',
        bloodGroup: 'AB-',
        sugar: 'Normal',
        bp: '120/80 mmHg',
        infections: 'None',
        diseases: 'None'
    }
];

// Usage
healthDataList.forEach(data => addHealthData(data.uid, data));
