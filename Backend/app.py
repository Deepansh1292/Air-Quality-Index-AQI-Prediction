from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import tensorflow as tf
from tensorflow import keras
from sklearn.preprocessing import StandardScaler
import os

app = Flask(__name__)
CORS(app)

# Load models
try:
    # Load Random Forest model and scaler
    rf_model = joblib.load('Saved Models/Random Forest Best Model/rf_bestest_model.pkl')
    rf_scaler = joblib.load('Saved Models/Random Forest Best Model/rf_bestest_scaler.pkl')
    
    # Load LSTM model with custom_objects to handle custom metrics
    custom_objects = {
        'mse': 'mse',  # Handle the custom metric function
        'mae': 'mae'
    }
    
    try:
        lstm_model = keras.models.load_model('Saved Models/best_lstm_aqi_model.h5', 
                                           custom_objects=custom_objects)
    except:
        # Fallback: load without custom objects
        lstm_model = keras.models.load_model('Saved Models/best_lstm_aqi_model.h5', 
                                           compile=False)
        # Recompile the model
        lstm_model.compile(optimizer='adam', loss='mse', metrics=['mae'])
    
    print("✅ All models loaded successfully!")
except Exception as e:
    print(f"❌ Error loading models: {e}")
    print("⚠️  Some models may not be available. Check the Saved Models directory.")

# Feature names in order
FEATURES = ['PM2.5', 'PM10', 'NO', 'NO2', 'NOx', 'NH3', 'CO', 'SO2', 'O3', 'Benzene', 'Toluene']

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "AQI Prediction API is running"})

@app.route('/api/predict', methods=['POST'])
def predict_aqi():
    try:
        data = request.get_json()
        model_type = data.get('model_type', 'random_forest')  # 'random_forest' or 'lstm'
        features = data.get('features', {})
        
        # Validate input
        if not features:
            return jsonify({"error": "No features provided"}), 400
        
        # Extract features in correct order
        feature_values = []
        for feature in FEATURES:
            if feature not in features:
                return jsonify({"error": f"Missing feature: {feature}"}), 400
            feature_values.append(float(features[feature]))
        
        # Convert to numpy array
        X = np.array([feature_values])
        
        if model_type == 'random_forest':
            # Scale features for Random Forest
            X_scaled = rf_scaler.transform(X)
            # Predict
            prediction = rf_model.predict(X_scaled)[0]
            # Convert numpy float to Python float for JSON serialization
            prediction = float(prediction)
            model_name = "Random Forest"
            
        elif model_type == 'lstm':
            # Check if LSTM model is available
            if 'lstm_model' in globals() and lstm_model is not None:
                # Scale features for LSTM
                X_scaled = rf_scaler.transform(X)  # Using same scaler for consistency
                # Reshape for LSTM (samples, timesteps, features)
                X_lstm = X_scaled.reshape((1, 1, X_scaled.shape[1]))
                # Predict
                prediction = lstm_model.predict(X_lstm)[0][0]
                # Convert numpy float32 to Python float for JSON serialization
                prediction = float(prediction)
                model_name = "LSTM Neural Network"
            else:
                return jsonify({"error": "LSTM model not available. Please use Random Forest model."}), 400
            
        else:
            return jsonify({"error": "Invalid model type. Use 'random_forest' or 'lstm'"}), 400
        
        # Determine AQI category
        aqi_category = get_aqi_category(prediction)
        
        return jsonify({
            "prediction": round(prediction, 2),
            "aqi_category": aqi_category,
            "model_used": model_name,
            "features_used": features
        })
        
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

@app.route('/api/models', methods=['GET'])
def get_models():
    return jsonify({
        "available_models": [
            {
                "id": "random_forest",
                "name": "Random Forest",
                "description": "Ensemble learning model with high interpretability",
                "performance": "R²: 0.93, MAE: 13.88"
            },
            {
                "id": "lstm",
                "name": "LSTM Neural Network", 
                "description": "Deep learning model for sequence prediction",
                "performance": "Tuned hyperparameters with cross-validation"
            }
        ]
    })

@app.route('/api/features', methods=['GET'])
def get_features():
    return jsonify({
        "features": [
            {"name": "PM2.5", "description": "Fine particulate matter (≤2.5 μm)", "unit": "μg/m³"},
            {"name": "PM10", "description": "Coarse particulate matter (≤10 μm)", "unit": "μg/m³"},
            {"name": "NO", "description": "Nitric oxide", "unit": "μg/m³"},
            {"name": "NO2", "description": "Nitrogen dioxide", "unit": "μg/m³"},
            {"name": "NOx", "description": "Nitrogen oxides", "unit": "μg/m³"},
            {"name": "NH3", "description": "Ammonia", "unit": "μg/m³"},
            {"name": "CO", "description": "Carbon monoxide", "unit": "mg/m³"},
            {"name": "SO2", "description": "Sulfur dioxide", "unit": "μg/m³"},
            {"name": "O3", "description": "Ozone", "unit": "μg/m³"},
            {"name": "Benzene", "description": "Benzene", "unit": "μg/m³"},
            {"name": "Toluene", "description": "Toluene", "unit": "μg/m³"}
        ]
    })

def get_aqi_category(aqi_value):
    """Determine AQI category based on value"""
    if aqi_value <= 50:
        return "Good"
    elif aqi_value <= 100:
        return "Satisfactory"
    elif aqi_value <= 200:
        return "Moderate"
    elif aqi_value <= 300:
        return "Poor"
    elif aqi_value <= 400:
        return "Very Poor"
    else:
        return "Severe"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 