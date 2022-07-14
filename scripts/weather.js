const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const weatherDescription = document.querySelector(".weather-description");
const cityEl = document.querySelector(".city");

cityEl.addEventListener("blur", () => getWeather(cityEl.value));
window.addEventListener("beforeunload", setCityLocalStorage);
window.addEventListener("load", getCityLocalStorage);

async function getWeather(city = "Минск") {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=30553990b6cf3eb6a168aefb3ad6ebb5&units=metric`;
  let res = await fetch(url);
  let data = await res.json();
  if (data.cod == 200) {
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.ceil(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed ${Math.ceil(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity ${Math.ceil(data.main.humidity)} %`;
    setCityLocalStorage();
  } else {
    document.querySelector(".city").value = "Ошибка";
    temperature.textContent = ``;
    weatherDescription.textContent = "Не верно введен город";
    wind.textContent = "";
    humidity.textContent = ``;
  }
}

function setCity() {
  if (document.querySelector(".city").value) {
    getWeather(document.querySelector(".city").value);
  } else {
    document.querySelector(".city").value = "Минск";
    getWeather("Минск");
  }
}

function getCityLocalStorage() {
  const city = document.querySelector(".city");
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
    getWeather(localStorage.getItem("city"));
  } else city.value = "Минск";
}

function setCityLocalStorage() {
  const city = document.querySelector(".city");
  localStorage.setItem("city", city.value);
}
