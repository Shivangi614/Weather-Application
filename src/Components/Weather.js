
import React, { useState } from 'react';
import axios from 'axios';



const API_KEY = process.env.REACT_APP_API_KEY;



function Weather() {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setError('');
    setWeather(null);
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError('Error fetching weather data');
    }

    setLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city && country) {
      fetchWeather();
    } else {
      setError('Please enter both city and country');
    }
  };

  // Determine the weather condition class based on temperature and weather description
  const getWeatherClass = () => {
    if (!weather) return '';
    const temp = weather.main.temp;
    const description = weather.weather[0].description.toLowerCase();

    if (description.includes('rain')) return 'rainy';
    if (temp > 30) return 'hot';
    if (temp < 10) return 'cold';
    return 'mild';
  };

  const weatherClass = getWeatherClass();

  return (
    <div className={`weather-app ${weatherClass}`}>
      <h1>Weather Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </form>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>Weather in {weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
