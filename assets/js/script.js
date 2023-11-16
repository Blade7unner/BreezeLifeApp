const openWeatherApiKey = 'c82895bdc50b848e2df6533322b114cb'; // Updated with your API key


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
        fetchTeleportData(cityName);
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

    function fetchTeleportData(cityName) {
        const teleportUrl = `https://api.teleport.org/api/cities/?search=${cityName}`;
        fetch(teleportUrl)
            .then(response => response.json())
            .then(teleportData => {
                // Check if the city was found and data is available
                if (teleportData && teleportData._embedded && teleportData._embedded['city:search-results'] && teleportData._embedded['city:search-results'].length > 0) {
                    const cityData = teleportData._embedded['city:search-results'][0];
                    const cityName = cityData.matching_full_name;
                    const cityPopulation = cityData._links['city:item'].population;
                    
                    // Assuming you have an element with id 'cityInfo' to display the city's information
                    const cityInfo = document.getElementById('cityInfo');
                    cityInfo.textContent = `City: ${cityName}, Population: ${cityPopulation}`;
                } else {
                    throw new Error("City not found or data not available");
                }
            })
            .catch(error => console.error(error));
    }

    function kelvinToFahrenheit(kelvin) {
        return (kelvin - 273.15) * 9/5 + 32;
    }
});












