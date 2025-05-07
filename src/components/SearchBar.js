import React, { useState } from 'react';
import './SearchBar.css';


// old ver simple search without showing suggestion: ---------1------
// function SearchBar({ onSearch }) {
//   const [city, setCity] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent page refresh
//     if (city.trim() !== '') {
//       onSearch(city);
//       setCity(''); // Clear the input after search
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Enter city name..."
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//       />
//       <button type="submit">Search</button>
//     </form>
//   );
// }

// export default SearchBar;
//-------------1------------

function SearchBar({ onSearch }) {
    const [city, setCity] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const apiKey = '9d01f941fa9734151d86decb2f6dbbc6';
  
    const handleChange = async (e) => {
      const value = e.target.value;
      setCity(value);
  
      if (value.length < 2) {
        setSuggestions([]);
        return;
      }
  
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${apiKey}`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching city suggestions:', error);
      }
    };
  
    const handleSelect = (suggestion) => {
      const cityName = suggestion.name;
      setCity(`${suggestion.name}${suggestion.state ? ', ' + suggestion.state : ''}, ${suggestion.country}`);
      setSuggestions([]);
      onSearch(cityName.toLowerCase());
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (city.trim() !== '') {
        onSearch(city.trim().toLowerCase());
        setSuggestions([]);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={handleChange}
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <>
              <div className="instruction-tip fade-in-tip">
                💡 Tip: Please click a city from the list for best results.
              </div>
              <ul className="suggestions fade-in">
                {suggestions.map((s, index) => (
                  <li key={index} onClick={() => handleSelect(s)}>
                    {s.name}
                    {s.state ? `, ${s.state}` : ''} ({s.country})
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <button type="submit">Search</button>
      </form>
    );
  }
  
  export default SearchBar;
