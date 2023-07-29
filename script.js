const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const currentEl = document.getElementById('current-time');
const durationEl=document.getElementById('duration');
const progress = document.getElementById('progress');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');


//music
//array of objects
const songs = [
    {
        name :'Yadav-Brand-2_320(PaglaSongs).mp3',
        displayName:'Yadav Brand 2.0',
        artist:'Elvish Yadav',
        img:'img-1'
    },
    {
        name :'Uddaa Punjab (Udta Punjab).mp3',
        displayName:'Udta Punjab',
        artist:'Sahid Kapoor',
        img:'img-2'
    },
    {
        name :'Maal Piyenge - Ashok Minj [128 Kbps]-(Pagalworld.gay).mp3',
        displayName:'Maal Piyenge',
        artist:'Aman Kalakar',
        img:'img-5'
    },
    {
        name :'desi kalakar.mp3',
        displayName:'Desi Kalakar',
        artist:'Yo Yo Honey Singh',
        img:'img-4'
    },
    {
        name :'Chitta Ve (Udta Punjab).mp3',
        displayName:'chitta Ve',
        artist:'Shahid Kapoor',
        img:'img-2'
    },
    {
        name :'Blue-Eyes_320(PaglaSongs).mp3',
        displayName:'Blue Eyes',
        artist:'Yo Yo Honey Singh',
        img:'img-3'
    },
];
//check the song is playing or not
let isPlaying = false;

//play
function songPlay(){
    isPlaying=true;
    playBtn.classList.replace('fa-play','fa-pause')
    playBtn.setAttribute('title','pause')
    music.play();
}

//pause
function songPause(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play')
    playBtn.setAttribute('title','play')
    music.pause();
}

playBtn.addEventListener('click',()=> (isPlaying?songPause():songPlay()));

//Creating a function that adds the Object values into our DOM elements

function loadSong(song){
    title.textContent = song.displayName;
    title.style.fontSize = 'x-large';
    artist.textContent =  song.artist;
    artist.style.fontSize = 'x-large';
    music.src= `${song.name}`;
    image.src = `${song.img}.JPG`;
}

//current song
let songIndex=0;

//prev Song
function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex  = songs.length-1;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    songPlay();
}

//next Song
function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex= 0;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    songPlay();
}

//calling load song
loadSong(songs[songIndex]);

//Update progess Bar
function updateProgressBar(e){
    if(isPlaying){
        const {currentTime , duration}  = e.srcElement;
        const progressBar = (currentTime/duration)*100;
        progress.style.width = `${progressBar}%`;
        //udate duration time on changing songs
        const durationTimeInMinutes = Math.floor(duration/60);
        // console.log('minutes',durationTimeInMinutes);
        let durationTimeInSeconds = Math.floor(duration%60);
        if(durationTimeInSeconds<10){
            durationTimeInSeconds = `0${durationTimeInSeconds}`;
        }
        // console.log('seconds',durationTimeInSeconds);
        if(durationTimeInSeconds){
            durationEl.textContent=`${durationTimeInMinutes}:${durationTimeInSeconds}`;
        }
        //calculate for current time
        const currentTimeInMinutes = Math.floor(currentTime/60);
        let currentTimeInSeconds = Math.floor(currentTime%60);
        if(currentTimeInSeconds<10){
            currentTimeInSeconds = `0${currentTimeInSeconds}`;
        }
        currentEl.textContent=`${currentTimeInMinutes}:${currentTimeInSeconds}`
    }
}
//set progressBar
function setProgressBar(e){
    const width =this.clientWidth;
    console.log(width);
    const clickX=e.offsetX;
    console.log(clickX)
    const {duration} = music;
    music.currentTime = (clickX/width)*duration;
}
//event listener
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar)