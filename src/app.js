//challenge 1

function formatDate(date) {
  date = now.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = days[now.getDay()];
  dayTime.innerHTML = `${day}, ${hours}:${minutes}`;
}
let now = new Date();
let dayTime = document.querySelector("#day-time");
formatDate(now);

//challenge 2
function enterCity(event) {
  event.preventDefault();
  let yourCity = document.querySelector("#your-city");
  let outputYourCity = document.querySelector("#output-your-city");
  outputYourCity.innerHTML = `${yourCity.value}`;
  let apiKey = "1f7d718732971691e372ab10efbe3a34";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${yourCity.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
let cityForm = document.querySelector("#enter-your-city");
cityForm.addEventListener("submit", enterCity);

//challenge 3

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1f7d718732971691e372ab10efbe3a34";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#temperature-now");
  tempNow.innerHTML = `${temperature}°C`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let location = document.querySelector("#output-your-city");
  location.innerHTML = `${response.data.name}`;
  let humidityNow = Math.round(response.data.main.humidity);
  let humidityHere = document.querySelector("#humidity");
  humidityHere.innerHTML = `Humidity: ${humidityNow}%`;
  let windNow = document.querySelector("#wind");
  windNow.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}mph`;
  let descriptionNow = document.querySelector("#description");
  descriptionNow.innerHTML = response.data.weather[0].main;
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
navigator.geolocation.getCurrentPosition(handlePosition);

function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", findLocation);
