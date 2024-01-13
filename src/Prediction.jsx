import React from 'react';
import './Prediction.css';

const Prediction = () => {
  return (
    <div className="prediction-container">
      <div className="box top-left">Sunset: 5:45</div>
      <div className="box top-center">Prediction</div>
      <div className="box top-right">Statistics</div>
      <div className="box middle-left">Text 4</div>
      <div className="box middle-center image-box">Image</div>
      <div className="box middle-right">Text 5</div>
      <div className="box bottom-left">Text 6</div>
      <div className="box bottom-center">Text 7</div>
      <div className="box bottom-right">Text 8</div>
    </div>
  );
};

export default Prediction;