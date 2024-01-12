// App.jsx
import React, { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import './App.css'; // Make sure to create this CSS file

const App = () => {
  const [selectedAddress, setSelectedAddress] = useState('');

  const handlePlaceSelect = (place) => {
    setSelectedAddress(place.formatted_address);
  };

  const handlePredictClick = () => {
    // Add your logic for sunset prediction here using the selected address
    console.log('Predict sunset for:', selectedAddress);
  };

  return (
    <div className="app-container">
      <h1 className="title">Sunset Predictor</h1>
      <div className="text-container">
        <label htmlFor="location">Enter Location:</label>
      </div>
      <div className="input-container">
        <Autocomplete
          apiKey="AIzaSyDouikKeLOyhETHplgUVhcTpHMlcps3jwk"
          onPlaceSelected={handlePlaceSelect}
          types={['geocode']}
          placeholder="Start typing your address..."
        />
        <button onClick={handlePredictClick}>Predict</button>
      </div>
    </div>
  );
};

export default App;