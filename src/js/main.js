var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audioElement = document.getElementById('audioElement');
var audioSrc = audioCtx.createMediaElementSource(audioElement);
var analyser = audioCtx.createAnalyser();
var bassPoint, totalPoints;

audioSrc.connect(analyser);
audioSrc.connect(audioCtx.destination);

var frequencyData = new Uint8Array(200);
var frequencyDataDrums = new Uint8Array(1);

function renderAnimation() {
    requestAnimationFrame(renderAnimation);
    bassAnimation(frequencyData);

    analyser.getByteFrequencyData(frequencyData);
}

function bassAnimation(data) {
    console.log(frequencyData)
    let maxPoint = 255;
    bassPoint = data[2];
    totalPoints = data.reduce(function(acc, val) { return acc + val; }, 0) / data.length
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