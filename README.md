PCOS Predictor
A machine learning web app to predict PCOS (Polycystic Ovary Syndrome) based on health and hormonal parameters.
 🔗 Live Site: https://pcos-predict.onrender.com

 
### 🛠️ Tech Stack
- Frontend: React.js
- Backend: Flask (Python)
- ML Model: XGBoost (trained separately)
- Deployment: Render

**Steps Followed in Building the PCOS Prediction Project**

1.Problem Understanding
  Identified the real-world problem of PCOS risk prediction using clinical and hormonal data.
2.Data Collection & Preprocessing
  Collected dataset containing clinical (age, weight, height, BMI, cycle length) and hormonal (AMH, PRL, Vit D3, FSH, LH) parameters.
  Cleaned dataset by handling missing values, standardizing formats, and normalizing features.
  Exploratory Data Analysis (EDA)
  Checked correlations between features.
  Identified which features had the most impact on PCOS risk.
3.Visualized distributions of clinical and hormonal values.
4.Model Training & Evaluation
5.Trained multiple ML models:
  Logistic Regression
  Decision Tree
  Random Forest
  Support Vector Machine (SVM)
  K-Nearest Neighbors (KNN)
  XGBoost

6.Compared performance using accuracy, precision, recall, and F1-score.
  XGBoost gave the best results (91.2% accuracy).

7.Model Optimization & Ensemble Attempt
  Attempted stacking ensemble combining Random Forest, SVM, Logistic Regression with XGBoost as meta-classifier.
  Found marginal improvement  only, so finalized XGBoost for simplicity and reliability.

8.Model Saving
  Serialized trained XGBoost model into model.pkl using pickle for backend integration.

9.Backend Development (Flask)
  Created app.py Flask server.
  Built a /predict API endpoint to load model.pkl and return predictions in JSON format.
  Frontend Development (React.js)

10.Built an interactive multi-step form (PCOSForm.js) to collect user inputs.
   Integrated tooltips, progress bar, and result visualization (probability %, risk level, suggestions).
   Used fetch to connect frontend with Flask backend.

11.Integration & Testing
   Connected React frontend ↔ Flask backend ↔ ML model.
   Verified predictions locally with sample data to ensure correct workflow.

12.Deployment (Render)

Created a build folder using npm run build and moved it into backend.
Configured Render service with:



- ### 🚀 How to Run Locally
- 
1. Clone the repo:
2. Set the backend:
     cd pcos-backend
     pip install -r requirements.txt
     python app.py
3. Frontend:
     cd ../pcos-frontend
     npm install
     npm run build

 Model Training and Selection Process :
   1. Preprocessing
Handled missing values (if any)
Converted all input fields to numeric format
Normalized features using StandardScaler
Split the data: 80% for training, 20% for testing

   2. Model Comparison
   | Model                        | Accuracy    |
| ---------------------------- | ----------- |
| Logistic Regression          | 84.3%       |
| Decision Tree                | 85.6%       |
| Random Forest                | 88.1%       |
| Support Vector Machine (SVM) | 86.5%       |
| XGBoost                      | **91.2%** ✅ |
| K-Nearest Neighbors          | 82.7%       |




 
 
