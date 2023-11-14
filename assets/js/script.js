document.addEventListener("DOMContentLoaded",() => {
    const cityInput = document.getElementById("cityInput");
    const searchButton = document.getElementById("searchButton");
    const weatherImage = document.getElementById("weatherImage");
    const weatherInfo = document.getElementById("weatherInfo")
    const forecast = document.getElementById("forecast");



    fetch('https://api.teleport.org/api/')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
  
    // Event listener for the search button
    searchButton.addEventListener("click"), () => {
        const cityName = cityInput.value;
        // Make API request and update the HTML elements with the fetched data
        // Openweather API and Teleport API here 


    };
});