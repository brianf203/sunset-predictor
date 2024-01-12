import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [location, setLocation] = useState('');
  const [suggestedAddresses, setSuggestedAddresses] = useState([]);
  const suggestionsRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleTextboxClick = () => {
    setShowDropdown(true);
    console.log("CLICKED");
  };

  const handleLocationChange = (e) => {
    console.log("HELLO");
    setLocation(e.target.value);
    setShowDropdown(true);
  };

  const handlePredictClick = () => {
    console.log('Predict sunset for:', location);
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`/api/maps/api/place/autocomplete/json`, {
          params: {
            input: location,
            key: 'AIzaSyDouikKeLOyhETHplgUVhcTpHMlcps3jwk',
          },
        });
        console.log('API Response:', response.data);
        setSuggestedAddresses(response.data.predictions.slice(0, 5));
      } catch (error) {
        console.error('Error fetching suggested addresses:', error);
      }
    };

    if (location.trim() !== '') {
      fetchAddresses();
    } else {
      setSuggestedAddresses([]);
    }
  }, [location]);

  const handleSuggestionClick = (address) => {
    setLocation(address.description);
    setSuggestedAddresses([]);
    setShowDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
      setSuggestedAddresses([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="app-container">
      <h1 className="title">Sunset Predictor</h1>
      <div className="text-container">
        <label htmlFor="location">Enter Location:</label>
      </div>
      <div className="input-container">
        <input
          type="text"
          id="location"
          value={location}
          onChange={handleLocationChange}
          placeholder="Start typing your address..."
          onClick={handleTextboxClick}
        />
        <button onClick={handlePredictClick}>
          <Link to="/prediction" style={{ textDecoration: 'none', color: 'black' }}>Predict</Link>
        </button>
      </div>
      {showDropdown && suggestedAddresses.length > 0 && (
        <div className="suggestions" ref={suggestionsRef}>
          {suggestedAddresses.map((address) => (
            <div key={address.place_id} onClick={() => handleSuggestionClick(address)}>
              {address.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;