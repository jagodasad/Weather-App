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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class = "row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <div class = "weather-forecast-date">
            ${formatDay(forecastDay.dt)} </div>
         
            <br />
               <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="70"
        />
<span class = "weather-forecast-temp-max">${Math.round(
          forecastDay.temp.max
        )}°/</span>
 <span class = "weather-forecast-temp-min">${Math.round(
   forecastDay.temp.min
 )}°</span>            
          </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function enterCity(event) {
  event.preventDefault();
  let yourCity = document.querySelector("#your-city");
  let outputYourCity = document.querySelector("#output-your-city");
  outputYourCity.innerHTML = `${yourCity.value}`;

  search(yourCity.value);
}
function search(city) {
  let apiKey = "1f7d718732971691e372ab10efbe3a34";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
let cityForm = document.querySelector("#enter-your-city");
cityForm.addEventListener("submit", enterCity);

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1f7d718732971691e372ab10efbe3a34";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getForecast(coordinates) {
  let apiKey = "1f7d718732971691e372ab10efbe3a34";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#temperature-now");
  tempNow.innerHTML = `${temperature}`;
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
  windNow.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
  let descriptionNow = document.querySelector("#description");
  descriptionNow.innerHTML = response.data.weather[0].main;
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", findLocation);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let tempNow = document.querySelector("#temperature-now");
  tempNow.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let tempNow = document.querySelector("#temperature-now");
  tempNow.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;

search("Los Angeles");
