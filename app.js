import Timer from "./timer.js";

const tempoDisplay = document.querySelector(".metronome__tempo");
const tempoSlider = document.querySelector(".metronome__tempo-slider");
const increaseBtn = document.querySelector(".increase-btn");
const decreaseBtn = document.querySelector(".decrease-btn");
const actionBtn = document.querySelector(".action-btn");

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
