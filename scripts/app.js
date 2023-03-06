import Timer from "./timer.js";

////////// METRONOME //////////
const tempoDisplay = document.querySelector(".metronome__tempo");
const tempoSlider = document.querySelector(".metronome__tempo-slider");
const increaseBtn = document.querySelector(".increase-btn");
const decreaseBtn = document.querySelector(".decrease-btn");
const metronomeBtn = document.querySelector("#start-metronome-btn");

let bpm = 100;
let isRunning = false;
const click = new Audio("assets/click.mp3");

decreaseBtn.onclick = function () {
  if (bpm <= 20) return;
  bpm--;
  updateMetronome();
};

increaseBtn.onclick = function () {
  if (bpm >= 500) return;
  bpm++;
  updateMetronome();
};

tempoSlider.oninput = function () {
  bpm = tempoSlider.value;
  console.log(bpm);
  updateMetronome();
};

function updateMetronome() {
  tempoDisplay.textContent = bpm;
  tempoSlider.value = bpm;
  metronome.timeInterval = 60000 / bpm;
}

function playClick() {
  click.play();
  click.currentTime = 0;
}

const metronome = new Timer(playClick, 60000 / bpm, { immediate: true });

metronomeBtn.onclick = function () {
  if (!isRunning) {
    metronome.start();
    isRunning = true;
  } else {
    metronome.stop();
    isRunning = false;
  }
  metronomeBtn.classList.toggle("on");
};

////////// TIMER //////////
const inputMinutes = document.querySelector("#minutes");
const inputSeconds = document.querySelector("#seconds");
const timerBtn = document.querySelector("#start-timer-btn");

let minutes = 0;
let seconds = 0;
let timeout = 0;
let isActive = false;

inputMinutes.onchange = function () {
  minutes = +inputMinutes.value;
  timeout = minutes * 60000 + seconds * 1000;
};

inputSeconds.onchange = function () {
  seconds = +inputSeconds.value;
  timeout = minutes * 60000 + seconds * 1000;
};

inputMinutes.onblur = function () {
  if (!inputMinutes.value) inputMinutes.value = 0
}

inputSeconds.onblur = function () {
  if (!inputSeconds.value) inputSeconds.value = 0
}

inputMinutes.oninput = function() {
  if (this.value.length > 2) {
    this.value = this.value.slice(0,2); 
  }
}

inputSeconds.oninput = function() {
  if (this.value.length > 2) {
    this.value = this.value.slice(0,2); 
  }
}

function updateTimer() {
  timeout -= 1000;
  inputMinutes.value = Math.floor(timeout / 60000);
  inputSeconds.value = ((timeout % 60000) / 1000).toFixed(0);
  checkIfTimesUp()
}

function checkIfTimesUp() {
  if (timeout < 1000) {
    timerBtn.classList.toggle("on");
    isActive = false;
  }
}

const countdown = new Timer(updateTimer, 1000, { immediate: true })

timerBtn.onclick = function () {
  if (!isActive && timeout) {
    countdown.totalTime = timeout
    countdown.start()
    isActive = true;
    timerBtn.classList.toggle("on");
  } else if (!isActive && !timeout) {
    inputMinutes.select()
  } else if (isActive && timeout) {
    countdown.stop()
    isActive = false;
    timerBtn.classList.toggle("on");
  }
};
