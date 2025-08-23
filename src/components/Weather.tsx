import React, { useState, useEffect } from 'react';
import './Weather.css';

interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
  emoji: string;
}

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

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

  useEffect(() => {
    const getWeather = async () => {
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

    getWeather();
  }, []);

  const handleMouseEnter = () => {
    setShowDetails(true);
  };

  const handleMouseLeave = () => {
    setShowDetails(false);
  };

  if (loading) {
    return (
      <div className="tray-icon weather-icon" title="Loading weather...">
        <div className="weather-emoji">⏳</div>
      </div>
    );
  }

  if (error && !weather) {
    return (
      <div className="tray-icon weather-icon" title="Weather unavailable">
        <div className="weather-emoji">❌</div>
      </div>
    );
  }

  return (
    <div 
      className="tray-icon weather-icon" 
      title="Current Weather"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="weather-emoji">{weather?.emoji}</div>
      
      {/* Weather Details Tooltip */}
      {showDetails && weather && (
        <div className="weather-details">
          <div className="weather-location">{weather.location}</div>
          <div className="weather-temp">{weather.temperature}°F</div>
          <div className="weather-condition">{weather.condition}</div>
        </div>
      )}
    </div>
  );
};

export default Weather;
