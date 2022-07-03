const player = {
  playPrevBtn: document.querySelector('.play-prev'),
  playNextBtn: document.querySelector('.play-next'),
  playBtn:document.querySelector('.play-pause'),
  audio : new Audio('../assets/sounds/Aqua_Caelestis.mp3'),
  isPlayed:false,
  currSong:`../assets/sounds/Aqua_Caelestis.mp3`,
  playlist:[
    {
    url:'../assets/sounds/Aqua_Caelestis.mp3',
    name:'Aqua Caelestis'
  },
  {
    url:'../assets/sounds/Ennio_Morricone.mp3',
    name:'Ennio Morricone'
  },
  {
    url:'../assets/sounds/RiverFlowsInYou.mp3',
    name:'River Flows In You'
  },
  {
    url:'../assets/sounds/SummerWind.mp3',
    name:'Summer Wind'
  }],
playAudio() {
  //this.audio.src = src
  //this.audio.currentTime = 0;
  console.log(this.audio.duration);
  console.log(this.audio.currentTime);
  console.log(this.audio.ended);
  
  if(!this.isPlayed){
    this.isPlayed=true;
    this.audio.play();
    this.playBtn.classList.remove('play');
    this.playBtn.classList.add('pause');
  } else {
    this.isPlayed=false;
    this.playBtn.classList.add('play');
    this.playBtn.classList.remove('pause');
    this.audio.pause();
  }
},

playerInit(){
  let list=``
  this.playBtn.addEventListener("click", ()=>{
    this.playAudio(this.playlist[0].url)});
  // Рисование плейлиста
  for(let i=0; i<this.playlist.length;i++){
    list+=`<li id="song${i}">${this.playlist[i].name}</li>\n`
  }
  document.querySelector('.play-list').innerHTML=list;
  //Переключение по кнопкам
  for(let i=0; i<this.playlist.length;i++){
    document.getElementById(`song${i}`).addEventListener('click',()=>{
      console.error(this);
      this.audio.src =this.playlist[i].url;
      this.audio.play()
      this.isPlayed=true;
     })
  }

}
}

player.playerInit()



