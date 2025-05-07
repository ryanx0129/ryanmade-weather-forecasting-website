// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar'; //go to SearchBar.js created (5/1/2025) 


function App() {
  //added 5/2 for API key to openweather website:
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');  

  const handleSearch = async (cityName) => {
    const apiKey = '9d01f941fa9734151d86decb2f6dbbc6'; // ⬅️ Replace with your real API key
    
    //added 5/2 to ensure all user inputted city can convert to lower case
    // bc openweather data only has lower case cities
    const formattedCity = cityName.trim().toLowerCase(); // 👈 convert to lowercase
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${formattedCity}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (err) {
      console.error(err.message);
      setWeatherData(null);
      setError('City not found. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Weather Forecast Website</h1>
      <SearchBar onSearch={handleSearch} />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div style={{ marginTop: '20px' }}>
          <h2>{weatherData.name}</h2>
          <p>🌡️ Temperature: {weatherData.main.temp} °C</p>
          <p>💧 Humidity: {weatherData.main.humidity} %</p>
          <p>🌬️ Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>🌥️ Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;




  // ****5/1****
  // This function will be called when user submits a city name (5/1/2025)
//   const handleSearch = (cityName) => {
//     console.log('User searched for:', cityName);
//     // 🚧 In the next phase, you'll fetch weather data here
//   };

//   return (
//     <div className="App">
//       <h1>Weather Forecast Website</h1>
//       <SearchBar onSearch={handleSearch} />
//     </div>
//   );
// }

// export default App;
  // ****5/2**** 