slider = {
  baseUrl:'./assets/img',
  timeOfDay:["morning","day","evening","night"],
  rnd:1,

   setBg() { 
    const date = new Date();
    const hours = date.getHours(); 
    const img = new Image();
    if(hours>=5 && hours<13){
      img.src =`${this.baseUrl}/${this.timeOfDay[0]}/${this.rnd}.jpg`;
    }
    if(hours>=13 && hours<19){
      img.src =`${this.baseUrl}/${this.timeOfDay[1]}/${this.rnd}.jpg`;
    }
    if(hours>=19){
      img.src =`${this.baseUrl}/${this.timeOfDay[2]}/${this.rnd}.jpg`;
    }
    if(hours>=00 && hours<5){
      img.src =`${this.baseUrl}/${this.timeOfDay[3]}/${this.rnd}.jpg`;
    }
    
    img.onload = () => {    
      //console.log(img);  
      document.body.style.backgroundImage = `url(${img.src})`;
    } ;
  },

  slidePrev(){
    if(this.rnd>1){
      this.rnd--;
      this.setBg();
    } else {
      this.rnd=10;
      this.setBg();
    }
  },

  slideNext(){
    if(this.rnd<10){
      this.rnd++;
      this.setBg();
      
    } else {
      this.rnd=1;
      this.setBg();
    }
  },

  init(){
    this.rnd= Math.ceil(Math.random()*10);
    this.setBg();
  }
}

slider.init();
document.querySelector('.slide-prev').addEventListener('click',slider.slidePrev.bind(slider));
document.querySelector('.slide-next').addEventListener('click',slider.slideNext.bind(slider));
