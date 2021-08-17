import React, { useState } from 'react';

import logo from "./img/logo.svg";

const api = {
  key: "fc540f071467160632a76934c0364e25",
  base: "http://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = event => {
    if(event.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  return (
    <div className={((typeof weather.main != "undefined") ? ((weather.main.temp > 16 ) ? 'app' : ' cold') : 'app')}>
      <main  className={((typeof weather.weather != "undefined") ? ((weather.weather[0].main === "Rain") ? 'rain': 'sunny') : 'rain')}>
        <div className="search-box">
          <img className="logo" src={logo} alt="logo"/>
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        
          {(typeof weather.main != "undefined") ? (
          <div> 
            <div className="location-box">
             <div className="location">{weather.name}, {weather.sys.country}</div>
             <div className="coord">Coordinates: {weather.coord.lat}N, {weather.coord.lon}E</div>
             <div className="date">{new Date().toDateString()}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)} ºC
              </div>
              
             <div className="weather">{weather.weather[0].main}</div>
            </div>
            <div className="details">
              <div className="humidity">
                Humidity: {Math.round(weather.main.humidity)}%
              </div>
              <div className="wind">
                Wind: {Math.round(weather.wind.speed)} km/h
              </div>
            </div>
          </div>
          ) : ("")}
         
      </main>
    </div>
  );
}

export default App;
