var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audioElement = document.getElementById('audioElement');
var audioSrc = audioCtx.createMediaElementSource(audioElement);
var analyser = audioCtx.createAnalyser();

audioSrc.connect(analyser);
audioSrc.connect(audioCtx.destination);

var frequencyData = new Uint8Array(200);

function renderAnimation() {
    requestAnimationFrame(renderAnimation);
    bassAnimation(frequencyData);

    analyser.getByteFrequencyData(frequencyData);
}

function bassAnimation(data) {
    let maxPoint = 255;
    let bassPoint = data[3];
    let scale = bassPoint / 100;
    let img = document.querySelector('.music_media');
    img.style.transform =  `scale(${scale >=1 ? scale : 1})`;

    if(bassPoint >= maxPoint) {
        img.classList.add('vibration');
    } else {
        img.classList.remove('vibration');
    }
}

renderAnimation();