import React, { useEffect, useState,useRef  } from 'react';
import axios from 'axios';
import styles from './DashboardUser.module.css'; // Import CSS module
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const DashboardUser = ({ uid }) => {
  const [patient, setPatient] = useState(null);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isBMIModalOpen, setBMIModalOpen] = useState(false);
  const [isSugarModalOpen, setSugarModalOpen] = useState(false);
  const [isBpModalOpen, setBpModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const modalRef = useRef(); // Create a reference for the modal'
  
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/patients/${uid}`);
        setPatient(response.data);
        const health_response = await axios.get(`${process.env.REACT_APP_API_URL}/api/health/by-uid/${uid}`);
        if(health_response.data===null){
          navigate('/HealthPage');
        }
        setHealth(health_response.data);
      } catch (error) {
        setError('Error fetching patient data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [uid]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setBMIModalOpen(false); // Close the modal if clicked outside
        setSugarModalOpen(false);
        setBpModalOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const toggleBMIModal = () => {
    setBMIModalOpen(!isBMIModalOpen);
  };
  const toggleSugarModal = () => {
    setSugarModalOpen(!isSugarModalOpen);
  };

  const toggleBpModal = () => {
    setBpModalOpen(!isBpModalOpen);
  };

  if (!patient) {
    return <p>No patient data found.</p>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <h2>Dashboard (UID: {uid})</h2>
      <table className={styles.patientTable}>
        <tbody>
          <tr>
            <td><strong>Name:</strong></td>
            <td>{patient.name}</td>
          </tr>
          <tr>
            <td><strong>Age:</strong></td>
            <td>{patient.age}</td>
          </tr>
          <tr>
            <td><strong>Gender:</strong></td>
            <td>{patient.gender}</td>
          </tr>
          <tr>
            <td><strong>Address:</strong></td>
            <td>{patient.otherFields?.address || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{patient.otherFields?.email || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Phone:</strong></td>
            <td>{patient.otherFields?.phone || 'N/A'}</td>
          </tr>
          <tr>
            <td className={styles.tooltip} onClick={toggleBpModal}>
              <strong>Blood Pressure:</strong>
              <span className={styles.tooltiptext}>Click for more info about BP levels</span>
            </td>
            <td>{health.bp || 'N/A'}</td>
          </tr>

          <tr>
            <td className={styles.tooltip} onClick={toggleSugarModal}>
            <strong>Sugar:</strong>
              <span className={styles.tooltiptext}>Click for more info about Sugar levels</span>
            </td>
            <td>{health.sugar || 'N/A'}</td>
          </tr>

          <tr>
            <td><strong>Blood Group:</strong></td>
            <td>{health.bloodGroup || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Height:</strong></td>
            <td>{health.height || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Weight:</strong></td>
            <td>{health.weight || 'N/A'}</td>
          </tr>

          <tr>
            <td className={styles.tooltip} onClick={toggleBMIModal}>
              <strong>BMI:</strong>
              <span className={styles.tooltiptext}>Click for more info about BMI</span>
            </td>
            <td>{health.BMI || 'N/A'}</td>
          </tr>

          <tr>
            <td><strong>EyeSight:</strong></td>
            <td>{health.eyeSight || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Infections:</strong></td>
            <td>{health.infections || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Chronic Diseases:</strong></td>
            <td>{health.diseases || 'N/A'}</td>
          </tr>
        </tbody>
      </table>


    {/* BP  Modal */}
    {isBpModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent} ref={modalRef}> {/* Attach ref here */}
            
            <span className={styles.close} onClick={toggleBpModal}>&times;</span>
                          
              
              <div>
                  <h1>Understanding Blood Pressure</h1>

                  <p>Blood pressure (BP) is the force of blood pushing against the walls of the arteries as the heart pumps it around the body. It is a vital indicator of heart health and overall wellness.</p>

                  <h2>Normal Blood Pressure Levels</h2>
                  <p>Blood pressure is measured in millimeters of mercury (mm Hg) and is expressed as two numbers:</p>
                  <ul>
                      <li><strong>Systolic pressure:</strong> The top number, indicating the pressure in the arteries when the heart beats.</li>
                      <li><strong>Diastolic pressure:</strong> The bottom number, indicating the pressure in the arteries when the heart is at rest between beats.</li>
                  </ul>
                  <p>Normal blood pressure levels are generally defined as:</p>
                  <ul>
                      <li><strong>Normal:</strong> Less than 120/80 mm Hg</li>
                      <li><strong>Elevated:</strong> 120-129/ &lt; 80 mm Hg</li>
                      <li><strong>Hypertension Stage 1:</strong> 130-139/80-89 mm Hg</li>
                      <li><strong>Hypertension Stage 2:</strong> 140/90 mm Hg or higher</li>
                  </ul>

                  <h2>Causes of High Blood Pressure</h2>
                  <p>High blood pressure, or hypertension, can result from various factors, including:</p>
                  <ul>
                      <li>Obesity or overweight</li>
                      <li>Lack of physical activity</li>
                      <li>High salt intake</li>
                      <li>Excessive alcohol consumption</li>
                      <li>Chronic stress</li>
                      <li>Smoking</li>
                  </ul>

                  <h2>Symptoms of High Blood Pressure</h2>
                  <p>Hypertension is often referred to as the "silent killer" because it may not present noticeable symptoms. However, severe hypertension can lead to:</p>
                  <ul>
                      <li>Headaches</li>
                      <li>Dizziness</li>
                      <li>Nosebleeds</li>
                      <li>Shortness of breath</li>
                  </ul>

                  <h2>Complications of Chronic High Blood Pressure</h2>
                  <p>Chronic high blood pressure can lead to serious health complications, such as:</p>
                  <ul>
                      <li>Heart disease and heart attack</li>
                      <li>Stroke</li>
                      <li>Kidney damage</li>
                      <li>Vision loss</li>
                      <li>Metabolic syndrome</li>
                  </ul>

                  <h2>Managing Blood Pressure Levels</h2>
                  <p>Managing blood pressure is crucial for overall health and can be achieved through:</p>
                  <ul>
                      <li><strong>Diet:</strong> Following a heart-healthy diet, such as the DASH diet, low in salt and rich in fruits and vegetables.</li>
                      <li><strong>Exercise:</strong> Engaging in regular physical activity.</li>
                      <li><strong>Weight management:</strong> Maintaining a healthy weight.</li>
                      <li><strong>Medication:</strong> Taking prescribed antihypertensive medications as directed.</li>
                      <li><strong>Monitoring:</strong> Regularly checking blood pressure to ensure it remains within target ranges.</li>
                  </ul>

                  <h2>Conclusion</h2>
                  <p>Understanding and managing blood pressure levels is essential for maintaining heart health. Individuals should consult healthcare professionals for personalized advice and strategies to keep their blood pressure in a healthy range.</p>
            </div>

          </div>
        </div>
      )}


    {/* Sugar Modal */}
    {isSugarModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent} ref={modalRef}> {/* Attach ref here */}
            
            <span className={styles.close} onClick={toggleSugarModal}>&times;</span>
              
            <div>
                <h1>Understanding Blood Sugar Levels</h1>

                <p>Blood sugar, also known as blood glucose, refers to the amount of glucose present in the blood. Glucose is the primary source of energy for the body’s cells, and maintaining appropriate blood sugar levels is crucial for overall health.</p>

                <h2>Normal Blood Sugar Levels</h2>
                <p>Normal blood sugar levels can vary based on the time of day and when a person last ate. The following are general guidelines for blood sugar levels:</p>
                <ul>
                    <li><strong>Fasting (no food for 8 hours):</strong> 70 to 100 mg/dL</li>
                    <li><strong>Before meals:</strong> 70 to 130 mg/dL</li>
                    <li><strong>Two hours after meals:</strong> Less than 140 mg/dL</li>
                </ul>

                <h2>Causes of High Blood Sugar Levels</h2>
                <p>High blood sugar, or hyperglycemia, can occur due to various factors, including:</p>
                <ul>
                    <li>Insufficient insulin production or action</li>
                    <li>Excessive carbohydrate intake</li>
                    <li>Stress and illness</li>
                    <li>Inactivity or lack of physical exercise</li>
                </ul>

                <h2>Symptoms of High Blood Sugar</h2>
                <p>Common symptoms of high blood sugar may include:</p>
                <ul>
                    <li>Frequent urination</li>
                    <li>Increased thirst</li>
                    <li>Fatigue</li>
                    <li>Blurred vision</li>
                </ul>

                <h2>Complications of Chronic High Blood Sugar</h2>
                <p>Chronic high blood sugar levels can lead to serious health complications, including:</p>
                <ul>
                    <li>Heart disease and stroke</li>
                    <li>Nerve damage (neuropathy)</li>
                    <li>Kidney damage (nephropathy)</li>
                    <li>Vision problems and blindness</li>
                </ul>

                <h2>Managing Blood Sugar Levels</h2>
                <p>Managing blood sugar levels is crucial for individuals with diabetes and can be achieved through:</p>
                <ul>
                    <li><strong>Diet:</strong> Consuming a balanced diet with controlled carbohydrate intake.</li>
                    <li><strong>Exercise:</strong> Regular physical activity helps improve insulin sensitivity.</li>
                    <li><strong>Medication:</strong> Taking prescribed medications or insulin as needed.</li>
                    <li><strong>Monitoring:</strong> Regularly checking blood sugar levels to ensure they remain within target ranges.</li>
                </ul>

                <h2>Conclusion</h2>
                <p>Understanding and managing blood sugar levels is vital for overall health. Individuals should consult healthcare professionals for personalized advice and strategies to maintain healthy blood sugar levels.</p>
            </div>
          </div>
        </div>
      )}
 
      {/* BMI Modal */}
      {isBMIModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent} ref={modalRef}> {/* Attach ref here */}
            
            <span className={styles.close} onClick={toggleBMIModal}>&times;</span>
              <div>
                <h2>Understanding Body Mass Index (BMI)</h2>
                <p>Body Mass Index, commonly known as BMI, is a popular tool for assessing body fat in relation to a person's height and weight. This index is used to classify adults into categories that indicate potential health risks associated with their weight status. It is calculated by dividing a person’s weight in kilograms by their height in meters squared (kg/m²). While BMI is not a direct measurement of body fat, it serves as a reliable indicator for identifying health risks.</p>
  
                <h3>How to Calculate BMI</h3>
                <p>Calculating BMI is straightforward:</p>
                <ol>
                  <li><strong>Convert</strong> weight to kilograms and height to meters, or use standard units (pounds and inches).</li>
                  <li><strong>Formula</strong>: BMI = weight (kg) / height (m²).</li>
                  <li><strong>Interpret</strong> the result:
                    <ul>
                      <li><strong>Underweight</strong>: BMI 18.5</li>
                      <li><strong>Normal weight</strong>: BMI 18.5–24.9</li>
                      <li><strong>Overweight</strong>: BMI 25–29.9</li>
                      <li><strong>Obesity</strong>: BMI ≥ 30</li>
                    </ul>
                  </li>
                </ol>
                <p>Alternatively, online calculators are available for easy calculation by entering height in feet/inches and weight in pounds.</p>
  
                <h3>Health Risks by BMI Category</h3>
                <p>BMI classifications offer insights into potential health risks:</p>
                <ul>
                  <li><strong>Underweight (BMI  18.5)</strong>: Being underweight can signal malnutrition, compromised immune function, and an increased risk for osteoporosis.</li>
                  <li><strong>Normal Weight (BMI 18.5–24.9)</strong>: This range generally indicates a balanced weight with fewer health risks, although other lifestyle factors play a significant role.</li>
                  <li><strong>Overweight (BMI 25–29.9)</strong>: Being overweight is associated with an increased risk of heart disease, high blood pressure, and type 2 diabetes.</li>
                  <li><strong>Obesity (BMI ≥ 30)</strong>: Obesity significantly raises the risk of chronic conditions, including cardiovascular diseases, certain cancers, and metabolic disorders.</li>
                </ul>
  
                <h3>Health Consequences of an Unhealthy BMI</h3>
                <p>A BMI outside the normal range can impact health in various ways:</p>
                <ol>
                  <li><strong>Heart Disease</strong>: Being overweight or obese strains the heart, increasing blood pressure and cholesterol.</li>
                  <li><strong>Type 2 Diabetes</strong>: Excess weight can hinder the body's insulin function, leading to diabetes.</li>
                  <li><strong>Respiratory Issues</strong>: Increased weight contributes to breathing difficulties, including sleep apnea.</li>
                  <li><strong>Joint Pain</strong>: Higher weight levels add stress to joints, often resulting in chronic pain and arthritis.</li>
                  <li><strong>Mental Health</strong>: High BMI can be associated with depression, lower self-esteem, and anxiety.</li>
                </ol>
                <p>Being underweight can also lead to health complications, such as fatigue, weakened immunity, and increased susceptibility to infection.</p>
  
                <h3>Steps Toward Maintaining a Healthy BMI</h3>
                <p>The National Heart, Lung, and Blood Institute (NHLBI) recommends the following for achieving and maintaining a healthy BMI:</p>
                <ol>
                  <li><strong>Balanced Diet</strong>: A diet rich in whole foods, lean proteins, and vegetables can support weight management.</li>
                  <li><strong>Regular Physical Activity</strong>: Adults should aim for at least 150 minutes of moderate exercise each week.</li>
                  <li><strong>Monitor Health Metrics</strong>: Regularly track your health metrics, including blood pressure, cholesterol, and BMI, to catch any trends early.</li>
                  <li><strong>Consult Health Professionals</strong>: For personalized advice on weight management, consulting a healthcare provider or nutritionist is beneficial.</li>
                </ol>
  
                <h3>Limitations of BMI</h3>
                <p>While widely used, BMI has limitations:</p>
                <ul>
                  <li><strong>Does Not Differentiate Muscle Mass from Fat</strong>: Those with high muscle mass may have a higher BMI even with low body fat.</li>
                  <li><strong>Does Not Consider Body Composition</strong>: BMI doesn’t account for factors like gender, age, and ethnicity, which may affect health risk assessments.</li>
                  <li><strong>Other Health Indicators</strong>: Health professionals often use additional measures, such as waist-to-hip ratio or body fat percentage, for a comprehensive evaluation.</li>
                </ul>
  
                <h3>The Importance of BMI in Public Health</h3>
                <p>In public health, BMI is a valuable tool for understanding trends in weight and assessing population health risks. It allows healthcare providers and policymakers to address obesity and develop interventions that promote healthier lifestyles. For individuals, BMI should be part of a holistic health evaluation, and personalized health goals should take precedence over any single measurement.</p>
  
                <p>BMI is an effective general guideline but should be complemented by other health measures to assess overall wellness. To explore your BMI further or discuss personalized health recommendations, consulting a healthcare provider is always a good step.</p>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardUser;



// add following ....../......./.......///


// <div>

//     <h1>Understanding Blood Groups</h1>

//     <p>Blood groups are classifications based on the presence or absence of specific antigens on the surface of red blood cells. Blood groups are crucial in determining compatibility for blood transfusions, organ transplants, and maternal-fetal health.</p>

//     <h2>Main Blood Group Systems</h2>
//     <p>Two primary blood group systems are commonly used:</p>
//     <ul>
//         <li><strong>ABO System:</strong> Based on the presence or absence of antigens A and B on red blood cells.</li>
//         <li><strong>Rh System:</strong> Based on the presence or absence of the Rh factor, commonly referred to as the positive or negative symbol after the ABO group (e.g., A+, B-).</li>
//     </ul>

//     <h2>Types of Blood Groups</h2>
//     <p>The ABO system classifies blood groups into four main types:</p>
//     <ul>
//         <li><strong>Type A:</strong> Has the A antigen on red cells and anti-B antibodies in the plasma.</li>
//         <li><strong>Type B:</strong> Has the B antigen on red cells and anti-A antibodies in the plasma.</li>
//         <li><strong>Type AB:</strong> Has both A and B antigens on red cells and no anti-A or anti-B antibodies in the plasma. Known as the universal recipient.</li>
//         <li><strong>Type O:</strong> Has no A or B antigens on red cells and both anti-A and anti-B antibodies in the plasma. Known as the universal donor.</li>
//     </ul>

//     <h2>Rh Factor</h2>
//     <p>The Rh system further categorizes blood types as either Rh-positive (+) or Rh-negative (-):</p>
//     <ul>
//         <li><strong>Rh-positive:</strong> Presence of the Rh antigen on red blood cells.</li>
//         <li><strong>Rh-negative:</strong> Absence of the Rh antigen on red blood cells.</li>
//     </ul>
//     <p>For example, an individual with type A blood and the Rh antigen is designated as A+, while one without the Rh antigen is A-.</p>

//     <h2>Blood Group Compatibility</h2>
//     <p>Blood transfusions require careful matching to prevent serious reactions. Compatibility depends on both ABO and Rh factors:</p>
//     <ul>
//         <li><strong>Type O-</strong> is the universal donor for red cells.</li>
//         <li><strong>Type AB+</strong> is the universal recipient for red cells.</li>
//         <li>Plasma compatibility follows different rules, with AB being the universal plasma donor.</li>
//     </ul>

//     <h2>Importance of Blood Groups</h2>
//     <p>Understanding blood groups is essential in several medical contexts:</p>
//     <ul>
//         <li><strong>Blood Transfusions:</strong> Matching blood types prevents immune reactions that can lead to serious complications.</li>
//         <li><strong>Pregnancy:</strong> Rh incompatibility between mother and fetus can lead to hemolytic disease of the newborn (HDN).</li>
//         <li><strong>Organ Transplants:</strong> Matching blood groups is crucial to reduce the risk of transplant rejection.</li>
//     </ul>

//     <h2>Conclusion</h2>
//     <p>Blood groups play a vital role in medical procedures and individual health. Knowing your blood type can help in emergencies, and understanding compatibility is crucial for safe blood transfusions, organ donations, and pregnancy management.</p>

// </div>

