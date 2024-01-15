import React, { useState, useEffect } from 'react';
import './Prediction.css';
import { useLocation } from 'react-router-dom';
import good from './good.png';
import mid from './mid.png';
import bad from './bad.png';
import golden from './golden.png';

const Prediction = () => {
    const location = useLocation().state?.location;
    const city = location.split(', ')[1];
    const url = `http://api.weatherapi.com/v1/current.json?key=9cec45c5a8314b71b8f195617241301&q=${city}&aqi=yes`;

    const [sunset, setSunset] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [air, setAir] = useState(0);
    const [cloud, setCloud] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [pressure, setPressure] = useState(0);
    const [wind, setWind] = useState(0);

    const getImagePath = (value, type) => {
        if (type === 'air') {
            if (value < 25) return good;
            else if (value >= 25 && value <= 75) return mid;
            else return bad;
        } else if (type === 'cloud') {
            if (value >= 30 && value <= 60) return good;
            else if ((value >= 20 && value < 30) || (value > 60 && value <= 70)) return mid;
            else return bad;
        } else if (type === 'humidity') {
            if (value < 30) return good;
            else if (value >= 30 && value <= 50) return mid;
            else return bad;
        } else if (type === 'pressure') {
            if (value > 30.2) return good;
            else if (value >= 29.8 && value <= 30.2) return mid;
            else return bad;
        } else if (type === 'wind') {
            if (value < 5) return good;
            else if (value >= 5 && value <= 10) return mid;
            else return bad;
        }

        return '';
    };

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setAir(parseInt(data.current.air_quality['us-epa-index'], 10));
                setCloud(parseInt(data.current.cloud, 10));
                setHumidity(parseInt(data.current.humidity, 10));
                setPressure(parseFloat(data.current.pressure_in));
                setWind(parseInt(data.current.wind_mph, 10));
                setLat(data.location.lat);
                setLon(data.location.lon);
            })
            .catch((error) => console.error('Error:', error));
    }, [url]);

    const url2 = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}`;
    useEffect(() => {
        fetch(url2)
            .then((response2) => response2.json())
            .then((data2) => {
                setSunset(data2.results.sunset);
            })
            .catch((error) => console.error('Error:', error));
    }, [url2]);

    const sunsetParts = sunset.split(":");
    let newMinutes = parseInt(sunsetParts[1]) - 15;
    let newMinutes2 = parseInt(sunsetParts[1]) + 15;
    let newHours = parseInt(sunsetParts[0]);
    let newHours2 = parseInt(sunsetParts[0]);

    if (newMinutes < 0) {
    newMinutes += 60;
    newHours -= 1;
    }
    if (newMinutes2 > 59) {
        newMinutes2 -=60;
        newHours2 +=1;
    }
    const goldStart = `${newHours}:${newMinutes}:${sunsetParts[2]}`;
    const goldEnd = `${newHours2}:${newMinutes2}:${sunsetParts[2]}`;

    let cloudScore = 0;
    if (cloud >= 30 && cloud <= 60) cloudScore = 40;
    else if (cloud < 30) cloudScore = cloud / 30 * 40;
    else cloudScore = 100 - cloud;

    let airScore = 0;
    if (air < 25) airScore = 25;
    else if (air < 50) airScore = 15;
    else if (air < 75) airScore = 5;
    else airScore = 0;

    let windScore = 0;
    if (wind < 5) windScore = 15;
    else if (wind < 10) windScore = 8;
    else if (wind < 15) windScore = 4;
    else windScore = 0;

    let humScore = 0;
    if (humidity < 30) humScore = 10;
    else if (humidity < 50) humScore = 5;
    else humScore = 0;

    let presScore = 0;
    if (pressure > 30.2) presScore = 10;
    else if (pressure >= 29.8) presScore = 5;
    else presScore = 0;

    return (
        <div className="prediction-container">
            <div className="box top-left">Sunset: {sunset}</div>
            <div className="box top-center">
                <div className="title">Sunset Prediction</div>
                <div className="small">{location}</div>
            </div>
            <div className="box top-right">Statistics</div>
            <div className="middle-left">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: '22px', marginTop: '60px' }}>Golden Zone</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{marginLeft: '1.5px' }}>{goldStart}</span>
                <span style={{marginRight: '1.5px' }}>{goldEnd}</span>
            </div>
                <div>
                    <img src={golden} 
                    alt="Your Image" 
                    style={{ width: '100%', height: '150%' }}
                    />
                </div>
            </div>
            <div className="box middle-center">Image</div>
            <div className="middle-right">
                <div>
                    <img
                        src={getImagePath(air, 'air')}
                        alt="Air Quality"
                        style={{ width: '5%', height: 'auto', marginRight: '5px' }}
                    />
                    Air Quality: {air} AQI
                </div>
                <div>
                    <img 
                        src={getImagePath(cloud, 'cloud')} 
                        alt="Cloud Coverage" 
                        style={{ width: '5%', height: 'auto', marginRight: '5px' }}
                        />
                    Cloud Coverage: {cloud}%
                </div>
                <div>
                    <img 
                        src={getImagePath(humidity, 'humidity')} 
                        alt="Humidity" 
                        style={{ width: '5%', height: 'auto', marginRight: '5px' }}
                        />
                    Humidity: {humidity}%
                </div>
                <div>
                    <img 
                        src={getImagePath(pressure, 'pressure')} 
                        alt="Pressure" 
                        style={{ width: '5%', height: 'auto', marginRight: '5px' }}
                        />
                    Pressure: {pressure} inHg
                </div>
                <div>
                    <img 
                        src={getImagePath(wind, 'wind')} 
                        alt="Wind" 
                        style={{ width: '5%', height: 'auto', marginRight: '5px' }}
                        />
                    Wind: {wind} mph
                </div>
            </div>
            <div className="box bottom-left"></div>
            <div className="box bottom-center">Sunset Rating: {cloudScore + airScore + windScore + humScore + presScore}%</div>
            <div className="box bottom-right"></div>
        </div>
    );
};

export default Prediction;