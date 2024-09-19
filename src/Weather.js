import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const apiKey = '8f0bb0b02fea09c85214ea215f0fc174'; // Replace with your OpenWeatherMap API key

    const getWeather = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
            setWeatherData(response.data);
        } catch (err) {
            setError('Location not found');
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="weather-container">
            <h1>Weather App</h1>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city name"
                aria-label="Location"
            />
            <button onClick={getWeather} aria-label="Get Weather">Get Weather</button>
            {loading && <div className="loader">Loading...</div>}
            {error && <p className="error">{error}</p>}
            {weatherData && (
                <div className="weather-info">
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather icon" />
                    <p>Temperature: {weatherData.main.temp} °C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
