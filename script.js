console.log("check");



// // HTML Elements
var playButton = document.getElementById("PlayButton");
var volumeUp = document.getElementById("VolUp");
var volumeDown = document.getElementById("VolDown");
var currentaudio = document.getElementById("ex-audio");
var tapeColor = document.getElementById("PlayColor");

var tape1 = document.getElementById("Tape1");

var topWheel = document.getElementById("TopSpokes");
var botWheel = document.getElementById("BotSpokes");





// // Event Listeners
playButton.addEventListener("click", playAudio);
volumeUp.addEventListener("click", increaseVolume);
volumeDown.addEventListener("click", decreaseVolume);

tape1.addEventListener("click", updateTape);





playButton.style.opacity = 1;
// // Functions
// Play/Pause audio, show button being pressed in
function playAudio() {
    // play a clicking sound
    if (!currentaudio.paused) {
        currentaudio.pause();
        playButton.style.opacity = 1;
        topWheel.classList.remove("Spinner");
        botWheel.classList.remove("Spinner");
    }
    else {
        currentaudio.play();
        playButton.style.opacity = 0;
        topWheel.classList.add("Spinner");
        botWheel.classList.add("Spinner");
        
    }

    // make play button pop back out when audio ends
}

// Increase or decrease the volume depending on where the button is pressed
function increaseVolume() {
    if (currentaudio.volume >= 1)
        currentaudio.volume = 1;
    else
        currentaudio.volume += 0.1;
    console.log(currentaudio.volume);
}
function decreaseVolume() {
    if (currentaudio.volume <= 0)
        currentaudio.volume = 0;
    else
        currentaudio.volume -= 0.1;
    console.log(currentaudio.volume);
}

// Update current tape
function updateTape() {
    tapeColor.setAttribute("class", "st26");

    // change audio file?
}