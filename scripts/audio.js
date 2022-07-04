const player = {
  playPrevBtn: document.querySelector('.play-prev'),
  playNextBtn: document.querySelector('.play-next'),
  playBtn:document.querySelector('.play-pause'),
  audio : new Audio('./assets/sounds/Aqua_Caelestis.mp3'),
  isPlayed:false,
  currSongIndex:0,
  playlist:[
    {
    url:'./assets/sounds/Aqua_Caelestis.mp3',
    name:'Aqua Caelestis'
  },
  {
    url:'./assets/sounds/Ennio_Morricone.mp3',
    name:'Ennio Morricone'
  },
  {
    url:'./assets/sounds/RiverFlowsInYou.mp3',
    name:'River Flows In You'
  },
  {
    url:'./assets/sounds/SummerWind.mp3',
    name:'Summer Wind'
  }],
  playAudio() {
    //this.audio.src = src
    //this.audio.currentTime = 0;
    //console.log(this.audio.duration);
    //console.log(this.audio.currentTime);
    //console.log(this.audio.ended);
    
    if(!this.isPlayed){
      this.isPlayed=true;
      this.audio.play();
      this.playBtn.classList.toggle('play');
      this.playBtn.classList.add('pause');
    } else {
      this.isPlayed=false;
      this.playBtn.classList.add('play');
      this.playBtn.classList.remove('pause');
      this.audio.pause();
    }
  },

  playPrev (){
    if(this.currSongIndex>0){
      this.currSongIndex--;
      this.audio.src=this.playlist[this.currSongIndex].url;
      this.audio.play();
      this.isPlayed=true;
      this.playBtn.classList.toggle('play');
      this.playBtn.classList.add('pause');
    } else {
      this.currSongIndex=this.playlist.length;
      this.audio.src=this.playlist[this.currSongIndex].url;
      this.audio.play();
      this.isPlayed=true;
      this.playBtn.classList.toggle('play');
      this.playBtn.classList.add('pause');
    }
  },

  playNext (){
    if(this.currSongIndex<this.playlist.length){
      this.currSongIndex++;
      this.isPlayed=true;
      this.audio.src=this.playlist[this.currSongIndex].url;
      this.audio.play();
      this.playBtn.classList.toggle('play');
      this.playBtn.classList.add('pause');
    } else {
      this.currSongIndex=0;
      this.audio.src=this.playlist[this.currSongIndex].url;
      this.audio.play();
      this.isPlayed=true;
      this.playBtn.classList.toggle('play');
      this.playBtn.classList.add('pause');
    }
  },

  playerInit(){
    let list=``;
    this.audio.addEventListener("ended",()=>this.playNext());
    this.playBtn.addEventListener("click", ()=>{
      this.playAudio()});
    this.playPrevBtn.addEventListener("click", ()=>{
      this.playPrev()});
    this.playNextBtn.addEventListener("click", ()=>{
        this.playNext()});
      // Рисование плейлиста
    for(let i=0; i<this.playlist.length;i++){
      list+=`<li class="song" id="song${i}">${this.playlist[i].name}</li>\n`
    }
    document.querySelector('.play-list').innerHTML=list;
    //Переключение по нажатию на песни
    for(let i=0; i<this.playlist.length;i++){
      document.getElementById(`song${i}`).addEventListener('click',()=>{
        this.audio.src =this.playlist[i].url;
        this.currSongIndex=i;
        this.audio.play()
        this.isPlayed=true;
        this.playBtn.classList.toggle('play');
        this.playBtn.classList.add('pause');
      })
    }
  }
}

player.playerInit()



