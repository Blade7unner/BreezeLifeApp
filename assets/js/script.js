const openWeatherApiKey = 'c82895bdc50b848e2df6533322b114cb'; // API key

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const currentWeatherDiv = document.getElementById("currentWeather");
    const cityInfoDiv = document.getElementById("cityInfo");
    const searchHistoryDiv = document.getElementById("searchHistory");

    searchButton.addEventListener("click", () => {
        const cityName = searchInput.value.trim();
        if (cityName) {
            fetchWeather(cityName);
            fetchCityInfo(cityName);
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
            })
            .catch(error => {
                console.error("Error fetching city info:", error);
                displayMessage("City information not available.");
            });
    }

    function displayCityInfo(data, cityName) {
        cityInfoDiv.innerHTML = `<h3>Quality of Life in ${cityName}</h3>`;
        // Add more details from the data as required
    }

    function addCityToSearchHistory(cityName) {
        const cityElem = document.createElement("div");
        cityElem.textContent = cityName;
        cityElem.className = "search-history-item";
        searchHistoryDiv.appendChild(cityElem);
    }
});





 


