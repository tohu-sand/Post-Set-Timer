let startTime = null;
let targetTime = null;
let durationSec = null;
let countdownInterval = null;
let alarmTimeout = null;
let paused = false;
let pausedElapsed = 0;
let keypadValue = "";

const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const timeInputContainer = document.getElementById('timeInputContainer');
const keypadDisplay = document.getElementById('keypadDisplay');
const keypadButtons = document.querySelectorAll('.keypad-button');
const display = document.getElementById('display');
const message = document.getElementById('message');
const progressIndicator = document.getElementById('progressIndicator');
const body = document.body;
const totalCircumference = 565.48;

function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function updateDisplay() {
    if (!targetTime) {
        const elapsed = (Date.now() - startTime) / 1000;
        display.textContent = "Elapsed Time: " + formatTime(elapsed);
    } else {
        let remaining = (targetTime - Date.now()) / 1000;
        if (remaining < 0) remaining = 0;
        display.textContent = "Time Remaining: " + formatTime(remaining);
        
        // 円形プログレス表示の更新
        const elapsed = (Date.now() - startTime) / 1000;
        const progressFraction = Math.min(elapsed / durationSec, 1);
        const newOffset = totalCircumference * (1 - progressFraction);
        progressIndicator.style.strokeDashoffset = newOffset;
    }
}

function triggerAlarm() {
    clearInterval(countdownInterval);
    message.textContent = "Time's Up!";
    message.classList.add("time-up-message");
    body.classList.add("time-up-bg");
    progressIndicator.style.strokeDashoffset = 0;

    // Tone.js を使ったアラームサウンド
    const osc = new Tone.Oscillator(2000, "sine").toDestination();
    const toneDuration = 0.060;
    let time = Tone.now();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            osc.start(time);
            time += toneDuration;
            osc.stop(time);
            time += toneDuration;
        }
        time += toneDuration * 8;
    }

    if ("vibrate" in navigator) {
        navigator.vibrate(500);
    }
}

startButton.addEventListener('click', async () => {
    startTime = Date.now();
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
    timeInputContainer.style.visibility = "visible";
    message.textContent = "";
    countdownInterval = setInterval(updateDisplay, 250);

    // ユーザー操作によりオーディオを開始
    await Tone.start();
    console.log("audio is ready");
});

pauseButton.addEventListener('click', () => {
    if (!paused) {
        // 一時停止
        paused = true;
        pausedElapsed = Date.now() - startTime;
        clearInterval(countdownInterval);
        clearTimeout(alarmTimeout);
        pauseButton.textContent = "Resume";
    } else {
        // 再開
        paused = false;
        startTime = Date.now() - pausedElapsed;
        if (targetTime) {
            const remaining = durationSec - (pausedElapsed / 1000);
            targetTime = Date.now() + remaining * 1000;
            alarmTimeout = setTimeout(triggerAlarm, remaining * 1000);
        }
        countdownInterval = setInterval(updateDisplay, 250);
        pauseButton.textContent = "Pause";
    }
});

// キーパッド入力の処理
keypadButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (value === "C") {
            keypadValue = "";
        } else if (value === "Set") {
            durationSec = parseFloat(keypadValue);
            if (isNaN(durationSec) || durationSec <= 0) {
                alert("Please enter a valid positive number for duration.");
                return;
            }
            targetTime = startTime + durationSec * 1000;
            const remaining = targetTime - Date.now();
            if (remaining <= 0) {
                triggerAlarm();
            } else {
                if (alarmTimeout) clearTimeout(alarmTimeout);
                alarmTimeout = setTimeout(triggerAlarm, remaining);
            }
        } else {
            // 数字の追加
            keypadValue += value;
        }
        keypadDisplay.textContent = keypadValue || "0";
    });
});

resetButton.addEventListener('click', () => {
    clearInterval(countdownInterval);
    clearTimeout(alarmTimeout);
    startTime = null;
    targetTime = null;
    durationSec = null;
    paused = false;
    pausedElapsed = 0;
    keypadValue = "";
    display.textContent = 'Elapsed Time: 00:00';
    message.textContent = '';
    message.classList.remove("time-up-message");
    body.classList.remove("time-up-bg");
    timeInputContainer.style.visibility = "hidden";
    startButton.disabled = false;
    pauseButton.disabled = true;
    pauseButton.textContent = "Pause";
    resetButton.disabled = true;
    keypadDisplay.textContent = "0";
    progressIndicator.style.strokeDashoffset = totalCircumference;
});
