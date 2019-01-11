const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenBtn = player.querySelector('.fullscreen');
const time = player.querySelector('.time');
const currentTime = time.querySelector('.currentTime');
const durationTime = time.querySelector('.durationTime');


let mouseDown = false;

function togglePlay() {
    video.paused ? video.play() : video.pause();
};

function updateBtn() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
};

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
};

function handleRangeUpdate() {
    video[this.name] = this.value;
};

function handleProgress() {
    progressBar.style.flexBasis = `${video.currentTime / video.duration * 100}%`;

    let [a, b] = (video.duration / 60).toFixed(2).split('.');
    b = Math.floor(b / 100 * 60);

    let [c, d] = (video.currentTime / 60).toFixed(2).split('.');
    d = Math.floor(d / 100 * 60);

    durationTime.textContent = `${a} : ${b}`;
    currentTime.textContent = `${c} : ${d}`;


};

function scrub(e) {
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
};

function fullscreenHandler() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { /* Firefox */
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE/Edge */
        video.msRequestFullscreen();
    }
};

function handleKey(e) {
    console.log(e);

    switch (e.keyCode) {
        /* space key */
        case 32:
            togglePlay();
            break;
            /* arrow down */
        case 40:
            if (video['volume'] == 0) break;
            video['volume'] -= 0.05;
            break;
            /* arrow up */
        case 38:
            if (video['volume'] === 1) break;
            video['volume'] += 0.05;
            break;
            /* arrow right */
        case 39:
            video.currentTime += 10;
            break;
            /* arrow left*/
        case 37:
            video.currentTime -= 10;
            break;
    }
};


video.addEventListener('click', togglePlay);
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);
video.addEventListener('timeupdate', handleProgress);


toggle.addEventListener('click', togglePlay);

skipButtons.forEach(btn => btn.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

fullscreenBtn.addEventListener('click', fullscreenHandler);

window.addEventListener('keydown', handleKey);