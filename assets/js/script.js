const openWeatherApiKey = 'O4b9003adf8523264e0d88c73fd217e82';
const teleportApiKey = 'TELEPORT_API_KEY';

document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("activityInput"); // Adjusted to match HTML
    const searchButton = document.getElementById("searchButton");
    const weatherInfo = document.getElementById("weather"); // Adjusted to match HTML
    const activityInfo = document.getElementById("activity"); // Display activity here

    searchButton.addEventListener("click", () => {
        const cityName = cityInput.value.trim();
        if (!cityName) {
            alert("Please enter a city name."); // notification to input city name
            return;
        }

        weatherInfo.textContent = "Loading weather data...";
        fetchWeather(cityName);
    });

    function fetchWeather(cityName) {
        const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openWeatherApiKey}`;
        fetch(openWeatherUrl)
            .then(response => response.json())
            .then(weatherData => {
                if (!weatherData || !weatherData.main || !weatherData.main.temp) {
                    throw new Error("Invalid weather data format");
                }
                const temperatureFahrenheit = kelvinToFahrenheit(weatherData.main.temp);
                weatherInfo.textContent = `Temperature: ${temperatureFahrenheit.toFixed(2)} °F`;
                // Additional weather info updates...
            })
            .catch(error => {
                weatherInfo.textContent = "An error occurred while fetching weather data. Please try again.";
                console.error(error);
            });
    }

    function kelvinToFahrenheit(kelvin) {
        return (kelvin - 273.15) * 9/5 + 32;
    }
});


    















