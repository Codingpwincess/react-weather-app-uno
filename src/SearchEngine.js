import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState(null);

  function handleSearch(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const apiKey = "a969311cfcbb4a83dfad2cf7478397f9";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(displayWeather);
  }

  function displayWeather(response) {
    setTemperature(response.data.main.temp);
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIcon(
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  return (
    <div className="WeatherOne">
      <form onSubmit={handleSubmit}>
        <input type="search" placeholder="City Name" onChange={handleSearch} />
        <input type="submit" value="Search" />
      </form>

      {temperature && (
        <ul>
          <li>Temperature: {Math.round(temperature)}°C</li>
          <li>Description:{description}</li>
          <li>Humidity:{humidity}%</li>
          <li> Wind:{wind} km/h</li>
          <li>
            <img src={icon} alt="the icon of the depicting the city's temperature"/>{" "}
          </li>
        </ul>
      )}
    </div>
  );
}
