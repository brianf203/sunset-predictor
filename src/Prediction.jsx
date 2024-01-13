import React, { useState, useEffect, useRef } from 'react';
import './Prediction.css';
import { useLocation } from 'react-router-dom';

const Prediction = () => {

    const location = useLocation().state?.location;
    const city = location.split(', ')[1];
    const url = `http://api.weatherapi.com/v1/current.json?key=9cec45c5a8314b71b8f195617241301&q=${city}&aqi=yes`

    const [sunset, setSunset] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [air, setAir] = useState({});
    const [cloud, setCloud] = useState('');
    const [hum, setHum] = useState('');
    const [pres, setPres] = useState('');
    const [wind, setWind] = useState('');


    fetch(url)
    .then(response => response.json())
    .then(data => {
        setAir(data.current.air_quality)
        setCloud(data.current.cloud)
        setHum(data.current.humidity)
        setPres(data.current.pressure_in)
        setWind(data.current.wind_mph)
        setLat(data.location.lat)
        setLon(data.location.lon)

    })
    .catch(error => console.error('Error:', error))

    const url2 = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}`
    fetch(url2)
    .then(response2 => response2.json())
    .then(data2 => {
        setSunset(data2.results.sunset)
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
            <div className="box middle-right">
                <div>Air Quality: {air['us-epa-index']}AQI</div>
                <div>Cloud Coverage: {cloud}%</div>
                <div>Humidity: {hum}%</div>
                <div>Pressure: {pres}inHg</div>
                <div>Wind: {wind}mph</div>
            </div>
            <div className="box bottom-left"></div>
            <div className="box bottom-center">Sunset Rating: 82%</div>
            <div className="box bottom-right"></div>
        </div>
    );
};

export default Prediction;