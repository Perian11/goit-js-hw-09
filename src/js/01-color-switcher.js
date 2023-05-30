const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let interval = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}

function startColorChange() {
    startButton.disabled = true;
    stopButton.disabled = false;
    interval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}
startButton.addEventListener('click', startColorChange);


function stopColorChange() {
    startButton.disabled = false;
    stopButton.disabled = true;
    clearInterval(interval);
}
stopButton.addEventListener('click', stopColorChange);
stopButton.disabled = true;
