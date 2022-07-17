slider = {
  baseUrl:
    "https://raw.githubusercontent.com/kalinovsasha/rss-momentum-assets/master/images/",
  timeOfDay: ["morning", "day", "evening", "night"],
  rnd: 01,

  setBg() {
    const date = new Date();
    const hours = date.getHours();
    const img = new Image();
    this.rnd = this.rnd < 10 ? "0" + this.rnd.toString() : this.rnd;
    if (hours >= 5 && hours < 13) {
      img.src = `${this.baseUrl}/${this.timeOfDay[0]}/${this.rnd}.jpg`;
    }
    if (hours >= 13 && hours < 19) {
      img.src = `${this.baseUrl}/${this.timeOfDay[1]}/${this.rnd}.jpg`;
    }
    if (hours >= 19) {
      img.src = `${this.baseUrl}/${this.timeOfDay[2]}/${this.rnd}.jpg`;
    }
    if (hours >= 00 && hours < 5) {
      img.src = `${this.baseUrl}/${this.timeOfDay[3]}/${this.rnd}.jpg`;
    }

    img.onload = () => {
      document.body.style.backgroundImage = `url(${img.src})`;
    };
  },

  slidePrev() {
    if (this.rnd > 1) {
      this.rnd--;
      this.setBg();
    } else {
      this.rnd = 20;
      this.setBg();
    }
  },

  slideNext() {
    if (this.rnd < 20) {
      this.rnd++;
      this.setBg();
    } else {
      this.rnd = 1;
      this.setBg();
    }
  },

  init() {
    this.rnd = Math.ceil(Math.random() * 20);
    this.setBg();
  },
};



slider.init();
document
  .querySelector(".slide-prev")
  .addEventListener("click", slider.slidePrev.bind(slider));
document
  .querySelector(".slide-next")
  .addEventListener("click", slider.slideNext.bind(slider));


