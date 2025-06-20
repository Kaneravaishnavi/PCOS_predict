from flask import Flask, request, jsonify,send_from_directory
from flask_cors import CORS
import numpy as np
import pickle
import os


# Load model
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

# Flask app
app = Flask(__name__, static_folder="build", static_url_path="/")
CORS(app)

# Serve React build files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json['input']
        input_array = np.array(data).reshape(1, -1)

        prediction = model.predict(input_array)[0]
        probability = model.predict_proba(input_array)[0][1]  # Probability of class 1 (PCOS Positive)

        return jsonify({
            'result': 'PCOS Positive' if prediction == 1 else 'PCOS Negative',
            'probability': round(probability , 2)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
    # app.run(debug=True)

