const openWeatherApiKey = 'c82895bdc50b848e2df6533322b114cb'; // Replace with your valid API key

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const currentWeatherDiv = document.getElementById("currentWeather");
    const forecastDiv = document.getElementById("forecast");

    searchButton.addEventListener("click", () => {
        const searchQuery = searchInput.value.trim();
        if (!searchQuery) {
            displayMessage("Please enter a city name or an activity.");
            return;
        }

        if (isCityName(searchQuery)) {
            fetchWeather(searchQuery);
            fetchForecast(searchQuery);
            fetchCityInfo(searchQuery); // Fetch city information from Teleport API
        } else {
            // Placeholder: fetchActivities function needs to be implemented if you want to search for activities
        }
    });

    function displayMessage(message) {
        currentWeatherDiv.innerHTML = `<p>${message}</p>`;
    }

    function fetchWeather(cityName) {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openWeatherApiKey}&units=imperial`;
        fetch(weatherUrl)
            .then(response => response.json())
            .then(data => {
                displayCurrentWeather(data);
            })
            .catch(error => console.error("Error fetching current weather:", error));
    }

    function fetchForecast(cityName) {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${openWeatherApiKey}&units=imperial`;
        fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                displayForecast(data);
            })
            .catch(error => console.error("Error fetching forecast:", error));
    }

    function displayCurrentWeather(data) {
        currentWeatherDiv.innerHTML = `
            <p>City: ${data.name}</p>
            <p>Date: ${new Date(data.dt * 1000).toLocaleDateString()}</p>
            <p>Temperature: ${data.main.temp} °F</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} mph</p>
        `;
    }

    function displayForecast(data) {
        forecastDiv.innerHTML = ''; // Clear existing forecast data
        let forecasts = data.list;
        let dailyForecasts = {};

        forecasts.forEach(forecast => {
            let date = new Date(forecast.dt * 1000).toLocaleDateString();
            if (!dailyForecasts[date]) {
                dailyForecasts[date] = [];
            }
            dailyForecasts[date].push(forecast);
        });

        Object.keys(dailyForecasts).forEach(date => {
            let dayForecasts = dailyForecasts[date];
            let avgTemp = dayForecasts.reduce((sum, forecast) => sum + forecast.main.temp, 0) / dayForecasts.length;

            let forecastElement = document.createElement('div');
            forecastElement.innerHTML = `<p>${date}: ${avgTemp.toFixed(2)} °F</p>`;
            forecastDiv.appendChild(forecastElement);
        });
    }

    function fetchCityInfo(cityName) {
        const teleportApiUrl = `https://api.teleport.org/api/urban_areas/slug:${cityName.toLowerCase().replace(/ /g, '-')}/scores/`;
        fetch(teleportApiUrl)
            .then(response => response.json())
            .then(data => {
                // Assuming you have an element with id 'cityInfo' to display the city's information
                const cityInfoDiv = document.getElementById('cityInfo'); // Make sure to add this element to your HTML
                // The rest of your code to process and display city information goes here
                console.log(data); // For debugging
            })
            .catch(error => console.error("Error fetching city info:", error));
    }

    function isCityName(query) {
        // Here you would implement your logic to determine if the query is a city name
        // For the placeholder, we assume all inputs are city names
        return true;
    }

    // Add other functions here if needed, like fetchActivities, etc.
});

 


