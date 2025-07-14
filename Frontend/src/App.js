import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Tooltip,
  InputAdornment,
  IconButton,
  useMediaQuery,
  Switch,
  CircularProgress,
  Popover
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import CloudIcon from '@mui/icons-material/Cloud';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import OpacityIcon from '@mui/icons-material/Opacity';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NatureIcon from '@mui/icons-material/Nature';
import { styled, createTheme, ThemeProvider, keyframes } from '@mui/material/styles';
import '@fontsource/poppins';

const pollutantInfo = {
  'PM2.5': { icon: <BlurOnIcon color="primary" />, desc: 'Fine inhalable particles ≤2.5μm' },
  'PM10': { icon: <BlurOnIcon color="secondary" />, desc: 'Inhalable particles ≤10μm' },
  'NO': { icon: <CloudIcon color="info" />, desc: 'Nitric oxide' },
  'NO2': { icon: <CloudIcon color="warning" />, desc: 'Nitrogen dioxide' },
  'NOx': { icon: <CloudIcon color="error" />, desc: 'Nitrogen oxides' },
  'NH3': { icon: <NatureIcon color="success" />, desc: 'Ammonia' },
  'CO': { icon: <LocalFireDepartmentIcon color="error" />, desc: 'Carbon monoxide' },
  'SO2': { icon: <WbSunnyIcon color="primary" />, desc: 'Sulfur dioxide' },
  'O3': { icon: <WbSunnyIcon color="warning" />, desc: 'Ozone' },
  'Benzene': { icon: <OpacityIcon color="secondary" />, desc: 'Benzene' },
  'Toluene': { icon: <OpacityIcon color="info" />, desc: 'Toluene' }
};

const pollutants = [
  'PM2.5', 'PM10', 'NO', 'NO2',
  'NOx', 'NH3', 'CO', 'SO2',
  'O3', 'Benzene', 'Toluene'
];

const aqiCategories = [
  { label: 'Good', color: '#4CAF50', desc: 'Air quality is considered satisfactory.' },
  { label: 'Satisfactory', color: '#8BC34A', desc: 'Air quality is acceptable.' },
  { label: 'Moderate', color: '#FFEB3B', desc: 'Sensitive groups may experience effects.' },
  { label: 'Poor', color: '#FF9800', desc: 'Everyone may begin to experience effects.' },
  { label: 'Very Poor', color: '#F44336', desc: 'Health warnings of emergency conditions.' },
  { label: 'Severe', color: '#7E0023', desc: 'Health alert: everyone may experience effects.' }
];

const aqiCategoryInfo = {
  'Good': {
    color: '#4CAF50',
    emoji: '🟢',
    status: 'Good – Air quality is excellent! 🌱',
    tips: [
      { icon: '✅', text: 'Open windows for fresh air' },
      { icon: '🧘‍♂️', text: 'Enjoy outdoor activities' },
      { icon: '🌳', text: 'Visit a park or garden' }
    ]
  },
  'Satisfactory': {
    color: '#8BC34A',
    emoji: '🟢',
    status: 'Satisfactory – Air quality is acceptable! 🌿',
    tips: [
      { icon: '✅', text: 'Open windows for fresh air' },
      { icon: '🧘‍♂️', text: 'Enjoy a walk outside' },
      { icon: '📵', text: 'Limit burning incense/smoking' }
    ]
  },
  'Moderate': {
    color: '#FFEB3B',
    emoji: '🟡',
    status: 'Moderate – Sensitive groups take care! 🌤️',
    tips: [
      { icon: '😷', text: 'Limit outdoor activity if sensitive' },
      { icon: '🏠', text: 'Keep indoor air clean' },
      { icon: '💧', text: 'Stay hydrated' }
    ]
  },
  'Poor': {
    color: '#FF9800',
    emoji: '🟠',
    status: 'Poor – Air quality is unhealthy! 🚧',
    tips: [
      { icon: '😷', text: 'Wear a mask outdoors' },
      { icon: '🚪', text: 'Keep windows closed' },
      { icon: '🏃‍♂️', text: 'Avoid strenuous activity' }
    ]
  },
  'Very Poor': {
    color: '#F44336',
    emoji: '🔴',
    status: 'Very Poor – Health warnings! ⚠️',
    tips: [
      { icon: '🚫', text: 'Avoid outdoor activity' },
      { icon: '🏠', text: 'Stay indoors' },
      { icon: '💊', text: 'Follow medical advice' }
    ]
  },
  'Severe': {
    color: '#7E0023',
    emoji: '🛑',
    status: 'Severe – Emergency conditions! 🚨',
    tips: [
      { icon: '🚫', text: 'Do not go outside' },
      { icon: '🏠', text: 'Seal windows and doors' },
      { icon: '📞', text: 'Seek medical help if needed' }
    ]
  }
};

const glassBg = 'rgba(255,255,255,0.75)';
const glassShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.10)';
const glassBorder = '1px solid rgba(255,255,255,0.18)';
const neumorphShadow = '0 4px 24px 0 rgba(76,175,80,0.10)';
const neumorphShadowHover = '0 8px 32px 0 rgba(56,249,215,0.18)';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
`;

const bounce = keyframes`
  0% { transform: scale(1); }
  30% { transform: scale(1.08); }
  60% { transform: scale(0.96); }
  100% { transform: scale(1); }
`;

const GradientText = styled('span')({
  background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 800,
  letterSpacing: 1,
});

const AppContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  fontFamily: "'Poppins', sans-serif",
  background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
}));

const AnimatedBg = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 0,
  background: 'radial-gradient(circle at 60% 40%, #e0eafc 60%, #cfdef3 100%)',
  pointerEvents: 'none',
  animation: `${fadeIn} 1.2s cubic-bezier(0.4,0,0.2,1)`
});

const GlassCard = styled(Card)(({ theme }) => ({
  borderRadius: '2rem',
  background: glassBg,
  boxShadow: glassShadow,
  border: glassBorder,
  backdropFilter: 'blur(12px)',
  marginBottom: 32,
  animation: `${fadeIn} 1.2s cubic-bezier(0.4,0,0.2,1)`
}));

const NeumorphInputCard = styled(Card)(({ theme }) => ({
  borderRadius: '2rem',
  background: glassBg,
  boxShadow: neumorphShadow,
  border: glassBorder,
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
  transition: 'box-shadow 0.2s, border 0.2s',
  '&:hover': {
    boxShadow: neumorphShadowHover,
    border: '1.5px solid #38f9d7',
  },
  animation: `${fadeIn} 1.2s cubic-bezier(0.4,0,0.2,1)`
}));

const StyledTextField = styled(TextField)({
  background: '#fff',
  borderRadius: '1rem',
  fontSize: 18,
  boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)',
  '& .MuiOutlinedInput-root': {
    borderRadius: '1rem',
    fontSize: 18,
    '& fieldset': {
      borderColor: '#e0eafc',
    },
    '&:hover fieldset': {
      borderColor: '#38f9d7',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#43e97b',
      boxShadow: '0 0 0 2px #38f9d733',
    },
  },
});

const StyledDropdown = styled(TextField)({
  minWidth: 320,
  background: glassBg,
  borderRadius: '1rem',
  boxShadow: glassShadow,
  '& .MuiOutlinedInput-root': {
    borderRadius: '1rem',
    fontWeight: 500,
    fontSize: 17,
    '& fieldset': {
      borderColor: '#e0eafc',
    },
    '&:hover fieldset': {
      borderColor: '#38f9d7',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#43e97b',
      boxShadow: '0 0 0 2px #38f9d733',
    },
  },
});

const PredictButton = styled(Button)({
  borderRadius: '2rem',
  fontWeight: 700,
  fontSize: 20,
  minWidth: 180,
  padding: '0.8rem 2.5rem',
  background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
  color: '#fff',
  boxShadow: '0 4px 24px 0 rgba(56,249,215,0.13)',
  transition: 'box-shadow 0.2s, background 0.2s',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    background: 'linear-gradient(90deg, #38f9d7 0%, #43e97b 100%)',
    boxShadow: '0 8px 32px 0 rgba(56,249,215,0.18)',
    filter: 'brightness(1.05)',
  },
});

const PillLegend = styled(Box)({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  gap: 16,
  marginTop: 32,
  marginBottom: 8,
});

const Pill = styled(Box)(({ color }) => ({
  width: 60,
  height: 20,
  borderRadius: 16,
  background: color,
  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
  color: '#fff',
  fontSize: 15,
  marginBottom: 4,
  position: 'relative',
  zIndex: 1,
  border: '2px solid #fff',
  textShadow: '0 1px 4px rgba(0,0,0,0.08)',
}));

const theme = createTheme({
  palette: {
    primary: { main: '#43e97b' },
    secondary: { main: '#38f9d7' }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif"
  }
});

const API_URL = 'http://localhost:5000/api';

function InfoIconWithPopover({ feature, desc, emoji }) {
  const [open, setOpen] = React.useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;
  const tooltipRef = React.useRef();
  const iconRef = React.useRef();
  const [adjustClass, setAdjustClass] = React.useState('');
  const [placement, setPlacement] = React.useState('top'); // 'top' or 'bottom'

  // For mobile: open on click, close on click away
  const handleClick = (e) => {
    if (isMobile) setOpen((prev) => !prev);
  };

  React.useEffect(() => {
    if (open && tooltipRef.current && iconRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const iconRect = iconRef.current.getBoundingClientRect();
      // Decide vertical placement
      const spaceAbove = iconRect.top;
      const spaceBelow = window.innerHeight - iconRect.bottom;
      if (spaceAbove > tooltipRect.height + 16) {
        setPlacement('top');
      } else if (spaceBelow > tooltipRect.height + 16) {
        setPlacement('bottom');
      } else if (spaceAbove > spaceBelow) {
        setPlacement('top');
      } else {
        setPlacement('bottom');
      }
      // Horizontal adjustment
      if (tooltipRect.right > window.innerWidth - 8) {
        setAdjustClass('adjust-left');
      } else if (tooltipRect.left < 8) {
        setAdjustClass('adjust-right');
      } else {
        setAdjustClass('');
      }
    }
  }, [open]);

  return (
    <span
      style={{
        display: 'inline-block',
        position: 'relative',
        marginLeft: 8,
        zIndex: 100,
      }}
      onMouseEnter={() => !isMobile && setOpen(true)}
      onMouseLeave={() => !isMobile && setOpen(false)}
      onFocus={() => !isMobile && setOpen(true)}
      onBlur={() => !isMobile && setOpen(false)}
      tabIndex={0}
    >
      <button
        ref={iconRef}
        aria-label={`Info about ${feature}`}
        onClick={isMobile ? handleClick : undefined}
        style={{
          border: 'none',
          background: 'none',
          padding: 0,
          margin: 0,
          cursor: 'pointer',
          outline: 'none',
          display: 'flex',
          alignItems: 'center',
        }}
        tabIndex={-1}
      >
        <span
          style={{
            background: '#e0f2fe',
            color: '#2563eb',
            borderRadius: '50%',
            padding: 4,
            boxShadow: '0 2px 8px 0 rgba(37,99,235,0.10)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 28,
            minHeight: 28,
          }}
        >
          <InfoOutlinedIcon fontSize="small" />
        </span>
      </button>
      {open && (
        <div
          ref={tooltipRef}
          className={`aqi-tooltip-content ${adjustClass}`}
          style={{
            position: 'absolute',
            left: '50%',
            minWidth: 220,
            maxWidth: 280,
            background: 'rgba(255,255,255,0.85)',
            borderRadius: 12,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
            border: '1.5px solid #e0eafc',
            padding: 16,
            color: '#222',
            fontSize: 16,
            zIndex: 9999,
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.25s',
            pointerEvents: 'auto',
            transform: adjustClass ? 'none' : 'translateX(-50%)',
            right: adjustClass === 'adjust-left' ? 0 : undefined,
            left: adjustClass === 'adjust-right' ? 0 : '50%',
            bottom: placement === 'top' ? 'calc(100% + 12px)' : undefined,
            top: placement === 'bottom' ? 'calc(100% + 12px)' : undefined,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, fontSize: 22 }}>
            <span style={{ marginRight: 8 }}>{emoji || 'ℹ️'}</span>
            <strong style={{ fontSize: 17 }}>{feature}:</strong>
          </div>
          <div style={{ fontSize: 15, color: '#444' }}>
            {desc}
            <br />
            {feature === 'PM2.5' && 'Can penetrate lungs and cause respiratory issues.'}
            {feature === 'NO2' && 'Can irritate airways and worsen asthma.'}
            {feature === 'CO' && 'High levels can reduce oxygen delivery in the body.'}
          </div>
        </div>
      )}
    </span>
  );
}

export default function App() {
  const [features, setFeatures] = useState(
    Object.fromEntries(pollutants.map(p => [p, '0']))
  );
  const [autofillSamples, setAutofillSamples] = useState([]);
  const [autofillLoading, setAutofillLoading] = useState(true);
  const [selectedSample, setSelectedSample] = useState('');
  const [showActualValue, setShowActualValue] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery('(max-width:900px)');
  const [showResultAnim, setShowResultAnim] = useState(false);

  useEffect(() => {
    async function fetchSamples() {
      setAutofillLoading(true);
      try {
        const res = await fetch('/oversampled_cities.csv');
        const text = await res.text();
        const lines = text.split(/\r?\n/).filter(Boolean);
        const header = lines[0].split(',');
        const rows = lines.slice(1).map(line => {
          const values = line.split(',');
          const obj = {};
          header.forEach((h, i) => {
            obj[h.trim()] = values[i]?.trim();
          });
          return obj;
        });
        // Select one random sample per city
        const cityMap = {};
        rows.forEach(row => {
          const city = row.City;
          if (city && !cityMap[city]) {
            cityMap[city] = [];
          }
          if (city) {
            cityMap[city].push(row);
          }
        });
        const samples = Object.keys(cityMap).map(city => {
          const cityRows = cityMap[city];
          return cityRows[Math.floor(Math.random() * cityRows.length)];
        });
        setAutofillSamples(samples);
      } catch (e) {
        setAutofillSamples([]);
      }
      setAutofillLoading(false);
    }
    fetchSamples();
  }, []);

  useEffect(() => {
    if (prediction) {
      setShowResultAnim(true);
      const t = setTimeout(() => setShowResultAnim(false), 900);
      return () => clearTimeout(t);
    }
  }, [prediction]);

  const handleFeatureChange = (feature, value) => {
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setFeatures(prev => ({ ...prev, [feature]: value }));
    }
  };

  const handleAutofill = (event) => {
    const idx = event.target.value;
    setSelectedSample(idx);
    if (idx !== '') setFeatures({ ...autofillSamples[idx] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);
    try {
      const healthCheck = await fetch(`${API_URL}/health`);
      if (!healthCheck.ok) {
        throw new Error('Backend server is not responding');
      }
      const parsedFeatures = {};
      Object.keys(features).forEach(key => {
        parsedFeatures[key] = parseFloat(features[key]) || 0;
      });
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ features: parsedFeatures }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Prediction failed');
      }
      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(err.message || 'Failed to connect to the prediction server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Add a mapping for pollutant emojis
  const pollutantEmojis = {
    'PM2.5': '🌫️',
    'PM10': '🌫️',
    'NO': '💨',
    'NO2': '💨',
    'NOx': '💨',
    'NH3': '',
    'CO': '🔥',
    'SO2': '🌋',
    'O3': '🌀',
    'Benzene': '🧴',
    'Toluene': '🧴'
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer sx={{ pt: 2, mt: 0 }}>
        <AnimatedBg />
        {/* Enhance heading style and shift content upward */}
        <Box sx={{
          textAlign: 'center',
          py: 0,
          pt: 0,
          mt: 0,
          mb: 1,
          position: 'relative',
          zIndex: 2,
        }}>
          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            fontWeight={900}
            sx={{
              mb: 5,
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontFamily: 'Poppins, Inter, Sora, sans-serif',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
              background: 'linear-gradient(90deg, #14b8a6 0%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 8px rgba(20,184,166,0.10), 0 1px 2px rgba(0,0,0,0.08)',
              lineHeight: 1.1,
            }}
          >
            Air Quality Index Predictor
          </Typography>
          <Typography variant="subtitle1" color="#555" sx={{ fontWeight: 400, opacity: 0.85, mb: 1, fontSize: { xs: 16, sm: 18 } }}>
            Enter pollutant levels to predict AQI
          </Typography>
        </Box>
        <GlassCard sx={{ width: '90vw', maxWidth: 1600, mx: 'auto', zIndex: 2, px: { xs: 2, sm: 4, md: 6 }, py: { xs: 2, sm: 3 }, mt: 0, mb: 0 }}>
          <CardContent>
            {/* Enhanced Autofill Section */}
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  textAlign: 'center', 
                  mb: 2, 
                  fontWeight: 600,
                  color: '#2c3e50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1
                }}
              >
                🚀 Quick Start with Sample Data
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <StyledDropdown
                  select
                  label="Choose a city sample"
                  value={selectedSample || ''}
                  onChange={e => {
                    const idx = e.target.value;
                    setSelectedSample(idx);
                    if (idx !== '') {
                      const sample = autofillSamples[idx];
                      setFeatures({
                        'PM2.5': sample['PM2.5'],
                        'PM10': sample['PM10'],
                        'NO': sample['NO'],
                        'NO2': sample['NO2'],
                        'NOx': sample['NOx'],
                        'NH3': sample['NH3'],
                        'CO': sample['CO'],
                        'SO2': sample['SO2'],
                        'O3': sample['O3'],
                        'Benzene': sample['Benzene'],
                        'Toluene': sample['Toluene'],
                      });
                    }
                  }}
                  disabled={autofillLoading || autofillSamples.length === 0}
                  helperText={autofillLoading ? 'Loading city samples...' : 'Select a city to autofill pollutant data'}
                  sx={{ 
                    minWidth: { xs: '100%', sm: 300 },
                    maxWidth: { xs: '100%', sm: 400 },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '1rem',
                      background: '#fff',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                      }
                    }
                  }}
                >
                  <MenuItem value="">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>🏙️</span>
                      <span>Select a city...</span>
                    </Box>
                  </MenuItem>
                  {autofillSamples.map((sample, idx) => (
                    <MenuItem key={idx} value={idx} sx={{ py: 1.5 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        width: '100%',
                        gap: 1
                      }}>
                        <span>🏙️</span>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {sample.City || `City ${idx+1}`}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </StyledDropdown>
                
                {selectedSample !== null && autofillSamples[selectedSample] && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSelectedSample(null);
                      setFeatures({
                        'PM2.5': '',
                        'PM10': '',
                        'NO': '',
                        'NO2': '',
                        'NOx': '',
                        'NH3': '',
                        'CO': '',
                        'SO2': '',
                        'O3': '',
                        'Benzene': '',
                        'Toluene': '',
                      });
                    }}
                    sx={{
                      borderRadius: '1rem',
                      borderColor: '#e74c3c',
                      color: '#e74c3c',
                      '&:hover': {
                        borderColor: '#c0392b',
                        backgroundColor: 'rgba(231, 76, 60, 0.04)',
                      },
                      minWidth: { xs: '100%', sm: 'auto' }
                    }}
                  >
                    🗑️ Clear Data
                  </Button>
                )}
              </Box>
              
              {selectedSample !== null && autofillSamples[selectedSample] && (
                <Box sx={{ 
                  mt: 2, 
                  p: 2, 
                  borderRadius: '1rem',
                  background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(56, 249, 215, 0.1) 100%)',
                  border: '1px solid rgba(76, 175, 80, 0.2)',
                  textAlign: 'center'
                }}>
                  <Typography variant="body2" sx={{ color: '#2c3e50', fontWeight: 500 }}>
                    ✅ Sample data loaded from <strong>{autofillSamples[selectedSample].City}</strong>
                  </Typography>
                </Box>
              )}
            </Box>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    xl: 'repeat(4, 1fr)'
                  },
                  gap: { xs: 2, sm: 3, md: 4, lg: 6 },
                  rowGap: { xs: 2, sm: 3, md: 4, lg: 6 },
                  mb: 3
                }}
              >
                {pollutants.map((feature) => (
                  <StyledTextField
                    key={feature}
                    label={feature}
                    aria-label={feature}
                    type="text"
                    value={features[feature]}
                    onChange={e => handleFeatureChange(feature, e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {pollutantInfo[feature]?.icon}
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InfoIconWithPopover
                          feature={feature}
                          desc={pollutantInfo[feature]?.desc || ''}
                          emoji={pollutantEmojis[feature] || 'ℹ️'}
                        />
                      ),
                      inputProps: { min: 0 },
                      style: { fontSize: 18, padding: '10px 0' }
                    }}
                    variant="outlined"
                    size="small"
                    sx={{ fontSize: 18, background: '#fff', borderRadius: 2, boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)', width: '100%' }}
                  />
                ))}
              </Box>
              <Box mt={2} display="flex" justifyContent="center">
                <PredictButton
                  type="submit"
                  disabled={loading}
                  sx={{
                    animation: prediction && showResultAnim ? `${bounce} 0.7s` : 'none',
                    width: { xs: '100%', sm: 200, md: '20%' },
                    maxWidth: 320
                  }}
                >
                  {loading ? <CircularProgress size={28} sx={{ color: '#fff' }} /> : 'PREDICT AQI'}
                </PredictButton>
              </Box>
            </form>
            <PillLegend>
              {aqiCategories.map(cat => (
                <Box key={cat.label} display="flex" flexDirection="column" alignItems="center" gap={0}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#333', mb: 0.5 }}>{cat.label}</Typography>
                  <Tooltip title={cat.desc} arrow>
                    <Pill color={cat.color}>{' '}</Pill>
                  </Tooltip>
                </Box>
              ))}
            </PillLegend>
            {error && (
              <Typography color="error" mt={2}>{error}</Typography>
            )}
            {prediction && (
              <Box mt={5} mb={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ animation: showResultAnim ? `${bounce} 0.7s` : 'none', width: '100%' }}>
                <Card sx={{ minWidth: 320, maxWidth: 420, width: '100%', borderRadius: 4, boxShadow: 8, background: '#fff', p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'visible' }}>
                  <Typography variant="h5" fontWeight={700} mb={2} color="#222" align="center" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    🎯 Prediction Result
                  </Typography>
                  {/* AQI Badge */}
                  <Box sx={{
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    background: aqiCategoryInfo[prediction.aqi_category]?.color || '#888',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)',
                    mb: 2,
                    position: 'relative',
                    border: '10px solid #fff',
                    fontSize: 44,
                    fontWeight: 900,
                    color: '#fff',
                    textShadow: '0 2px 8px rgba(0,0,0,0.10)'
                  }}>
                    {prediction.prediction ?? '-'}
                  </Box>
                  
                  {/* Hidden Actual Value Button */}
                  {selectedSample !== '' && autofillSamples[selectedSample] && (
                    <Box sx={{ mb: 2, textAlign: 'center' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setShowActualValue(!showActualValue)}
                        sx={{
                          borderRadius: '1rem',
                          borderColor: '#9c27b0',
                          color: '#9c27b0',
                          fontSize: '0.75rem',
                          '&:hover': {
                            borderColor: '#7b1fa2',
                            backgroundColor: 'rgba(156, 39, 176, 0.04)',
                          }
                        }}
                      >
                        {showActualValue ? '🙈 Hide Actual Value' : '👁️ Show Actual Value'}
                      </Button>
                      
                      {showActualValue && (
                        <Box sx={{ 
                          mt: 1, 
                          p: 2, 
                          borderRadius: '1rem',
                          background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(233, 30, 99, 0.1) 100%)',
                          border: '1px solid rgba(156, 39, 176, 0.3)',
                          textAlign: 'center'
                        }}>
                          <Typography variant="body2" sx={{ color: '#2c3e50', fontWeight: 600, mb: 1 }}>
                            📊 Actual AQI Value
                          </Typography>
                          <Typography variant="h6" sx={{ 
                            color: '#9c27b0', 
                            fontWeight: 700,
                            fontSize: '1.5rem'
                          }}>
                            {autofillSamples[selectedSample].AQI || 'N/A'}
                          </Typography>

                        </Box>
                      )}
                    </Box>
                  )}
                  {/* Emoji + Status */}
                  <Typography variant="h4" fontWeight={800} align="center" sx={{ mt: 1, mb: 2, fontSize: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', color: aqiCategoryInfo[prediction.aqi_category]?.color || '#333' }}>
                    <span style={{ fontSize: 38, marginBottom: 4 }}>{aqiCategoryInfo[prediction.aqi_category]?.emoji || '❓'}</span>
                    {aqiCategoryInfo[prediction.aqi_category]?.status || prediction.aqi_category}
                  </Typography>
                  {/* AQI Emoji Meter */}
                  <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                    <span style={{ fontSize: 28, margin: '0 2px' }}>🟢</span>
                    <span style={{ fontSize: 28, margin: '0 2px' }}>🟢</span>
                    <span style={{ fontSize: 28, margin: '0 2px' }}>🟡</span>
                    <span style={{ fontSize: 28, margin: '0 2px' }}>🟠</span>
                    <span style={{ fontSize: 28, margin: '0 2px' }}>🔴</span>
                    <span style={{ fontSize: 28, margin: '0 2px' }}>🛑</span>
                  </Box>
                  {/* Suggestions Section */}
                  <Box sx={{
                    background: '#f6fefb',
                    borderRadius: 3,
                    boxShadow: '0 2px 8px 0 rgba(67,233,123,0.07)',
                    p: 2,
                    mb: 2,
                    width: '100%',
                    maxWidth: 340,
                    border: `2px solid ${aqiCategoryInfo[prediction.aqi_category]?.color || '#43e97b'}`
                  }}>
                    <Typography variant="subtitle1" fontWeight={700} mb={1} color="#333" sx={{ fontSize: 18 }}>
                      Suggestions
                    </Typography>
                    {aqiCategoryInfo[prediction.aqi_category]?.tips?.map((tip, i) => (
                      <Box key={i} display="flex" alignItems="center" gap={1.5} mb={0.5}>
                        <span style={{ fontSize: 22 }}>{tip.icon}</span>
                        <Typography variant="body1" color="#444" sx={{ fontSize: 16 }}>{tip.text}</Typography>
                      </Box>
                    ))}
                  </Box>
                  {/* Model Information */}
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <span style={{ fontSize: 22 }}>🧠</span>
                    <Typography variant="body2" color="#888" align="center" fontWeight={600}>
                      Model Used: {prediction.model_used}
                    </Typography>
                  </Box>
                </Card>
              </Box>
            )}
          </CardContent>
        </GlassCard>
      </AppContainer>
    </ThemeProvider>
  );
}
