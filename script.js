console.log("check");
var completed = [];




var scripts = [
            // Marcus transcript
            [[`DETECTIVE JAMESON
            Before we begin, Marcus, I'm required to read you your rights.`,

            `You have the right to remain silent. Anything you say can and will be used against you in a court of law.`,

            `You have the right to talk to a lawyer and have them present with you while you're being questioned.`,

            `If you cannot afford to hire a lawyer, one will be appointed to represent you before any questioning, if you wish.`]

            ,

            [`DETECTIVE JAMESON
            Okay Marcus, start from the top. Records say your boss demanded you be their lookout. Why is that?\n`,

            `MARCUS
            I got the best eyes. Been working the streets since I was a kid. I know when cops are coming a mile away.\n`,

            `DETECTIVE JAMESON
            And what did those eyes see on the night of the heist?\n`,

            `MARCUS
            It was all normal till 'bout midnight. That's when we moved. I saw the team go in, and then... silence.\n`]

            ,

            [`DETECTIVE JAMESON
            Silence until the gunshot?\n`,

            `MARCUS
            Yeah, that shook me. It was sudden. I wanted to run in, but that was against the plan. We had rules.\n`,

            `DETECTIVE JAMESON
            Tell me about the argument you overheard.\n`,

            `MARCUS
            It was earlier, at the hideout. The boss and Eddie, they were never tight. Eddie didn't like the cut he was getting. Threats were made.\n`]

            ,
            
            [`DETECTIVE JAMESON
            Did you see anything from your spot? Anyone leaving the scene?\n`,

            `MARCUS
            Nothing. But there was this one moment... I glanced across the street, and there was this figure. They were in the dark, just a shadow really. But they were there the whole time. Watching.\n`,

            `DETECTIVE JAMESON
            Did you recognize this figure?\n`,

            `MARCUS
            No. But they were there before the shot and gone right after.\n`,

            `DETECTIVE JAMESON
            Anything else you noticed?\n`,

            `MARCUS
            After the shot, the street was dead quiet. Eerie, you know? Like the city was holding its breath.`]]



            ,



            // Lucia transcript
            [[`DETECTIVE JAMESON
            You seem like a smart woman, Lucia. I'm sure you know your rights so why don't we just get down to it. You were the inside man. What was your role?\n`,

            `LUCIA
            I disabled the alarms, unlocked the side entrance, the usual stuff. I'm a tech whiz, Detective.\n`,

            `DETECTIVE JAMESON
            And when things went south?\n`,

            `LUCIA
            It was so fast. The lights killed, a thud, a shot in the dark. Panic.\n`],

            [`DETECTIVE JAMESON
            What did you do in the darkness?\n`,

            `LUCIA
            Stayed put. Waited for the emergency lights, but they never came on. That's when I knew something was wrong.\n`,

            `DETECTIVE JAMESON
            When the lights returned, what did you see?\n`,

            `LUCIA
            Chaos. The boss was on the floor, blood pooling. The artifact... the one we came for, was gone.\n`,

            `DETECTIVE JAMESON
            Was it stolen?\n`,

            `LUCIA
            Had to be. It was small enough to hide.\n`],

            [`DETECTIVE JAMESON
            You mentioned Tyrell, the muscle, earlier?\n`,

            `LUCIA
            He was by the breaker box when the lights cut. I remember 'cause I tripped over him in the dark.\n`,

            `DETECTIVE JAMESON
            And no arguments? Marcus sure made it sound like there was tension.\n`,

            `LUCIA
            Marcus talks too much. There were no arguments. Not tonight.`]]



            ,



            // Tyrell transcript
            [[`DETECTIVE JAMESON
            Before we begin, I need to make sure you know your rights.`,

            `You have the right to remain silent. Anything you say can and will be used against you in a court of law.`,

            `You have the right to talk to a lawyer and have them present with you while you're being questioned.`,

            `If you cannot afford to hire a lawyer, one will be appointed to represent you before any questioning, if you wish.`,

            `Tyrell, you were the muscle on this job. What did you see?`],

            [`TYRELL
            I was focused on the guards, keeping them down. Then it went pitch black.\n`,

            `DETECTIVE JAMESON
            And the gunshot?\n`,

            `TYRELL
            Came outta nowhere. I was disoriented, trying not to get trampled.\n`,

            `DETECTIVE JAMESON
            You didn't hear anything? A struggle, perhaps?\n`,

            `TYRELL
            Just whispers. Someone was saying, "Now!" But it was so damn dark.`],

            [`DETECTIVE JAMESON
            Lucia suggested you were near the breaker box.\n`,

            `TYRELL
            I brushed against it in the dark, sure. But I didn't cut the lights. I'm not the brains.\n`,

            `DETECTIVE JAMESON
            Did you notice anyone else acting strange?\n`,

            `TYRELL
            Lucia was too calm, and she pocketed something when the lights snapped back. And Marcus... he's too slippery.\n`,

            `DETECTIVE JAMESON
            Anything else you can add?\n`,

            `TYRELL
            The boss was in deep with some bad people. This heist... it was his ticket out. Maybe they didn't want him leaving.`]]
]
var prevtime = 0;
var subSection = 0;
var subsubSection = 1;














// // HTML Elements
// Divs
var contents = document.getElementById("content-area");
var recorder = document.getElementById("Recorder");
var tapecover = document.getElementById("Tapecover");
var subtitles = document.getElementById("subtitles");
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
var boss = document.getElementById("audio-conclusion"); boss.volume = 0.2;
// For animation
var topWheel = document.getElementById("TopSpokes");
var botWheel = document.getElementById("BotSpokes");
// // For subtitles
// var marcustext = document.getElementById("marcus-text");
// var luciatext = document.getElementById("lucia-text");
// var tyrelltext = document.getElementById("tyrell-text");
var subTitle = document.getElementById("sub-title");
var subScript = document.getElementById("sub-script")




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
    prevtime = 0;
    subTitle.textContent = "";
    subScript.textContent = "";
    subSection = 0;
    subsubSection = 1;
    currentaudio.addEventListener("ended", pauseMode);
    currentaudio.addEventListener("timeupdate", timeStamp);
    currentname.textContent = "The Lookout - - - -";
    subTitle.textContent = "Testimony 1: The Lookout";
})
tape2.addEventListener("click", function() {
    currentaudio.pause();
    pauseMode();
    tapeColor.setAttribute("class", "st32");
    currentaudio = document.getElementById("audio2");
    currentaudio.currentTime = 0;
    prevtime = 0;
    subTitle.textContent = "";
    subScript.textContent = "";
    subSection = 0;
    subsubSection = 1;
    currentaudio.addEventListener("ended", pauseMode);
    currentaudio.addEventListener("timeupdate", timeStamp);
    currentname.textContent = "The Insider - - - - -";
    subTitle.textContent = "Testimony 2: The Insider";
})
tape3.addEventListener("click", function() {
    currentaudio.pause();
    pauseMode();
    tapeColor.setAttribute("class", "st33");
    currentaudio = document.getElementById("audio3");
    currentaudio.currentTime = 0;
    prevtime = 0;
    subTitle.textContent = "";
    subScript.textContent = "";
    subSection = 0;
    subsubSection = 1;
    currentaudio.addEventListener("ended", pauseMode);
    currentaudio.addEventListener("timeupdate", timeStamp);
    currentname.textContent = "The Muscle - - - -";
    subTitle.textContent = "Testimony 3: The Muscle";
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
        // console.log(completed);
    }
    // Unlock tape selection after listening to intro
    if (currentaudio.getAttribute("id") == "intro-audio") {
        tapecover.style.display = "none";
        recorder.style.marginLeft = "12%";
        subtitles.style.display = "block";

    }
    // Play conclusion audio after tapes have been played
    else if (completed.length == 4 && droptarget.style.display != "block") {
        subtitles.style.display = "none";
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
    prevtime = 0;
    subTitle.textContent = "";
    subScript.textContent = "";
    subSection = 0;
    subsubSection = 1;
    tapecover.style.display = "block";
    droptarget.style.display = "none";
    recorder.style.marginLeft = "20%";
    subtitles.style.display = "none";
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

    // Add in subtitles
    if (now > prevtime) {
        switch (currentaudio.id) {
            case "audio1":
                subScript.textContent = scripts[0][subSection].slice(0, subsubSection).join(' ');
                // Rights
                if (now == 4) {
                    subsubSection = 2;
                }
                if (now == 10) {
                    subsubSection = 3;
                }
                if (now == 15) {
                    subsubSection = 4;
                }
                // Marcus intro
                if (now == 23) {
                    subSection = 1;
                    subsubSection = 1;
                }
                if (now == 30) {
                    subsubSection = 2;
                }
                if (now == 36) {
                    subsubSection = 3;
                }
                if (now == 40) {
                    subsubSection = 4;
                }
                // Gunshot
                if (now == 47) {
                    subSection = 2;
                    subsubSection = 1;
                }
                if (now == 51) {
                    subsubSection = 2;
                }
                if (now == 59) {
                    subsubSection = 3;
                }
                if (now == 63) {
                    subsubSection = 4;
                }
                // Figure
                if (now == 70) {
                    subSection = 3;
                    subsubSection = 1;
                }
                if (now == 76) {
                    subsubSection = 2;
                }
                if (now == 87) {
                    subsubSection = 3;
                }
                if (now == 90) {
                    subsubSection = 4;
                }
                if (now == 93) {
                    subsubSection = 5;
                }
                if (now == 95) {
                    subsubSection = 6;
                }
                break;
            case "audio2":
                subScript.textContent = scripts[1][subSection].slice(0, subsubSection).join(' ');
                // Rights
                if (now == 10) {
                    subsubSection = 2;
                }
                if (now == 15) {
                    subsubSection = 3;
                }
                if (now == 18) {
                    subsubSection = 4;
                }
                if (now == 23) {
                    subsubSection = 5;
                }
                // In darkness --> Artifact stolen
                if (now == 26) {
                    subSection = 1;
                    subsubSection = 1;
                }
                if (now == 28) {
                    subsubSection = 2;
                }
                if (now == 35) {
                    subsubSection = 3;
                }
                if (now == 37) {
                    subsubSection = 4;
                }
                if (now == 45) {
                    subsubSection = 5;
                }
                if (now == 47) {
                    subsubSection = 6;
                }
                // Tyrell / No arguments
                if (now == 51) {
                    subSection = 2;
                    subsubSection = 1;
                }
                if (now == 55) {
                    subsubSection = 2;
                }
                if (now == 61) {
                    subsubSection = 3;
                }
                if (now == 66) {
                    subsubSection = 4;
                }
                break;
            case "audio3":
                subScript.textContent = scripts[2][subSection].slice(0, subsubSection).join(' ');
                // Rights
                if (now == 4) {
                    subsubSection = 2;
                }
                if (now == 10) {
                    subsubSection = 3;
                }
                if (now == 15) {
                    subsubSection = 4;
                }
                if (now == 20) {
                    subsubSection = 5;
                }
                // Section 1
                if (now == 25) {
                    subSection = 1;
                    subsubSection = 1;
                }
                if (now == 30) {
                    subsubSection = 2;
                }
                if (now == 35) {
                    subsubSection = 3;
                }
                if (now == 40) {
                    subsubSection = 4;
                }
                if (now == 45) {
                    subsubSection = 5;
                }
                if (now == 50) {
                    subsubSection = 6;
                }
                // Section 2
                if (now == 55) {
                    subSection = 2;
                    subsubSection = 1;
                }
                if (now == 60) {
                    subsubSection = 2;
                }
                if (now == 65) {
                    subsubSection = 3;
                }
                if (now == 70) {
                    subsubSection = 4;
                }
                break;
            default:
                // erase text
                subTitle.textContent = "";
                subScript.textContent = "";
        }
        prevtime += 1;
    }
}

// Prompt user response
function bossKnock() {
    // Set attributes for conclusion "tape"
    // currentaudio = document.getElementById("audio-conclusion");
    // currentaudio.currentTime = 0;
    boss.currentTime = 0;
    currentname.textContent = "Decision time - - - "
    tapeColor.setAttribute("class", "st8");
    // Play audio and prepare submission box on completion
    // currentaudio.play();
    boss.play();
    // setTimeout(prepEnd, 1000);
}
function prepEnd() {
    // Display submission box, move recorder over
    bosscover.style.display = "none";
    droptarget.style.display = "block";
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
            document.getElementById("result1").style.color = "#45b2ffd1";
            break;
        case "Lucia":
            // code block
            percentage = 59;
            document.getElementById("result1").style.color = "#ff4545d1";
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
    document.getElementById("result1").textContent = "You and " + percentage + "%";
    document.getElementById("result3").textContent = answer;
}