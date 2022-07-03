const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const cityEl = document.querySelector('.city');


cityEl.addEventListener('blur',()=>getWeather(cityEl.value));
window.addEventListener('beforeunload', setCityLocalStorage)
window.addEventListener('load', getCityLocalStorage)
setCity()



async function getWeather(city='Гродно') { 
  const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=30553990b6cf3eb6a168aefb3ad6ebb5&units=metric`
  const res = await fetch(url);
  const data = await res.json(); 
  console.log(data);
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent=`Wind speed ${data.wind.speed} m/s`;
  humidity.textContent=`Humidity ${data.main.humidity} %`;
}

function setCity(){
  if(document.querySelector('.city').value){
    getWeather(document.querySelector('.city').value)
  } else {
    document.querySelector('.city').value="Гродно"
    getWeather("Гродно")
  }
}

function getCityLocalStorage() {
  const city = document.querySelector('.city');
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  } else city.value = "Гродно";
  }

  function setCityLocalStorage() {
    const city = document.querySelector('.city');
    localStorage.setItem('city', city.value);
  }
 