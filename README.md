PCOS Predictor
A machine learning web app to predict PCOS (Polycystic Ovary Syndrome) based on health and hormonal parameters.
 🔗 Live Site: https://pcos-predict.onrender.com

 
### 🛠️ Tech Stack
- Frontend: React.js
- Backend: Flask (Python)
- ML Model: XGBoost (trained separately)
- Deployment: Render

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




 
 
