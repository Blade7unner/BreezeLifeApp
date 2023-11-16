const openWeatherApiKey = 'OPENWEATHER_API_KEY';
const teleportApiKey = 'TELEPORT_API_KEY';

document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("cityInput");
    const searchButton = document.getElementById("searchButton");
    const weatherImage = document.getElementById("weatherImage");
    const weatherInfo = document.getElementById("weatherInfo");
    const forecast = document.getElementById("forecast");

    searchButton.addEventListener("click", () => {
        const cityName = cityInput.value.trim();
        if (!cityName) {
            alert("Please enter a city name."); // Replace with a more sophisticated notification method in actual implementation
            return;
        }

        weatherInfo.textContent = "Loading weather data...";
        fetchWeather(cityName);
        fetchCityImage(cityName);
    });

    










    // Event listener for the search button
searchButton.addEventListener("click", () => {
  const cityName = cityInput.value;
  
  // Make API request to OpenWeather API
  const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openWeatherApiKey}`;
  fetch(openWeatherUrl)
      .then(response => response.json())
      .then(weatherData => {
          // Process and display weatherData
          // Update weatherInfo and weatherImage elements
      })
      .catch(error => console.error(error));

  // Make API request to Teleport API
  const teleportUrl = `https://api.teleport.org/api/city:${cityName}/`;
  fetch(teleportUrl, {
      headers: {
          'Authorization': `Bearer ${teleportApiKey}`
      }
  })
      .then(response => response.json())
      .then(teleportData => {
          // Process and display teleportData
          // Update forecast and cityImage elements
      })
      .catch(error => console.error(error));
});

});