import React, { useState } from 'react';
import './PCOSForm.css';
import { Tooltip } from 'react-tooltip';

const PCOSForm = () => {
  const fields = [
    { name: "Age", label: "Age" },
    { name: "Weight", label: "Weight (Kg)" },
    { name: "Height", label: "Height (Cm)" },
    { name: "BMI", label: "BMI" },
    { name: "Cycle_length", label: "Cycle Length" },
    { name: "AMH", label: "AMH (ng/mL)", tooltip: "Anti-Mullerian Hormone. Marker of ovarian reserve." },
    { name: "PRL", label: "PRL (ng/mL)", tooltip: "Prolactin Hormone. High values can affect ovulation." },
    { name: "Vit_D3", label: "Vit D3 (ng/mL)" },
    { name: "FSH", label: "FSH (mIU/mL)", tooltip: "Follicle Stimulating Hormone. Affects egg development." },
    { name: "LH", label: "LH (mIU/mL)", tooltip: "Luteinizing Hormone. Influences ovulation cycle." }
  ];

  const [formData, setFormData] = useState({
    Age: '', Weight: '', Height: '', BMI: '', Cycle_length: '',
    AMH: '', PRL: '', Vit_D3: '', FSH: '', LH: ''
  });
  const [step, setStep] = useState(0);
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');
  const totalSteps = fields.length;

  const normalRanges = {
    Age: [18, 35], BMI: [18.5, 24.9], Weight: [50, 70],
    Height: [150, 170], Cycle_length: [21, 35],
    AMH: [1.5, 4.0], PRL: [4.8, 23.3], Vit_D3: [20, 50],
    FSH: [3.5, 12.5], LH: [1.9, 12.5]
  };

  const suggestionsList = [
    "Maintain a healthy BMI through regular exercise.",
    "Track your menstrual cycle and note irregularities.",
    "Eat a balanced, low-glycemic diet.",
    "Reduce intake of processed sugars and carbohydrates.",
    "Ensure adequate Vitamin D intake.",
    "Consider yoga or meditation to reduce stress.",
    "Monitor your hormone levels regularly.",
    "Consult a gynecologist for detailed diagnosis.",
    "Include more fiber in your meals.",
    "Limit dairy and caffeine intake.",
    "Get 7-8 hours of sleep daily.",
    "Drink plenty of water to stay hydrated.",
    "Include Omega-3 rich foods in your diet.",
    "Avoid smoking and limit alcohol.",
    "Maintain a consistent sleep schedule.",
    "Engage in 30 minutes of physical activity daily.",
    "Avoid crash diets or extreme fasting.",
    "Include magnesium and zinc rich foods.",
    "Get your thyroid levels checked.",
    "Stay up-to-date on health screenings."
  ];

  const handleSample = () => {
    setFormData({
      Age: '28', Weight: '65', Height: '160', BMI: '25.4', Cycle_length: '30',
      AMH: '3.2', PRL: '15.1', Vit_D3: '32.0', FSH: '6.5', LH: '7.3'
    });
    setStep(0);
    setResult('');
    setMessage('');
  };

  const getSuggestions = () => {
    const shuffled = [...suggestionsList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNext = () => {
    if (step < fields.length - 1) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleReset = () => {
    setFormData({
      Age: '', Weight: '', Height: '', BMI: '', Cycle_length: '',
      AMH: '', PRL: '', Vit_D3: '', FSH: '', LH: ''
    });
    setStep(0);
    setResult('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputArray = fields.map(field => Number(formData[field.name]));

    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputArray })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Prediction failed');
      }

      const data = await response.json();
      const probability = data.probability;
      const risk = probability > 0.8 ? "High" : probability > 0.5 ? "Moderate" : "Low";

      const comparison = Object.keys(formData).map(key => {
        const val = parseFloat(formData[key]);
        const [low, high] = normalRanges[key] || [0, 100];
        return {
          name: key,
          value: val,
          range: `${low}-${high}`,
          outOfRange: val < low || val > high
        };
      });

      setResult({
        probability: (probability * 100).toFixed(2),
        diagnosis: data.result,
        risk,
        suggestions: getSuggestions(),
        comparison
      });

    } catch (error) {
      // console.log("Received data from backend:", data);
      setResult({ error: error.message || 'Backend Error' });
    }
  };

  const currentField = fields[step];
  const progressPercent = Math.round(((step + 1) / totalSteps) * 100);

  return (
    <div className="form-container">
      <h2>PCOS Prediction</h2>

      {/* Progress Bar */}
      <div style={{
        height: '10px',
        background: '#e0e0e0',
        borderRadius: '5px',
        marginBottom: '20px',
        overflow: 'hidden'
      }}>
        <div
          style={{
            width: `${progressPercent}%`,
            backgroundColor: '#4caf50',
            height: '100%',
            transition: 'width 0.3s'
          }}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <label className="bold-label">
          {currentField.label}
          {currentField.tooltip && (
            <span
              data-tooltip-id="info-tooltip"
              data-tooltip-content={currentField.tooltip}
              style={{ color: '#555', cursor: 'pointer' }}
            > ⓘ
            </span>
          )}
          <input
            name={currentField.name}
            value={formData[currentField.name] || ''}
            onChange={handleChange}
            required
          /><br />
        </label>

        <div className="button-group">
          {step > 0 && (
            <button type="button" onClick={handlePrevious}>Previous</button>
          )}
          {step < fields.length - 1 ? (
            <button type="button" onClick={handleNext}>Next</button>
          ) : (
            <button type="submit">Get Result</button>
          )}
          <button type="button" onClick={handleSample}>Get Sample Input</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>

      {/* Tooltip */}
      <Tooltip id="info-tooltip" place="top" />

      {result && (
        <div className="result-box separate-box">
          {result.error ? <p>{result.error}</p> : (
            <>
              <h3>Prediction: {result.diagnosis}</h3>
              <p>Probability: {result.probability}%</p>
              <p>Risk Level: <strong className={result.risk.toLowerCase()}>{result.risk}</strong></p>
              <h4>Suggested Tips:</h4>
              <ul>{result.suggestions.map((sug, idx) => <li key={idx}>{sug}</li>)}</ul>

              <h4>Parameter Comparison:</h4>
              <table>
                <thead><tr><th>Parameter</th><th>Your Value</th><th>Normal Range</th></tr></thead>
                <tbody>
                  {result.comparison.map((item, idx) => (
                    <tr key={idx} style={{ backgroundColor: item.outOfRange ? '#ffcccc' : '#ccffcc' }}>
                      <td>{item.name}</td>
                      <td>{item.value}</td>
                      <td>{item.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default PCOSForm;
