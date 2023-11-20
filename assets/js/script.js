const openWeatherApiKey = 'c82895bdc50b848e2df6533322b114cb'; // Replace with your OpenWeather API key

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const currentWeatherDiv = document.getElementById("currentWeather");
    const climateInfoDiv = document.getElementById("climateInfo");
    const forecastDiv = document.getElementById("forecast");
    const lifeQualityDiv = document.getElementById("lifeQualityInfo");
    const searchHistoryDiv = document.getElementById("searchHistory");

    searchButton.addEventListener("click", () => {
        let cityName = searchInput.value.trim();
        cityName = capitalizeCityName(cityName);
        if (cityName) {
            fetchWeather(cityName);
            fetchCityInfo(cityName);
            fetchFiveDayForecast(cityName);
            fetchLifeQualityData(cityName);
            addCityToSearchHistory(cityName);
        } else {
            displayMessage("Please enter a city name.");
        }
    });

    searchHistoryDiv.addEventListener("click", (event) => {
        if (event.target.className.includes('search-history-item')) {
            const cityName = event.target.textContent;
            fetchWeather(cityName);
            fetchCityInfo(cityName);
            fetchFiveDayForecast(cityName);
            fetchLifeQualityData(cityName);
        }
    });

    function capitalizeCityName(cityName) {
        return cityName.split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(' ');
    }

    function displayMessage(message) {
        currentWeatherDiv.innerHTML = `<p>${message}</p>`;
    }

    function fetchWeather(cityName) {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openWeatherApiKey}&units=imperial`;
        fetch(weatherUrl)
            .then(response => response.json())
            .then(data => displayCurrentWeather(data))
            .catch(error => console.error("Error fetching current weather:", error));
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

    function fetchCityInfo(cityName) {
        const teleportApiUrl = `https://api.teleport.org/api/urban_areas/slug:${cityName.toLowerCase().replace(/ /g, '-')}/scores/`;
        fetch(teleportApiUrl)
            .then(response => response.json())
            .then(data => {
                displayCityInfo(data, cityName);
                fetchClimateInfo(cityName); // Fetching additional climate information
            })
            .catch(error => console.error("Error fetching city info:", error));
    }

    function displayCityInfo(data, cityName) {
        // Use climateInfoDiv to display the city information
        if (climateInfoDiv) {
            climateInfoDiv.innerHTML += `<h3>Quality of Life in ${cityName}</h3>`;
            // Add more details from the data as required
            // Example: climateInfoDiv.innerHTML += `<p>Score: ${data.teleport_city_score}</p>`;
        } else {
            console.error("Element with ID 'climateInfo' not found");
        }
    }
    

    function fetchClimateInfo(cityName) {
        const citySlug = cityName.toLowerCase().replace(/ /g, '-');
        const climateApiUrl = `https://api.teleport.org/api/urban_areas/slug:${citySlug}/details/`;
        fetch(climateApiUrl)
            .then(response => response.json())
            .then(data => displayClimateInfo(data, cityName))
            .catch(error => console.error("Error fetching climate info:", error));
    }

    function displayClimateInfo(data, cityName) {
        console.log("Climate data received:", data); // Debugging line
        if (climateInfoDiv) {
            climateInfoDiv.innerHTML = `<h3>Climate Information for ${cityName}</h3>`;
            // Extract and display relevant climate information from the data
            // Example: climateInfoDiv.innerHTML += `<p>Average Temperature: ${data.categories[0].data[0].float_value} °C</p>`;
        }
    }

    function fetchFiveDayForecast(cityName) {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${openWeatherApiKey}&units=imperial`;
        fetch(forecastUrl)
            .then(response => response.json())
            .then(data => displayFiveDayForecast(data))
            .catch(error => console.error("Error fetching 5-day forecast:", error));
    }

    function displayFiveDayForecast(data) {
        forecastDiv.innerHTML = "";
        for (let i = 0; i < data.list.length; i += 8) {
            const dayData = data.list[i];
            const dayDiv = document.createElement("div");
            dayDiv.className = "forecast-day";
            const description = capitalizeWeatherDescription(dayData.weather[0].description);
            dayDiv.innerHTML = `
                <h4>${new Date(dayData.dt * 1000).toLocaleDateString()}</h4>
                <img src="http://openweathermap.org/img/wn/${dayData.weather[0].icon}.png" alt="Weather icon">
                <p>Temp: ${dayData.main.temp} °F</p>
                <p>${description}</p>
            `;
            forecastDiv.appendChild(dayDiv);
        }
    }

    function capitalizeWeatherDescription(description) {
        return description.split(' ')
                         .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                         .join(' ');
    }

    function fetchLifeQualityData(cityName) {
        const citySlug = cityName.toLowerCase().replace(/ /g, '-');
        const apiUrl = `https://api.teleport.org/api/urban_areas/slug:${citySlug}/scores/`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayLifeQualityData(data, cityName))
            .catch(error => console.error("Error fetching life quality data:", error));
    }

    function displayLifeQualityData(data, cityName) {
        lifeQualityDiv.innerHTML = `<h3>Life Quality in ${cityName}</h3>`;
        lifeQualityDiv.innerHTML += `<p>${data.summary}</p>`;
        // Add more details from the data as required
    }

    function addCityToSearchHistory(cityName) {
        const cityElem = document.createElement("div");
        cityElem.textContent = cityName;
        cityElem.className = "search-history-item";
        searchHistoryDiv.appendChild(cityElem);
    }
});






