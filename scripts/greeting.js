window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

function getLocalStorage() {
  const name = document.querySelector(".name");
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  } else name.value = "";
}

function setLocalStorage() {
  const name = document.querySelector(".name");
  localStorage.setItem("name", name.value);
}

function greeting() {
  const date = new Date();
  const hours = date.getHours();
  const timeOfDay = ["morning", "day", "evening", "night"];
  const greetingText = document.querySelector(".greeting");
  if (hours >= 6 && hours < 12) {
    greetingText.innerHTML = `Good ${timeOfDay[0]}`;
  }
  if (hours >= 12 && hours < 18) {
    greetingText.innerHTML = `Good ${timeOfDay[1]}`;
  }
  if (hours >= 18) {
    greetingText.innerHTML = `Good ${timeOfDay[2]}`;
  }
  if (hours >= 00 && hours < 6) {
    greetingText.innerHTML = `Good ${timeOfDay[3]}`;
  }
  setTimeout(greeting, 10000);
}

greeting();
