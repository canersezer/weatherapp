import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";
import logo from './img/logo.png'



function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);

  const getData = () => {

    const key = '10fe635411392e1fc9b4a3fb41cd805a'
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=tr`;
    axios
      .get(URL)
      .then((res) => {
        setWeatherData([...weatherData, res.data]);
        setCity('');
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  };


  return (
    <>

      <div className='container'>
        <h1> Weather App</h1>
        <div className='input-box'>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a city ..."
          />
          <button onClick={getData}>Search
          </button>
        </div >


        <div className='weather-data'>
          {weatherData.map((data, index) => (
            <div key={index} className="card">
              <h2>{data.name}</h2>
              <br />
              <p>{Math.floor(data.main.temp)}°C</p>
              <p>{data.weather[0].description}</p>
              {data.weather[0].icon && (
                <img
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
              )}
            </div>
          ))}
        </div>
        <div>
          <img className='logo' src={logo} alt='logo' />
        </div>
      </div>
    </>
  );
}

export default App;