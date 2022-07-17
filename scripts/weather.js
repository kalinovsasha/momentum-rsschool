class Weather {
  constructor(lang = "en") {
    this.weatherIcon = document.querySelector(".weather-icon");
    this.temperature = document.querySelector(".temperature");
    this.wind = document.querySelector(".wind");
    this.humidity = document.querySelector(".humidity");
    this.weatherDescription = document.querySelector(".weather-description");
    this.cityEl = document.querySelector(".city");
    this.lang = lang;
    this.city = "Минск";

    this.cityEl.addEventListener("blur", () => {
      this.city = this.cityEl.value;
      this.getWeather();
    });
    window.addEventListener(
      "beforeunload",
      this.setCityLocalStorage.bind(this)
    );
    window.addEventListener("load", this.getCityLocalStorage.bind(this));
  }

  async getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&lang=${this.lang}&appid=30553990b6cf3eb6a168aefb3ad6ebb5&units=metric`;
    let res = await fetch(url);
    let data = await res.json();
    if (data.cod == 200) {
      this.weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      this.temperature.textContent = `${Math.ceil(data.main.temp)}°C`;
      this.weatherDescription.textContent = data.weather[0].description;
      if (this.lang == "en") {
        this.wind.textContent = `Wind speed ${Math.ceil(data.wind.speed)} m/s`;
        this.humidity.textContent = `Humidity ${Math.ceil(
          data.main.humidity
        )} %`;
      } else {
        this.wind.textContent = `Скорость ветра ${Math.ceil(
          data.wind.speed
        )} м/с`;
        this.humidity.textContent = `Влажность ${Math.ceil(
          data.main.humidity
        )} %`;
      }
      this.setCityLocalStorage();
    } else {
      document.querySelector(".city").value = "Ошибка";
      this.temperature.textContent = ``;
      this.weatherDescription.textContent = "Не верно введен город";
      this.wind.textContent = "";
      this.humidity.textContent = ``;
    }
  }

  setCity() {
    if (document.querySelector(".city").value) {
      this.city = document.querySelector(".city").value;
      this.getWeather();
    } else {
      document.querySelector(".city").value = "Минск";
      this.city = "Минск";
      this.getWeather();
    }
  }

  getCityLocalStorage() {
    const city = document.querySelector(".city");
    if (localStorage.getItem("city")) {
      city.value = localStorage.getItem("city");
      this.city=localStorage.getItem("city");
      this.getWeather();
    } else {
      this.city="Минск";
      city.value = "Минск";}
  }

  setCityLocalStorage() {
    localStorage.setItem("city", this.city);
  }
  setLang(lang) {
    this.lang = lang;
  }
}
