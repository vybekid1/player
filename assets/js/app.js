/// Carousels //

const carousel = [...document.querySelectorAll('.carousel img')];
let carouselImageIndex = 0;

const changeCarousel = () => {
    carousel[carouselImageIndex].classList.toggle('active');
    if (carouselImageIndex >= carousel.length - 1) {
        carouselImageIndex = 0;
    } else {
        carouselImageIndex++;
    }
    carousel[carouselImageIndex].classList.toggle('active');
}
setInterval(() => {
    changeCarousel();
}, 3000)


///Navigations///

///Toggling Music//

const musicPlayer = document.querySelector('.music-player');

let clickCount = 1;
musicPlayer.addEventListener('click', () => {
    if (clickCount >= 2) {
        musicPlayer.classList.add('active');
        clickCount = 1;
        return;
    }
    clickCount++;
    setTimeout(() => {
        clickCount = 1;

    }, 250);
});


///Back  from Active Music Player///

const backToHome = document.querySelector('.music-player .back-btn');

backToHome.addEventListener('click', () => {
    musicPlayer.classList.remove('active');
})


//Access PlayList///

const playlist = document.querySelector('.playlist');
const navBtn = document.querySelector('.music-player .nav-btn');

navBtn.addEventListener('click', () => {
    playlist.classList.add('active')
})

///Back From PlayList///

const backToPlayer = document.querySelector('.playlist .back-btn');
backToPlayer.addEventListener('click', () => {
    playlist.classList.remove('active')
})

///Music///

let currentMusic = 0;

const music = document.querySelector('#audio-source');

const seekBar = document.querySelector('.music-seek-bar');
const songName = document.querySelector('.current-song-name');
const artistName = document.querySelector('.artist');
const coverImage = document.querySelector('.cover');
const currentMusicTime = document.querySelector('.current-time');
const duration = document.querySelector('.duration');
const queue = document.querySelectorAll('.queue')
const pageTitle = document.querySelector('.htittle')
const pageIcon = document.querySelector('.aicon')

//all buttons//


const fowardBtn = document.querySelector('i.uil-step-forward');
const backBtn = document.querySelector('.uil-previous');
const playBtn = document.querySelector('.uil-play');
const pauseBtn = document.querySelector('.uil-pause');
const repeatBtn = document.querySelector('.uil-redo');
const volumeBtn = document.querySelector('.uil-volume');
const volumeSlider = document.querySelector('.volume-slider');
const volumePercentage = document.querySelector('.vperc');
const opNav = document.querySelector('.opnav');

//Play Button Events///
playBtn.addEventListener('click', () => {
    music.play()
    playBtn.classList.remove('active');
    pauseBtn.classList.add('active');
});

window.addEventListener('load', () => {
    music.pause();
    playBtn.classList.remove('active');
    pauseBtn.classList.add('active');
})


///Pause Button Events///

pauseBtn.addEventListener('click', () => {
    music.pause();
    pauseBtn.classList.remove('active');
    playBtn.classList.add('active');
});

opNav.addEventListener('click', () => {
    musicPlayer.classList.add('active');
})


//Function For Music///
const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs [i];
    currentMusic = i;

    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImage.src = song.cover;
    pageTitle.innerHTML = ' Music Player -' + song.name;
    pageIcon.src = song.cover;

    setTimeout(() => {
        seekBar.max = music.duration;
        duration.innerHTML = formatTime(music.duration);
    }, 300);
    currentMusicTime.innerHTML = "00:00"
    queue.forEach(item => item.classList.remove('active'))

    queue[currentMusic].classList.add('active')
}
//format duration//

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = '0' + min;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = '0' + sec;
    }
    return `${min} : ${sec}`;
}

/// seekBar events
setInterval(() => {
    seekBar.value = music.currentTime;
    currentMusicTime.innerHTML = formatTime(music.currentTime);
    if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
        if (repeatBtn.className.includes('active')) {
            setMusic(currentMusic)
            playBtn.click()
        } else {
            fowardBtn.click();
        }
    }
}, 500);

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})

//Foward btn

fowardBtn.addEventListener('click', () => {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();

    if (clickCount >= 2) {
        musicPlayer.classList.remove('active');
        clickCount = 1;
        return;
    }
})

///Backward btn

backBtn.addEventListener('click', () => {
    if (currentMusic <= 0) {
        currentMusic = songs.length - 1;
    } else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();

    if (clickCount >= 2) {
        musicPlayer.classList.remove('active');
        clickCount = 1;
        return;
    }

})


repeatBtn.addEventListener('click', () => {
    repeatBtn.classList.toggle('active');
})


volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('active')
    volumeSlider.classList.toggle('active')

})
volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value;
    if (volumeSlider.value >= 1) {
        volumePercentage.innerHTML = '100'
    } else {
        volumePercentage.innerHTML = volumeSlider.value * 100
    }
})

queue.forEach((item, i) => {
    item.addEventListener('click', () => {
        setMusic(i)
        playBtn.click();
    })
})

