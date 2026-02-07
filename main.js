

document.addEventListener("DOMContentLoaded", () => {

 






const audio = document.getElementById("audio");
const vinyl = document.getElementById("vinyl");
const needle = document.getElementById("needle");
const playlistEl = document.getElementById("playlist");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");

/* 🎶 COUNTRY / 70s / 80s — Archive.org */
const tracks = [
  {
    title: "Johnny Cash – Ring of Fire",
    url: "https://archive.org/download/JohnnyCashRingOfFire/Johnny%20Cash%20-%20Ring%20Of%20Fire.mp3"
  },
  {
    title: "Willie Nelson – On The Road Again",
    url: "https://archive.org/download/willie-nelson-on-the-road-again/Willie%20Nelson%20-%20On%20The%20Road%20Again.mp3"
  },
  {
    title: "Dolly Parton – Jolene",
    url: "https://archive.org/download/dolly-parton-jolene/Dolly%20Parton%20-%20Jolene.mp3"
  },
  {
    title: "Kenny Rogers – The Gambler",
    url: "https://archive.org/download/kenny-rogers-the-gambler/Kenny%20Rogers%20-%20The%20Gambler.mp3"
  }
];

let currentTrack = 0;

/* PLAYLIST */
tracks.forEach((track, index) => {
  const li = document.createElement("li");
  li.textContent = track.title;
  li.addEventListener("click", () => {
    currentTrack = index;
    loadAndPlay();
  });
  playlistEl.appendChild(li);
});

function highlight() {
  document.querySelectorAll("li").forEach(li => li.classList.remove("active"));
  playlistEl.children[currentTrack].classList.add("active");
}

/* CORE */
function loadAndPlay() {
  audio.src = tracks[currentTrack].url;
  audio.play();
  highlight(); 

}

/* CONTROLS */
playBtn.addEventListener("click", () => {
  if (!audio.src) {
    loadAndPlay(); // garante src + play
  } else {
    audio.play();
  }
});


/* 🎨 SINCRONIZA VISUAL COM ÁUDIO */
audio.addEventListener("play", () => {
  vinyl.classList.add("spin");
  needle.classList.add("active");
});

audio.addEventListener("pause", () => {
  vinyl.classList.remove("spin");
  needle.classList.remove("active");
});

audio.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadAndPlay();
});

/* INICIAL */
audio.src = tracks[currentTrack].url;
highlight();
});