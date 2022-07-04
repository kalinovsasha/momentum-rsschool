const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');


function showTime() {
  const date = new Date();
  const options = {month: 'long', day: 'numeric', timeZone: 'UTC'};
  const currentDate = date.toLocaleDateString('ru-RU', options);
  timeEl.innerHTML=(date.toLocaleTimeString());
  dateEl.innerHTML=(currentDate)
  setTimeout(showTime, 1000);
}
showTime();