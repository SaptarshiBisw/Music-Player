const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// music
const songs = [
    {
        name : 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Dante',
    },
    {
        name : 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Dante',
    },
    {
        name : 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Dante',
    },
    {
        name : 'metric-1',
        displayName: 'Front Row',
        artist: 'Dante',
    },
    {
        name : 'popstar',
        displayName: 'Popstar',
        artist: 'Drake',
    },
    {
        name : 'style',
        displayName: 'Style',
        artist: 'Taylor Swift',
    },
]

// check if playing
let isPlaying = false;

// play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

// pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'pause');
    music.pause();
}

// play or pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//current song
let songIndex = 0;

//Prev song
function prevSong () {
    songIndex--;
    if (songIndex < 0) {
        songIndex= songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Next song
function nextSong () {
    songIndex++;
    if (songIndex > songs.length -1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//on load-select first song
loadSong(songs[songIndex]);

// Update progress bar and time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime} = e.srcElement;
        // update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //calculate duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        //delay switching duration fpr NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        //calculate current
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

//Set progress bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime= (clickX / width) * duration;
}

//event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);