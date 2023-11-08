console.log("check");
var completed = [];


// // HTML Elements
// Divs
var contents = document.getElementById("content-area");
var recorder = document.getElementById("Recorder");
var tapecover = document.getElementById("Tapecover");
var droptarget = document.getElementById("Droptarget");
var bosscover = document.getElementById("bosscover");
var afterword = document.getElementById("end-screen")
// Buttons
var recordButton = document.getElementById("RecButton");
var volumeUp = document.getElementById("VolUp");
var volumeDown = document.getElementById("VolDown");
var playButton = document.getElementById("PlayButton"); playButton.style.opacity = 1;
// Current tape
var currentaudio = document.getElementById("intro-audio");
var currentname = document.getElementById("now-playing-name");
var playtime = document.getElementById("now-playing-time");
var tapeColor = document.getElementById("PlayColor");
// Tape options
var tape1 = document.getElementById("Tape1");
var tape2 = document.getElementById("Tape2");
var tape3 = document.getElementById("Tape3");
// Audio
var click = document.getElementById("click"); click.volume = 0.25;
var boss = document.getElementById("audio-conclusion");
// For animation
var topWheel = document.getElementById("TopSpokes");
var botWheel = document.getElementById("BotSpokes");





// // Event Listeners
recordButton.addEventListener("click", resetAll);
volumeUp.addEventListener("click", increaseVolume);
volumeDown.addEventListener("click", decreaseVolume);
playButton.addEventListener("click", playAudio);
currentaudio.addEventListener("ended", pauseMode);
currentaudio.addEventListener("timeupdate", timeStamp);
boss.addEventListener("ended", prepEnd);
boss.addEventListener("timeupdate", timeStamp);


// Update current tape's attributes when selecting a new tape
tape1.addEventListener("click", function() {
    currentaudio.pause();
    pauseMode();
    tapeColor.setAttribute("class", "st26");
    currentaudio = document.getElementById("audio1");
    currentaudio.currentTime = 0;
    currentaudio.addEventListener("ended", pauseMode);
    currentaudio.addEventListener("timeupdate", timeStamp);
    currentname.textContent = "Marcus - - - - - - -";
})
tape2.addEventListener("click", function() {
    currentaudio.pause();
    pauseMode();
    tapeColor.setAttribute("class", "st32");
    currentaudio = document.getElementById("audio2");
    currentaudio.currentTime = 0;
    currentaudio.addEventListener("ended", pauseMode);
    currentaudio.addEventListener("timeupdate", timeStamp);
    currentname.textContent = "Lucia - - - - - - - -";
})
tape3.addEventListener("click", function() {
    currentaudio.pause();
    pauseMode();
    tapeColor.setAttribute("class", "st33");
    currentaudio = document.getElementById("audio3");
    currentaudio.currentTime = 0;
    currentaudio.addEventListener("ended", pauseMode);
    currentaudio.addEventListener("timeupdate", timeStamp);
    currentname.textContent = "Tyrell - - - - - - - -";
})





// // Functions
// Play/Pause audio, show button being pressed in
function playAudio() {
    // Play a clicking sound
    click.currentTime = 0;
    click.play();
    // Handle playing/pausing audio
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
    // Mark tape as completed/visited
    if (!completed.includes(currentaudio.getAttribute("id"))) {
        completed.push(currentaudio.getAttribute("id"))
        console.log(completed);
    }
    // Unlock tape selection after listening to intro
    if (currentaudio.getAttribute("id") == "intro-audio") {
        tapecover.style.display = "none";
    }
    // Play conclusion audio after tapes have been played
    else if (completed.length == 4 && droptarget.style.display != "block") {
        bosscover.style.display = "block";
        setTimeout(bossKnock, 3000);
    }
    // Push play button back out, stop wheel animation
    playButton.style.opacity = 1;
    topWheel.classList.remove("Spinner");
    botWheel.classList.remove("Spinner");
}

// Reset to default state
function resetAll() {
    tapeColor.setAttribute("class", "st8");
    currentaudio.pause();
    pauseMode();
    currentaudio = document.getElementById("intro-audio");
    currentname.textContent = "Introduction - - - -";
    playtime.textContent = "0:00 / 0:00";
    currentaudio.volume = 1;
    currentaudio.currentTime = 0;
    tapecover.style.display = "block";
    droptarget.style.display = "none";
    recorder.style.marginLeft = "20%";
    completed = [];
    // document.getElementById("Tapes").appendChild(document.getElementById("Chose-Tape-1"));
    // document.getElementById("Tapes").appendChild(document.getElementById("Chose-Tape-2"));
    // document.getElementById("Tapes").appendChild(document.getElementById("Chose-Tape-3"));
}

// Timestamp for audio
function timeStamp() {
    // Seconds to M:SS
    var now = Math.round(currentaudio.currentTime)
    var minutes = Math.floor(now/60);
    var seconds = Math.floor(now - minutes*60);
    // Duration in seconds to M:SS
    var total = Math.round(currentaudio.duration);
    var totalmin = Math.floor(total/60);
    var totalsec = Math.floor(total - totalmin*60);
    // Set format and output to text
    var timestamp = minutes + ":" + seconds.toString().padStart(2,'0');
    var endtime = totalmin + ":" + totalsec.toString().padStart(2,'0');
    playtime.textContent = timestamp + " / " + endtime;
}

// Prompt user response
function bossKnock() {
    // Set attributes for conclusion "tape"
    currentaudio = document.getElementById("audio-conclusion");
    currentaudio.currentTime = 0;
    currentname.textContent = "Decision time - - - "
    tapeColor.setAttribute("class", "st8");
    // Play audio and prepare submission box on completion
    currentaudio.play();
}
function prepEnd() {
    // Display submission box, move recorder over
    bosscover.style.display = "none";
    droptarget.style.display = "block";
    recorder.style.marginLeft = "12%";
}

// Drag and drop a tape to submit your answer
function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.currentTarget.id);
}
function allowDrop(event) {
    if (!event.currentTarget.children.length)
        event.preventDefault();
    else console.log("Submission box full");
}
function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const source = document.getElementById(data);
    event.currentTarget.appendChild(source);
    // Run function for final page (on a delay)
    currentaudio.pause(); pauseMode();
    setTimeout(function() {finalAnswer(source.id)}, 4000);
    contents.classList.add("curtain");
}

// Submit answer and show results
function finalAnswer(answer) {
    var percentage;
    switch (answer) {
        case "Marcus":
            // code block
            percentage = 23;
            break;
        case "Lucia":
            // code block
            percentage = 59;
            break;
        case "Tyrell":
            // code block
            percentage = 18;
            break;
        default:
            console.log("answer error");
            percentage = 33;
            answer = "Jameson";
    }
    contents.style.display = "none";
    currentaudio.pause(); pauseMode();
    afterword.style.display = "block";
    document.getElementById("result1").textContent = "You and " + percentage + "%" 
    document.getElementById("result3").textContent = answer;
}