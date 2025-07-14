# Air Quality Index Prediction Project

A comprehensive AI-powered air quality forecasting system that predicts Air Quality Index (AQI) using machine learning models. The project includes both a Python Flask backend API and a React frontend with a modern, responsive UI.

## 🚀 Features

- **Model Comparison**: Both Random Forest and LSTM Neural Network were tested; Random Forest is used in production for its superior R² score.
- **Real-time Prediction**: Get instant AQI predictions based on pollutant parameters
- **Modern UI**: Beautiful, responsive design with glass morphism effects
- **Comprehensive Analysis**: Detailed AQI categorization and health implications
- **Cross-validation**: Robust model validation with multiple folds
- **Production Ready**: We tested both LSTM and Random Forest models, and selected Random Forest (R²: 0.96) for the final product due to its superior performance.

## 📊 Model Performance

| Model | MAE | RMSE | R² Score | Description |
|-------|-----|------|----------|-------------|
| Random Forest | 10.91 | 19.12 | 0.96 | Ensemble learning with high interpretability (Used in production) |
| LSTM Neural Network | 13.36 | 20.76 | 0.95 | Deep learning with sequence prediction (fine-tuned, for comparison) |
*Note: Only the Random Forest model is used in the deployed API due to its superior R² score. LSTM results are shown for comparison.*

## 🏗️ Project Structure

```
Air Quality Index Prediction Project/
├── Backend/
│   ├── app.py                 # Flask API server
│   ├── requirements.txt       # Python dependencies
│   └── Saved Models/
│       ├── rf_cv_model.pkl   # Random Forest model
│       ├── rf_cv_scaler.pkl  # Feature scaler
│       └── best_lstm_aqi_model.h5 # LSTM model
├── Frontend/
│   ├── public/
│   │   └── index.html        # Main HTML file
│   ├── src/
│   │   ├── App.js           # Main React component
│   │   ├── App.css          # Component styles
│   │   ├── index.js         # React entry point
│   │   └── index.css        # Global styles
│   └── package.json         # Node.js dependencies
├── Datasets/
│   └── balanced_dataset.csv  # Training dataset
└── README.md                # This file
```

## 🛠️ Installation & Setup

### Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. **Navigate to Backend directory:**
   ```bash
   cd Backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the Flask server:**
   ```bash
   python app.py
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to Frontend directory:**
   ```bash
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## 🎯 Usage

### API Endpoints

- `GET /api/health` - Health check
- `GET /api/models` - Get available models
- `GET /api/features` - Get feature information
- `POST /api/predict` - Make AQI prediction

### Prediction Request Format

```json
{
  "model_type": "random_forest",  // Only "random_forest" is supported in production. "lstm" is for research/comparison only.
  "features": {
    "PM2.5": 45.2,
    "PM10": 103.22,
    "NO": 3.47,
    "NO2": 27.0,
    "NOx": 18.04,
    "NH3": 28.02,
    "CO": 3.89,
    "SO2": 1.94,
    "O3": 52.96,
    "Benzene": 21.33,
    "Toluene": 196.72
  }
}
```

### Response Format

```json
{
  "prediction": 91.0,
  "aqi_category": "Satisfactory",
  "model_used": "Random Forest",  // Only Random Forest is used in production
  "features_used": { ... }
}
```

## 📈 AQI Categories

| AQI Range | Category | Health Implications |
|-----------|----------|-------------------|
| 201-300 | Poor | Breathing discomfort for most people |
| 301-400 | Very Poor | Respiratory illness on prolonged exposure |
| 401+ | Severe | Health alert for everyone |
| 101-200 | Moderate | Breathing discomfort for sensitive groups |
| 51-100 | Satisfactory | Minor breathing discomfort |
| 0-50 | Good | Minimal health impact |

## 🔧 Features

### Input Parameters

- **PM2.5**: Fine particulate matter (≤2.5 μm) - μg/m³
- **PM10**: Coarse particulate matter (≤10 μm) - μg/m³
- **NO**: Nitric oxide - μg/m³
- **NO2**: Nitrogen dioxide - μg/m³
- **NOx**: Nitrogen oxides - μg/m³
- **NH3**: Ammonia - μg/m³
- **CO**: Carbon monoxide - mg/m³
- **SO2**: Sulfur dioxide - μg/m³
- **O3**: Ozone - μg/m³
- **Benzene**: Benzene - μg/m³
- **Toluene**: Toluene - μg/m³

### Model Comparison

**Random Forest:**
- ✅ High interpretability
- ✅ Robust performance
- ✅ Feature importance analysis
- ❌ Larger file size (63MB)

**LSTM Neural Network:**
- ✅ Compact model (257KB)
- ✅ Deep learning capabilities
- ✅ Sequence prediction
- ❌ Black box nature

*Random Forest is used in production due to its higher R² and interpretability. LSTM is included for research and comparison purposes.*

## 🎨 UI Features

- **Glass Morphism Design**: Modern, translucent UI elements
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion powered transitions
- **Real-time Feedback**: Loading states and error handling
- **Color-coded Results**: AQI categories with appropriate colors
- **Model Selection**: Easy switching between models
- **Parameter Information**: Detailed help for each input field

## 🚀 Deployment

### Backend Deployment

The Flask app can be deployed to:
- Heroku
- AWS Elastic Beanstalk
- Google Cloud Platform
- DigitalOcean App Platform

### Frontend Deployment

The React app can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using React, Flask, and Machine Learning** 

## 🖼️ Frontend UI Screenshots

Below are screenshots of the modern, glass-morphism inspired UI:

<p align="center">
  <img src="./Frontend/UI Images/Screenshot 2025-07-14 091332.png" alt="App Home Page" width="600"/>
  <br/><b>Home Page</b>
</p>
<p align="center">
  <img src="./Frontend/UI Images/Screenshot 2025-07-14 091354.png" alt="City Selection" width="600"/>
  <br/><b>City Selection Screen</b>
</p>
<p align="center">
  <img src="./Frontend/UI Images/Screenshot 2025-07-14 091420.png" alt="Input Form" width="600"/>
  <br/><b>Input Form for AQI Prediction</b>
</p>
<p align="center">
  <img src="./Frontend/UI Images/Screenshot 2025-07-14 091438.png" alt="Prediction Result" width="600"/>
  <br/><b>Prediction Result Display</b>
</p>
<p align="center">
  <img src="./Frontend/UI Images/Screenshot 2025-07-14 091458.png" alt="Detailed Analysis" width="600"/>
  <br/><b>Detailed AQI Analysis</b>
</p>
<p align="center">
  <img src="./Frontend/UI Images/Screenshot 2025-07-14 091527.png" alt="Model Comparison" width="600"/>
  <br/><b>Model Comparison View</b>
</p>
<p align="center">
  <img src="./Frontend/UI Images/Screenshot 2025-07-14 091539.png" alt="Responsive Layout" width="600"/>
  <br/><b>Responsive Layout on Different Devices</b>
</p> 