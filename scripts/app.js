const ru = ["ru", "ru-Ru", "dbRu.json"];
const en = ["en", "en-En", "dbEn.json"];
const langSet = document.getElementById("lang");
langSet.addEventListener("change", () => langChanger(langSet.value));

const weather = new Weather("en");
const clock = new Clock("en-En");
const greeting = new Greeting("en");

if (localStorage.getItem("lang")) {
  langSet.value = localStorage.getItem("lang");
  langChanger(localStorage.getItem("lang"));
}

greeting.greeting();
clock.showTime();
const player = new Player('player',playlist);

function langChanger(lang) {
  if (lang == "ru") {
    clock.changeLang("ru-Ru");
    greeting.setLang("ru");
    quotes.init(ru[2]);
    weather.setLang("ru");
    localStorage.setItem("lang", langSet.value);
    document.querySelector('.lang-txt').textContent='Язык: '
  } else {
    clock.changeLang("en-En");
    greeting.setLang("en");
    quotes.init(en[2]);
    weather.setLang("en");
    document.querySelector('.lang-txt').textContent='Language: '
  }
  clock.showTime();
  greeting.greeting();
  weather.getWeather();
  localStorage.setItem("lang", langSet.value);
}
