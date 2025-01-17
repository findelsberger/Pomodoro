let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const modeText = document.getElementById("mode-text");
const toggleButton = document.getElementById("toggle-mode");
const focusDisplay = document.getElementById("focus-display");

const WORK_TIME = 30 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  // Update the display
  minutesDisplay.textContent = minutes.toString().padStart(2, "0");
  secondsDisplay.textContent = seconds.toString().padStart(2, "0");

  // Update the document title
  document.title = `${timeString} - ${
    isWorkTime ? "Work" : "Break"
  } | Pomodoro Timer`;
}

function switchMode() {
  isWorkTime = !isWorkTime;
  timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
  modeText.textContent = isWorkTime ? "Work Time" : "Break Time";
  toggleButton.textContent = isWorkTime ? "Switch to Break" : "Switch to Work";
  if (!isWorkTime) {
    focusDisplay.textContent = ""; // Clear the focus task during break
  }
  updateDisplay();
}

function startTimer() {
  if (timerId !== null) return;

  if (!timeLeft) {
    timeLeft = WORK_TIME;
  }

  // Add focus task prompt at the start of work sessions
  if (isWorkTime && !focusDisplay.textContent) {
    const focusTask = prompt(
      "What would you like to focus on during this session?"
    );
    if (focusTask) {
      focusDisplay.textContent = `Current Focus: ${focusTask}`;
    }
  }

  timerId = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft === 0) {
      clearInterval(timerId);
      timerId = null;
      switchMode();
      alert(
        isWorkTime
          ? "Break time is over! Time to work!"
          : "Work time is over! Take a break!"
      );
    }
  }, 1000);

  startButton.textContent = "Pause";
}

function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  isWorkTime = true;
  timeLeft = WORK_TIME;
  modeText.textContent = "Work Time";
  startButton.textContent = "Start";
  toggleButton.textContent = "Switch to Break";
  document.title = "Pomodoro Timer";
  focusDisplay.textContent = ""; // Clear the focus task
  updateDisplay();
}

startButton.addEventListener("click", () => {
  if (timerId === null) {
    startTimer();
  } else {
    clearInterval(timerId);
    timerId = null;
    startButton.textContent = "Start";
  }
});

resetButton.addEventListener("click", resetTimer);

toggleButton.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = null;
  startButton.textContent = "Start";
  switchMode();
});

// Initialize the display
timeLeft = WORK_TIME;
updateDisplay();
