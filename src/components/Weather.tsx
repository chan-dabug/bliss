import React, { useState } from 'react';
import styled from 'styled-components';

interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
  emoji: string;
}

const WeatherIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 3px;
  transition: background-color 0.1s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const WeatherEmoji = styled.div`
  font-size: 16px;
`;

const WeatherDetails = styled.div`
  position: absolute;
  bottom: 100%;
  right: 10%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 11px;
  white-space: nowrap;
  margin-bottom: 8px;
  z-index: 1001;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.9);
  }
`;

const WeatherLocation = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const WeatherTemp = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #FFD700;
  margin-bottom: 2px;
`;

const WeatherCondition = styled.div`
  color: #CCCCCC;
`;

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [locationRequested, setLocationRequested] = useState(false);

  // Weather condition to emoji mapping
  const getWeatherEmoji = (condition: string): string => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('clear') || conditionLower.includes('sun')) return '☀️';
    if (conditionLower.includes('cloud')) return '☁️';
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) return '🌧️';
    if (conditionLower.includes('snow')) return '❄️';
    if (conditionLower.includes('thunder') || conditionLower.includes('storm')) return '⛈️';
    if (conditionLower.includes('fog') || conditionLower.includes('mist')) return '🌫️';
    if (conditionLower.includes('partly')) return '⛅';
    
    return '🌤️'; // default
  };

  const getWeather = async () => {
    if (locationRequested) return; // Prevent multiple requests
    
    setLoading(true);
    setError(null);
    setLocationRequested(true);
    
    try {
      // Get user's location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });

      const { latitude, longitude } = position.coords;

      // Call OpenWeatherMap API (free tier)
      const apiKey = 'dcf99a0b1b9d737043ca8776f23b0ce3'; // You'll need to get a free API key from openweathermap.org
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
      );

      if (!response.ok) {
        throw new Error('Weather API request failed');
      }

      const data = await response.json();
      
      // Get city name from reverse geocoding
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
      );
      
      let cityName = 'Unknown Location';
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        if (geoData.length > 0) {
          cityName = geoData[0].name;
        }
      }

      setWeather({
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        location: cityName,
        emoji: getWeatherEmoji(data.weather[0].main)
      });
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('Weather unavailable');
      
      // Fallback weather data for demo purposes
      setWeather({
        temperature: 72,
        condition: 'Clear',
        location: 'San Francisco, CA',
        emoji: '☀️'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMouseEnter = () => {
    setShowDetails(true);
  };

  const handleMouseLeave = () => {
    setShowDetails(false);
  };

  const handleClick = () => {
    if (!locationRequested && !loading) {
      getWeather();
    }
  };

  if (loading) {
    return (
      <WeatherIcon title="Loading weather...">
        <WeatherEmoji>⏳</WeatherEmoji>
      </WeatherIcon>
    );
  }

  if (error && !weather) {
    return (
      <WeatherIcon title="Weather unavailable">
        <WeatherEmoji>❌</WeatherEmoji>
      </WeatherIcon>
    );
  }

  // Show clickable weather icon if location hasn't been requested
  if (!locationRequested && !weather) {
    return (
      <WeatherIcon 
        title="Click to get weather"
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <WeatherEmoji>🌤️</WeatherEmoji>
      </WeatherIcon>
    );
  }

  return (
    <WeatherIcon 
      title="Current Weather"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <WeatherEmoji>{weather?.emoji}</WeatherEmoji>
      
      {/* Weather Details Tooltip */}
      {showDetails && weather && (
        <WeatherDetails>
          <WeatherLocation>{weather.location}</WeatherLocation>
          <WeatherTemp>{weather.temperature}°F</WeatherTemp>
          <WeatherCondition>{weather.condition}</WeatherCondition>
        </WeatherDetails>
      )}
    </WeatherIcon>
  );
};

export default Weather;
