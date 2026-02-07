document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audio");
    const vinyl = document.getElementById("vinyl");
    const needle = document.getElementById("needle");
    const playlistEl = document.getElementById("playlist");
    const playBtn = document.getElementById("playBtn");
    const pauseBtn = document.getElementById("pauseBtn");

    /* 🎶 COUNTRY / 70s / 80s — Links Diretos Corrigidos */
    const tracks = [
        {
            title: "Johnny Cash – Ring of Fire",
            url: "https://archive.org/download/16-biggest-hits_202302/06%20Ring%20Of%20Fire.mp3"
        },
        {
            title: "Willie Nelson – On The Road Again",
            url: "https://archive.org/download/outlaw-country/Willie%20Nelson%20On%20The%20Road%20Again.mp3"
        },
        {
            title: "Dolly Parton – Jolene",
            url: "https://archive.org/download/DOLLY_PARTON_Jolene_1974/DOLLY_PARTON_Jolene_1974.mp4" 
        },
        {
            title: "Kenny Rogers – The Gambler",
            url: "https://archive.org/download/ka-kenny-rogers/LP%20Albums/K/Kenny%20Rogers/01.%20The%20gambler.mp3"
        }
    ];

    let currentTrack = 0;

    /* PLAYLIST */
    tracks.forEach((track, index ) => {
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
        if (playlistEl.children[currentTrack]) {
            playlistEl.children[currentTrack].classList.add("active");
        }
    }

    /* CORE */
    function loadAndPlay() {
        audio.src = tracks[currentTrack].url;
        audio.load(); // Importante: força o carregamento do novo link
        
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Aguardando interação do usuário para iniciar o áudio.");
            });
        }
        highlight();
    }

    /* CONTROLS */
    playBtn.addEventListener("click", () => {
        if (!audio.src) {
            loadAndPlay();
        } else {
            audio.play();
        }
    });

    pauseBtn.addEventListener("click", () => {
        audio.pause();
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
