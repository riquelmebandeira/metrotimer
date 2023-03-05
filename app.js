import Timer from "./timer.js";

const tempoDisplay = document.querySelector(".metronome__tempo");
const tempoSlider = document.querySelector(".metronome__tempo-slider");
const increaseBtn = document.querySelector(".increase-btn");
const decreaseBtn = document.querySelector(".decrease-btn");
const actionBtn = document.querySelector("#start-metronome-btn");

let bpm = 100;
let isRunning = false;
const click = new Audio("click.mp3");

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

actionBtn.onclick = function () {
  if (!isRunning) {
    metronome.start();
    isRunning = true;
  } else {
    metronome.stop();
    isRunning = false;
  }
  actionBtn.classList.toggle("on");
};

////////// TIMER //////////
const inputMinutes = document.querySelector("#minutes");
const inputSeconds = document.querySelector("#seconds");
const startTimerBtn = document.querySelector("#start-timer-btn");

let minutes = 0;
let seconds = 0;
let timeout = 0;
let isActive = false;
let timer = null;

inputMinutes.onchange = function () {
  minutes = +inputMinutes.value;
  timeout = minutes * 60000 + seconds * 1000;
};

inputSeconds.onchange = function () {
  seconds = +inputSeconds.value;
  timeout = minutes * 60000 + seconds * 1000;
};

function updateTimer() {
  timeout -= 1000;
  inputMinutes.value = Math.floor(timeout / 60000);
  inputSeconds.value = ((timeout % 60000) / 1000).toFixed(0);
}

startTimerBtn.onclick = function () {
  if (!isActive) {
    updateTimer();
    timer = setInterval(() => {
      updateTimer();
      if (timeout - 1000 < 0) {
        clearInterval(timer);
        isActive = false;
      }
    }, 1000);
    isActive = true;
  } else {
    clearInterval(timer);
    isActive = false;
  }
};
