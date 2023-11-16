const openWeatherApiKey = 'c82895bdc50b848e2df6533322b114cb'; // Updated with your API key
const teleportApiKey = 'TELEPORT_API_KEY'; // Replace with valid API key if needed

document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("activityInput"); // Assuming this is the city input
    const searchButton = document.getElementById("searchButton");

    const weatherInfo = document.getElementById("weather"); // Display weather information here
    const activityInfo = document.getElementById("activity"); // display activity info here

    searchButton.addEventListener("click", () => {
        const cityName = cityInput.value.trim();
        if (!cityName) {
            alert("Please enter a city name."); // notification 
            return;
        }

        weatherInfo.textContent = "Loading weather data...";
        fetchWeather(cityName);
    });

    function fetchWeather(cityName) {
        const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openWeatherApiKey}`;
        fetch(openWeatherUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return response.json();
            })
            .then(weatherData => {
                if (!weatherData || !weatherData.main || !weatherData.main.temp) {
                    throw new Error("Invalid weather data format");
                }
                const temperatureFahrenheit = kelvinToFahrenheit(weatherData.main.temp);
                weatherInfo.textContent = `Temperature: ${temperatureFahrenheit.toFixed(2)} °F`;
                // Additional weather info updates...
            })
            .catch(error => {
                weatherInfo.textContent = `Error: ${error.message}`;
                console.error(error);
            });
    }

    function kelvinToFahrenheit(kelvin) {
        return (kelvin - 273.15) * 9/5 + 32;
    }

    const weatherImage = document.getElementById("weatherImage");
    const weatherInfo = document.getElementById("weatherInfo")
    const forecast = document.getElementById("forecast");


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



    















