


class Greeting {
  constructor(lang) {
    this.lang = lang;
    window.addEventListener("beforeunload", this.setLocalStorage);
    window.addEventListener("load", this.getLocalStorage);
  }
  getLocalStorage() {
    const name = document.querySelector(".name");
    if (localStorage.getItem("name")) {
      name.value = localStorage.getItem("name");
    } else name.value = "";
  }

  setLocalStorage() {
    const name = document.querySelector(".name");
    localStorage.setItem("name", name.value);
  }

  greeting() {
    const date = new Date();
    const hours = date.getHours();
    const timeOfDay = ["morning", "day", "evening", "night"];
    const timeOfDayRu = ["утро", "день", "вечер", "ночи"];
    const greetingText = document.querySelector(".greeting");

    if (this.lang === "en") {
      if (hours >= 6 && hours < 12) {
        greetingText.innerHTML = `Good ${timeOfDay[0]}`;
      }
      if (hours >= 12 && hours < 18) {
        greetingText.innerHTML = `Good ${timeOfDay[1]}`;
      }
      if (hours >= 18) {
        greetingText.innerHTML = `Good ${timeOfDay[2]}`;
      }
      if (hours >= 0 && hours < 6) {
        greetingText.innerHTML = `Good ${timeOfDay[3]}`;
      }
    } else {
      if (hours >= 6 && hours < 12) {
        greetingText.innerHTML = `Доброе ${timeOfDayRu[0]}`;
      }
      if (hours >= 12 && hours < 18) {
        greetingText.innerHTML = `Добрый ${timeOfDayRu[1]}`;
      }
      if (hours >= 18) {
        greetingText.innerHTML = `Добрый ${timeOfDayRu[2]}`;
      }
      if (hours >= 0 && hours < 6) {
        greetingText.innerHTML = `Доброй ${timeOfDayRu[3]}`;
      }
    }
    setTimeout(() => this.greeting(this.lang), 10000);
  }
  setLang(lang){
    this.lang=lang;
  }
}
