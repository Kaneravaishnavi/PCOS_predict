
                           ** PCOS Predictor**
                           
A machine learning web app to predict PCOS (Polycystic Ovary Syndrome) based on health and hormonal parameters.
 🔗 Live Site: https://pcos-predict.onrender.com

 
### 🛠️ Tech Stack
-** Frontend: React.js
- Backend: Flask (Python)
- ML Model: XGBoost (trained separately)
- Deployment: Render**

**Steps Followed in Building the PCOS Prediction Project**
  ## 📌 Project Workflow  

1. **Problem Understanding**  
   - Identified the need for early prediction of PCOS using health + hormonal parameters.  

2. **Data Collection & Preprocessing**  
   - Dataset included: Age, Weight, Height, BMI, Cycle length, AMH, PRL, Vit D3, FSH, LH.  
   - Cleaned data: handled missing values, normalized features.  

3. **Exploratory Data Analysis (EDA)**  
   - Correlation heatmaps & feature impact analysis.  
   - Distribution visualization of clinical & hormonal values.  

4. **Model Training & Evaluation**  
   - Trained models:
  Logistic Regression
  Decision Tree
  Random Forest
  Support Vector Machine (SVM)
  K-Nearest Neighbors (KNN)
  XGBoost
   - Compared performance on accuracy, precision, recall, F1-score.  
   - **XGBoost achieved the best accuracy of 91.2%.** ✅  

5. **Model Optimization & Ensemble**  
   - Tried stacking (RF + SVM + LR + XGBoost meta-classifier).  
   - Marginal improvement → finalized XGBoost for simplicity.  

6. **Model Saving**  
   - Saved trained model as `model.pkl` using `pickle`.  

7. **Backend Development (Flask)**  
   - Built `app.py` with a `/predict` API endpoint.  
   - Loads `model.pkl` and returns JSON prediction.  

8. **Frontend Development (React.js)**  
   - Created interactive multi-step form (`PCOSForm.js`).  
   - Features: progress bar, tooltips, health tips, normal vs. user value comparison.  

9. **Integration & Testing**  
   - Connected **React ↔ Flask ↔ ML model**.  
   - Verified predictions with sample inputs locally.  

10. **Deployment (Render)**  
    - Built React frontend (`npm run build`) → moved `build/` into backend.  
    - Deployed Flask + React bundle on Render.  


## 📊 Model Performance Comparison  

| Model                        | Accuracy |
|------------------------------|----------|
| Logistic Regression          | 84.3%    |
| Decision Tree                | 85.6%    |
| Random Forest                | 88.1%    |
| Support Vector Machine (SVM) | 86.5%    |
| **XGBoost**                  | **91.2% ✅** |
| K-Nearest Neighbors (KNN)    | 82.7%    |

 ### 🚀 How to Run Locally 
1. Clone the repo:
2. Set the backend:
     cd pcos-backend
     pip install -r requirements.txt
     python app.py
3. Frontend:
     cd ../pcos-frontend
     npm install
     npm run build

 
 
 
