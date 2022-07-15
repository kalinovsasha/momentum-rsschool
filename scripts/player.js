playlist = [
  {
    url: "./assets/sounds/Aqua_Caelestis.mp3",
    name: "Aqua Caelestis",
  },
  {
    url: "./assets/sounds/Ennio_Morricone.mp3",
    name: "Ennio Morricone",
  },
  {
    url: "./assets/sounds/RiverFlowsInYou.mp3",
    name: "River Flows In You",
  },
  {
    url: "./assets/sounds/SummerWind.mp3",
    name: "Summer Wind",
  },
];


class ElementCreator {
  constructor(parent, tag = 'div,', styles, content = '') {
      (this.parent = parent), (this.tag = tag);
      this.styles = styles;
      this.content = content;
      this.element = document.createElement(`${tag}`);
      if (this.styles !== null) {
        this.element.classList.add(...this.styles);
      }
      this.element.innerText = this.content;
      if (parent !== null) {
          this.parent?.append(this.element);
      } else {
          document.body.append(this.element);
      }
  }
}

class Player{
  constructor(root,playlist=""){
    this.isPlayed=false;
    this.root=document.getElementById(root);
    this.currSong=new Audio;
    const container=new ElementCreator(this.root,'div',['player']);
    const controls=new ElementCreator(container.element,'div',['player__controls']);
    const prev=new ElementCreator(controls.element,'div',['player__control', 'prev']);
    this.playBtn=new ElementCreator(controls.element,'div',['player__control', 'play']);
    const next=new ElementCreator(controls.element,'div',['player__control', 'next']);
    this.volume=new ElementCreator(controls.element,'input',['volume']);
    this.volume.element.setAttribute('type', 'range');
    this.volume.element.setAttribute('id', 'volume');
    const mute=new ElementCreator(controls.element,'div',['player__control', 'notMute']);
    const trackName=new ElementCreator(container.element,'div',['player__trackName']);
    trackName.element.textContent="";
    const progressContainer=new ElementCreator(container.element,'div',['player__progress']);
    const progressDone=new ElementCreator(progressContainer.element,'div',['player__progress__done']);
    const progressDoneCircle=new ElementCreator(progressDone.element,'div',['player__progress__circle']);
    const progressTime=new ElementCreator(container.element,'div',['player__progress__time']);
    progressTime.element.innerText="1"
    const songList=new ElementCreator(container.element,'div',['player__songList']);

    this.currSong.src=playlist[0].url;
    this.playBtn.element.onclick=this.play.bind(this);
    this.volume.element.value=Math.ceil(this.currSong.volume*100);
    this.volume.element.addEventListener('change',()=>this.currSong.volume=this.volume.element.value/100);
    console.log(this.currSong.volume);
  }
  
  play(){
    if(!this.isPlayed){
      this.currSong.play();
      this.isPlayed=true;
      this.playBtn.element.classList.remove('play');
      this.playBtn.element.classList.add('pause');
    }else {
      this.currSong.pause();
      this.isPlayed=false;
      this.playBtn.element.classList.add('play');
      this.playBtn.element.classList.remove('pause');
    }
  }

}



const player = new Player('root',playlist);
