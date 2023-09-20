const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let circleX = canvas.width / 2;
const circleY = canvas.height / 2;
const circleRadius = 20;
let isDragging = false;
let oscillator = null;
let audioContext = new (window.AudioContext || window.webkitAudioContext)();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

function startOscillator() {
    oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(circleX, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
}

function stopOscillator() {
    oscillator.stop();
    oscillator.disconnect();
    oscillator = null;
}

function mouseDownHandler(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distance = Math.sqrt((mouseX - circleX) ** 2 + (mouseY - circleY) ** 2);
    
    if (distance <= circleRadius) {
        isDragging = true;
        startOscillator();
    }
}

function mouseUpHandler() {
    isDragging = false;
    stopOscillator();
}

function mouseMoveHandler(e) {
    if (isDragging) {
        circleX = e.clientX;
        drawCircle();
        oscillator.frequency.setValueAtTime(circleX, audioContext.currentTime);
    }
}

canvas.addEventListener('mousedown', mouseDownHandler);
canvas.addEventListener('mouseup', mouseUpHandler);
canvas.addEventListener('mousemove', mouseMoveHandler);

drawCircle();
