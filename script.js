const apiKey = "b8a095ce896dd84f7fb1004a598c8919";

const baseURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");
const error = document.querySelector(".error");
const weatherMain = document.querySelector(".weather");

async function checkWeather(city) {
  const response = await fetch(baseURL + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    error.style.display = "block";
    weatherMain.style.display = "none";
  } else {
    const data = await response.json();

    const cityName = document.querySelector(".city-name");
    cityName.innerHTML = data.name;

    const temp = document.querySelector(".temp");
    temp.innerHTML = Math.round(data.main.temp) + "°C";

    const humidity = document.querySelector(".humidity");
    humidity.innerHTML = data.main.humidity + " %";

    const wind = document.querySelector(".wind");
    wind.innerHTML = data.wind.speed + " Km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/cloud.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow.png";
    } else if (data.weather[0].main == "Fog") {
      weatherIcon.src = "images/cloud.png";
    }

    error.style.display = "none";
    weatherMain.style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
