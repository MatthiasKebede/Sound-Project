console.log("check");

var playButton = document.getElementById("PlayButton");
var volumeButton = document.getElementById("VolButton");
var currentaudio = document.getElementById("audio");

playButton.addEventListener("click", playAudio);
volumeButton.addEventListener("click", changeVolume);


function playAudio() {
    if (!currentaudio.paused) {
        currentaudio.pause();
    }
    else {currentaudio.play()}
}

function changeVolume() {
    currentaudio.volume += 0.1;
    currentaudio.volume = (currentaudio.volume*10 % 10)/10;
}