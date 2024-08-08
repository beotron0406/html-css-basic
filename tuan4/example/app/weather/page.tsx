'use client';
import React, { useState } from 'react';
import './WeatherPage.css';

interface WeatherData {
  name: string;
  weather: [{ icon: string; description: string }];
  main: { temp: number; humidity: number };
  wind: { speed: number };
  sys: { country: string };
}

const Weather: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = "062d92a2646152d39eb7845a608226cb";

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=vi&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Không có địa điểm');
      }

      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!city.trim()) {
      setError('Vui lòng nhập tên địa điểm!');
      setWeatherData(null); // Xóa dữ liệu cũ (nếu có) khi có lỗi nhập liệu
    } else {
      fetchWeather(city);
    }
  };

  return (
    <div className="thoitiet">
      <div className="searchtiet" style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          className="search-bar"
          id="otiet"
          placeholder="Tìm kiếm địa điểm"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button id="timtiet" onClick={handleSearch}>
          Tìm
        </button>
      </div>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        weatherData && (
          <div className="weather">
            <div className="city">{weatherData.name} , {weatherData.sys.country}</div>
            <div className="temp">{weatherData.main.temp}°C</div>
            <img
              className="may"
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
            />
            <div className="description">{weatherData.weather[0].description}</div>
            <div>
              <span className="humidity">Độ ẩm: {weatherData.main.humidity}%</span>
            </div>
            <div>
              <span className="wind">Gió: {weatherData.wind.speed} km/h</span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Weather;
