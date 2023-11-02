console.log("check");


// // HTML Elements
// Buttons
var recordButton = document.getElementById("RecButton");
var volumeUp = document.getElementById("VolUp");
var volumeDown = document.getElementById("VolDown");
var playButton = document.getElementById("PlayButton"); playButton.style.opacity = 1;
// Current tape
var currentaudio = document.getElementById("intro-audio");
var tapeColor = document.getElementById("PlayColor");
// Tape options
var tape1 = document.getElementById("Tape1"); tape1.classList.add("not-clickable");
var tape2 = document.getElementById("Tape2"); tape2.classList.add("not-clickable");
var tape3 = document.getElementById("Tape3"); tape3.classList.add("not-clickable");
// For animation
var topWheel = document.getElementById("TopSpokes");
var botWheel = document.getElementById("BotSpokes");





// // Event Listeners
recordButton.addEventListener("click", resetAll);
volumeUp.addEventListener("click", increaseVolume);
volumeDown.addEventListener("click", decreaseVolume);
playButton.addEventListener("click", playAudio);
currentaudio.addEventListener("ended", pauseMode);

tape1.addEventListener("click", function() {
    currentaudio.pause();
    pauseMode();
    tapeColor.setAttribute("class", "st26");
    currentaudio = document.getElementById("audio1");
    // currentaudio.currentTime = 0;
})
tape2.addEventListener("click", function() {
    currentaudio.pause();
    pauseMode();
    tapeColor.setAttribute("class", "st32");
    currentaudio = document.getElementById("audio2");
    // currentaudio.currentTime = 0;
})
tape3.addEventListener("click", function() {
    currentaudio.pause();
    pauseMode();
    tapeColor.setAttribute("class", "st33");
    currentaudio = document.getElementById("audio3");
    // currentaudio.currentTime = 0;
})





// // Functions
// Play/Pause audio, show button being pressed in
function playAudio() {
    // play a clicking sound?
    console.log(currentaudio.currentTime);
    if (!currentaudio.paused) {
        currentaudio.pause();
        pauseMode();
    }
    else {
        currentaudio.play();
        playMode();
    }
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

// Adjust position of play button, start/stop wheel animation
function playMode() {
    playButton.style.opacity = 0;
    topWheel.classList.add("Spinner");
    botWheel.classList.add("Spinner");
}
function pauseMode() {
    if (currentaudio.getAttribute("id") == "intro-audio") {
        tape1.classList.remove("not-clickable");
        tape2.classList.remove("not-clickable");
        tape3.classList.remove("not-clickable");
    }
    playButton.style.opacity = 1;
    topWheel.classList.remove("Spinner");
    botWheel.classList.remove("Spinner");
}

// Reset to default state
function resetAll() {
    tapeColor.setAttribute("class", "st8");
    pauseMode();
    currentaudio = document.getElementById("intro-audio");
    tape1.classList.add("not-clickable");
    tape2.classList.add("not-clickable");
    tape3.classList.add("not-clickable");
    currentaudio.volume = 1;
    currentaudio.currentTime = 0;
}