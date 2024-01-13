import React from 'react';
import './Prediction.css';
import { useLocation } from 'react-router-dom';

const Prediction = () => {

    const location = useLocation().state?.location;

    return (
        <div className="prediction-container">
            <div className="box top-left">Sunset: 5:45</div>
            <div className="box top-center">
                <div className="title">Sunset Prediction</div>
                <div className="small">{location}</div>
            </div>
            <div className="box top-right">Statistics</div>
            <div className="box middle-left">Text 4</div>
            <div className="box middle-center">Image</div>
            <div className="box middle-right">Text 5</div>
            <div className="box bottom-left">Text 6</div>
            <div className="box bottom-center">Sunset Rating: 82%</div>
            <div className="box bottom-right">Text 8</div>
        </div>
    );
};

export default Prediction;