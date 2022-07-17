playlist = [
  {
    url: "./assets/sounds/sector.mp3",
    name: "Сектор Газа",
  },
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
  {
    url: "./assets/sounds/ghostBC.mp3",
    name: "ghost BC",
  },
];

class Player{
  constructor(root,playlist=""){
    this.playlist=playlist;
    this.isPlayed=false;
    this.isMuted=false;
    this.prevSong=0;
    this.curentSong=0;
    this.root=document.getElementById(root);
    this.song=new Audio;
    const container=new ElementCreator(this.root,'div',['player']);
    const controls=new ElementCreator(container.element,'div',['player__controls']);
    this.prevBtn=new ElementCreator(controls.element,'div',['player__control', 'prev']);
    this.playBtn=new ElementCreator(controls.element,'div',['player__control', 'play']);
    this.nextBtn=new ElementCreator(controls.element,'div',['player__control', 'next']);
    this.volume=new ElementCreator(controls.element,'input',['volume']);
    this.volume.element.setAttribute('type', 'range');
    this.volume.element.setAttribute('id', 'volume');
    this.muteBtn=new ElementCreator(controls.element,'div',['player__control', 'notMute']);
    this.trackName=new ElementCreator(container.element,'div',['player__trackName']);
    this.progressContainer=new ElementCreator(container.element,'div',['player__progress']);
    this.progressDone=new ElementCreator(this.progressContainer.element,'div',['player__progress__done']);
    const progressDoneCircle=new ElementCreator(this.progressDone.element,'div',['player__progress__circle']);
    this.progressTime=new ElementCreator(container.element,'div',['player__progress__time']);
    this.progressTime.element.innerText=""
    const songList=new ElementCreator(container.element,'ul',['player__songList']);
    let songs=``;
    // Отрисовка плейлиста
    for(let i=0;i<this.playlist.length;i++){
      songs+=`<li class="songs song${i}">${this.playlist[i].name}</li>`
    }
    songList.element.innerHTML=songs;
    for(let i=0;i<this.playlist.length;i++){
      document.querySelector(`.song${i}`).addEventListener('click',()=>{
        document.querySelector(`.song${this.prevSong}`).classList.remove("played")
        document.querySelector(`.song${i}`).classList.add("played")
        this.curentSong=i;
        this.prevSong=this.curentSong;
        this.song.src=this.playlist[i].url;
        this.trackName.element.textContent=this.playlist[this.curentSong].name;
        this.song.play();
        this.isPlayed=true;
        this.playBtn.element.classList.remove('play');
        this.playBtn.element.classList.add('pause');
      })
    }

    // Play btn
    this.song.src=playlist[0].url;
    this.playBtn.element.onclick=()=>{
      document.querySelector(`.song${this.prevSong}`).classList.remove("played");
      document.querySelector(`.song${this.curentSong}`).classList.add("played");
      this.play.apply(this);
    }
    this.nextBtn.element.onclick=()=>{
      if(this.curentSong<this.playlist.length-1){
        this.curentSong++;
        document.querySelector(`.song${this.prevSong}`).classList.remove("played");
        document.querySelector(`.song${this.curentSong}`).classList.add("played");
        this.prevSong=this.curentSong;
        this.song.src=this.playlist[this.curentSong].url;
        this.isPlayed=false; // Костыль
        this.play();
      }else {
        this.curentSong=0;
        document.querySelector(`.song${this.prevSong}`).classList.remove("played");
        document.querySelector(`.song${this.curentSong}`).classList.add("played");
        this.prevSong=this.curentSong;
        this.song.src=this.playlist[this.curentSong].url;
        this.isPlayed=false; // Костыль
        this.play();
      }
    }

    this.prevBtn.element.onclick=()=>{
      if(this.curentSong>0){
        this.curentSong--;
        document.querySelector(`.song${this.prevSong}`).classList.remove("played");
        document.querySelector(`.song${this.curentSong}`).classList.add("played");
        this.prevSong=this.curentSong;
        this.song.src=this.playlist[this.curentSong].url;
        this.isPlayed=false; // Костыль
        this.play();
      }else {
        this.curentSong=this.playlist.length-1;
        document.querySelector(`.song${this.prevSong}`).classList.remove("played");
        document.querySelector(`.song${this.curentSong}`).classList.add("played");
        this.prevSong=this.curentSong;
        this.song.src=this.playlist[this.curentSong].url;
        this.isPlayed=false; // Костыль
        this.play();
      }
    }

    // Volume
    this.volume.element.value=Math.ceil(this.song.volume*100);
    this.volume.element.addEventListener('change',()=>this.song.volume=this.volume.element.value/100);
    // MuteBtn
    this.muteBtn.element.onclick=()=>this.mute.apply(this);
    //
    this.trackName.element.textContent=this.playlist[this.curentSong].name;
    // Progress
    this.progressContainer.element.addEventListener('click',(e)=>this.song.currentTime=this.song.duration*e.offsetX/this.progressContainer.element.clientWidth)
    this.song.addEventListener('timeupdate',()=>{
      this.progressDone.element.style.width=`${this.song.currentTime/this.song.duration*100}%`
      this.progressTime.element.textContent=`${Math.floor(this.song.currentTime/60)}:${Math.floor(this.song.currentTime%60)}/${Math.floor(this.song.duration/60)}:${Math.floor(this.song.duration%60)}`
    })
    this.song.addEventListener('ended',()=>this.nextSong.call(this))
  }
  

  play(){
    if(!this.isPlayed){
      this.song.play();
      this.isPlayed=true;
      this.playBtn.element.classList.remove('play');
      this.playBtn.element.classList.add('pause');
    }else {
      this.song.pause();
      this.isPlayed=false;
      this.playBtn.element.classList.add('play');
      this.playBtn.element.classList.remove('pause');
    }
    this.trackName.element.textContent=this.playlist[this.curentSong].name;
  }
  mute(){
    if(!this.isMuted){
      this.song.volume=0;
      this.isMuted=true;
      this.muteBtn.element.classList.remove('notMute');
      this.muteBtn.element.classList.add('mute');
    }else {
      this.song.volume=this.volume.element.value/100;
      this.isMuted=false;
      this.muteBtn.element.classList.remove('mute');
      this.muteBtn.element.classList.add('notMute');
    }
  
  }
  nextSong(){
    if(this.curentSong<this.playlist.length-1){
      this.curentSong++;
      document.querySelector(`.song${this.prevSong}`).classList.remove("played");
      document.querySelector(`.song${this.curentSong}`).classList.add("played");
      this.prevSong=this.curentSong;
      this.song.src=this.playlist[this.curentSong].url;
      this.isPlayed=false; // Костыль
      this.play();
    }else {
      this.curentSong=0;
      document.querySelector(`.song${this.prevSong}`).classList.remove("played");
      document.querySelector(`.song${this.curentSong}`).classList.add("played");
      this.prevSong=this.curentSong;
      this.song.src=this.playlist[this.curentSong].url;
      this.isPlayed=false; // Костыль
      this.play();
    }
  }
}

//const player = new Player('root',playlist);
