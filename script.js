const apiKey = "d233bd5973bcc340317c393afe7853ff";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";


const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const cityName = document.getElementById("cityName");
const description = document.getElementById("description");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");



const weatherBackgrounds = {
  Clear: "url('clear_sky.jpg')",
  Clouds: "url('cloudy.jpg')",
  Rain: "url('rainy.jpg')",
  Snow: "url('snowy.jpg')",
  Thunderstorm: "url('thunderstorm.jpg')",
  Mist: "url('mist.jpg')",
};

function fetchWeather(query) {
  fetch(`${apiUrl}?${query}&units=metric&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => updateUI(data))
    .catch((error) => console.error("Error fetching weather:", error));
}

function updateUI(data) {
  if (data.cod !== 200) {
    alert("City not found!");
    return;
  }
  
  const weatherCondition = data.weather[0].main;
  document.body.style.backgroundImage = weatherBackgrounds[weatherCondition] || "url('weather.jpg')";
  
  cityName.textContent = data.name + ", " + data.sys.country;
  description.textContent = data.weather[0].description;
  temperature.textContent = data.main.temp;
  feelsLike.textContent = data.main.feels_like;
  humidity.textContent = data.main.humidity;
  windSpeed.textContent = data.wind.speed;
  sunrise.textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  sunset.textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
}

function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(`lat=${latitude}&lon=${longitude}`);
      },
      (error) => {
        alert("Unable to fetch location. Please search manually.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(`q=${city}`);
  } else {
    alert("Please enter a city name!");
  }
});


cityInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) {
      fetchWeather(`q=${city}`);
    } else {
      alert("Please enter a city name!");
    }
  }
});


window.onload = getCurrentLocationWeather;
