class Clock {
  constructor(lang){
    this.lang=lang;
  }
  showTime() {
    const timeEl = document.querySelector(".time");
    const dateEl = document.querySelector(".date");
    const date = new Date();
    const options = { month: "long", day: "numeric", timeZone: "UTC" };
    const currentDate = date.toLocaleDateString(this.lang, options);
    timeEl.innerHTML = date.toLocaleTimeString();
    dateEl.innerHTML = currentDate;
    setTimeout(() => this.showTime(this.lang), 1000);
  }
  changeLang(lang){
    this.lang=lang;
  }
}
