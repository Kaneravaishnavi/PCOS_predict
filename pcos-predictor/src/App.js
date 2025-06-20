// // Step 1: Set up a new React app (in terminal)
// // npx create-react-app pcos-predictor
// // cd pcos-predictor
// // npm install axios react-router-dom

// // Step 2: Replace App.js with the following code

// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// const formSteps = [
//   { label: 'Age', key: 'Age', type: 'number' },
//   { label: 'Weight (Kg)', key: 'Weight', type: 'number' },
//   { label: 'Height (Cm)', key: 'Height', type: 'number' },
//   { label: 'BMI', key: 'BMI', type: 'number' },
//   { label: 'Cycle Length', key: 'Cycle_length', type: 'number' },
//   { label: 'AMH (ng/mL)', key: 'AMH', type: 'number' },
//   { label: 'PRL (ng/mL)', key: 'PRL', type: 'number' },
//   { label: 'Vit D3 (ng/mL)', key: 'Vit_D3', type: 'number' },
//   { label: 'FSH (mIU/mL)', key: 'FSH', type: 'number' },
//   { label: 'LH (mIU/mL)', key: 'LH', type: 'number' },
// ];

// function App() {
//   const [formData, setFormData] = useState({});
//   const [currentStep, setCurrentStep] = useState(0);
//   const [result, setResult] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
//   };

//   const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, formSteps.length - 1));
//   const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/predict', formData);
//       setResult(response.data.result);
//     } catch (err) {
//       console.error('Prediction error:', err);
//       setResult('Error occurred');
//     }
//   };

//   const step = formSteps[currentStep];

//   return (
//     <div className="container">
//       <h2>PCOS Prediction</h2>
//       <div className="form-step">
//         <label>{step.label}</label>
//         <input
//           type={step.type}
//           name={step.key}
//           value={formData[step.key] || ''}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="navigation">
//         <button onClick={prevStep} disabled={currentStep === 0}>Previous</button>
//         {currentStep < formSteps.length - 1 ? (
//           <button onClick={nextStep}>Next</button>
//         ) : (
//           <button onClick={handleSubmit}>Predict</button>
//         )}
//       </div>
//       {result && <div className="result">Result: <strong>{result}</strong></div>}
//     </div>
//   );
// }

// export default App;



import React from 'react';
import PCOSForm from './PCOSForm';

function App() {
  return (
    <div className="App">
      <PCOSForm />
    </div>
  );
}

export default App;

