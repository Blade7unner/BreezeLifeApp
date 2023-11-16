const openWeatherApiKey = 'c82895bdc50b848e2df6533322b114cb'; // Replace with your valid API key

document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("activityInput");
    const searchButton = document.getElementById("searchButton");
    const currentWeatherDiv = document.getElementById("currentWeather");
    const forecastDiv = document.getElementById("forecast");
    const searchHistoryDiv = document.getElementById("searchHistory");

    searchButton.addEventListener("click", () => {
        const cityName = cityInput.value.trim();
        if (!cityName) {
            alert("Please enter a city name.");
            return;
        }

        fetchWeather(cityName);
        fetchForecast(cityName);
        updateSearchHistory(cityName);
    });

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

        // Organize forecasts by date
        forecasts.forEach(forecast => {
            let date = new Date(forecast.dt_txt).toLocaleDateString();
            if (!dailyForecasts[date]) {
                dailyForecasts[date] = [];
            }
            dailyForecasts[date].push(forecast);
        });

        // Calculate average temperature for each day and create display elements
        forecastDiv.innerHTML = '';
        Object.keys(dailyForecasts).forEach(date => {
            let dayForecasts = dailyForecasts[date];
            let avgTemp = dayForecasts.reduce((sum, forecast) => sum + forecast.main.temp, 0) / dayForecasts.length;

            let forecastElement = document.createElement('div');
            forecastElement.innerHTML = `<p>${date}: ${avgTemp.toFixed(2)} °F</p>`;
            forecastDiv.appendChild(forecastElement);
        });
    }

    function updateSearchHistory(cityName) {
        // Add cityName to search history and update the display
        searchHistoryDiv.innerHTML += `<p>${cityName}</p>`;
    }
});
