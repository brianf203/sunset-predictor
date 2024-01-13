import React, { useState, useEffect, useRef } from 'react';
import './Prediction.css';
import { useLocation } from 'react-router-dom';

const Prediction = () => {

    const location = useLocation().state?.location;

    const latitude = 40.71427
    const longitude = -74.00597
    const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`
    const [sunset, setSunset] = useState('');

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data.results.sunset)
        setSunset(data.results.sunset)
    })
    .catch(error => console.error('Error:', error))

    return (
        <div className="prediction-container">
            <div className="box top-left">Sunset: {sunset}</div>
            <div className="box top-center">
                <div className="title">Sunset Prediction</div>
                <div className="small">{location}</div>
            </div>
            <div className="box top-right">Statistics</div>
            <div className="box middle-left">GOLDEN/BLUE ZONE</div>
            <div className="box middle-center">Image</div>
            <div className="box middle-right">CLOUDS</div>
            <div className="box bottom-left">WEEK FORECAST</div>
            <div className="box bottom-center">Sunset Rating: 82%</div>
            <div className="box bottom-right">AIR QUAL</div>
        </div>
    );
};

export default Prediction;