const openWeatherApiKey = 'c82895bdc50b848e2df6533322b114cb'; // Replace with your valid API key

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const currentWeatherDiv = document.getElementById("currentWeather");
    const forecastDiv = document.getElementById("forecast");
    const searchHistoryDiv = document.getElementById("searchHistory");
    const activitySuggestionsDiv = document.getElementById("activitySuggestions");

    searchButton.addEventListener("click", () => {
        const searchQuery = searchInput.value.trim();
        if (!searchQuery) {
            displayMessage("Please enter a city name or an activity.");
            return;
        }

        if (isCityName(searchQuery)) {
            fetchWeather(searchQuery);
            fetchForecast(searchQuery);
        } else {
            fetchActivities(searchQuery);
        }
        
        updateSearchHistory(searchQuery);
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
            <p>Date: ${new Date().toLocaleDateString()}</p>
            <p>Temperature: ${data.main.temp} °F</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} mph</p>
        `;
    }

    function displayForecast(data) {
        let forecasts = data.list;
        let dailyForecasts = {};

        forecasts.forEach(forecast => {
            let date = new Date(forecast.dt_txt).toLocaleDateString();
            if (!dailyForecasts[date]) {
                dailyForecasts[date] = [];
            }
            dailyForecasts[date].push(forecast);
        });

        forecastDiv.innerHTML = '';
        Object.keys(dailyForecasts).forEach(date => {
            let dayForecasts = dailyForecasts[date];
            let avgTemp = dayForecasts.reduce((sum, forecast) => sum + forecast.main.temp, 0) / dayForecasts.length;

            let forecastElement = document.createElement('div');
            forecastElement.innerHTML = `<p>${date}: ${avgTemp.toFixed(2)} °F</p>`;
            forecastDiv.appendChild(forecastElement);
        });
    }

    function fetchActivities(activity) {
        // Placeholder for fetching activities based on the query
        // Implementation depends on the activity-related API or data source you have
        activitySuggestionsDiv.innerHTML = 'Activity data goes here'; // Example placeholder content
    }

    function updateSearchHistory(query) {
        searchHistoryDiv.innerHTML += `<p>${query}</p>`;
    }

    function isCityName(query) {
        // Placeholder logic to determine if the query is a city name
        // Implement this based on your app's logic or data
        return true; // Assuming all inputs are city names for now
    }
});


