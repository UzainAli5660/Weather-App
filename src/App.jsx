import React, { useState, useEffect } from 'react';
import './App.css';
// import Cards from './Components/Card';
// import Header from './Components/Header';
import End from './Components/End';
// import Modal from './Components/Modal';

const cities = [
  "Karachi",
  "Los Angeles",
  "Tokyo",
  "Seoul",
  "New York",
  "Dhaka",
  "Lahore",
  "Adelaide",
  "Cape Town",
  "Melbourne",
  "Mumbai",
];

function App() {
  const [chosen, setChosen] = useState(cities[0]);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Function called");
    setLoading(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${chosen}&appid=76cf10d7c1b21587acb861780cb2f6c9`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setWeatherData(res);
        setLoading(false);
      });
  }, [chosen]);

  const handleCityChange = (e) => {
    setChosen(e.target.value);
  };

  const weatherInfo = weatherData ? {
    main: weatherData.main,
    weather: weatherData.weather[0],
    sys: weatherData.sys,
    name: weatherData.name
  } : {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-weather bg-center bg-cover">
      <h1 className="text-3xl text-white font-bold mb-10">Weather App</h1>
      <select
        onChange={handleCityChange}
        className="select-style"
        value={chosen}
      >
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      {loading ? (
        <div className="text-lg text-purple">Loading...</div>
      ) : (
        weatherData && (
          <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg text-center">
            <img
              src={`https://openweathermap.org/img/wn/${weatherInfo.weather.icon}@2x.png`}
              alt={weatherInfo.weather.description}
              className="mx-auto"
            />
            <h1 className="text-3xl font-bold underline my-2 text-purple">{weatherInfo.weather.main}</h1>
            <h2 className="text-2xl mb-4 text-purple">
              {Math.round(weatherInfo.main.temp - 273.15)}°C (Feels like: {Math.round(weatherInfo.main.feels_like - 273.15)}°C)
            </h2>
            <div className="text-xl my-2 flex justify-between text-purple">
              <span className="font-semibold">Humidity:</span>
              <span>{weatherInfo.main.humidity}%</span>
            </div>
            <div className="text-xl my-2 flex justify-between text-purple">
              <span className="font-semibold">Pressure:</span>
              <span>{weatherInfo.main.pressure} hPa</span>
            </div>
            <div className="text-xl my-2 flex justify-between text-purple">
              <span className="font-semibold">Sunrise:</span>
              <span>{new Date(weatherInfo.sys.sunrise * 1000).toLocaleTimeString()}</span>
            </div>
            <div className="text-xl my-2 flex justify-between text-purple">
              <span className="font-semibold">Sunset:</span>
              <span>{new Date(weatherInfo.sys.sunset * 1000).toLocaleTimeString()}</span>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default App;
