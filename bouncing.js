// Get a reference to the canvas container div
var canvasContainer = document.getElementById("canvasContainer");

// Create a new canvas element
var canvas = document.createElement("canvas");

// Set the canvas size to match the container size
canvas.width = canvasContainer.offsetWidth;
canvas.height = canvasContainer.offsetHeight;

// Append the canvas to the container
canvasContainer.appendChild(canvas);

// Create a stage on the canvas
var stage = new createjs.Stage(canvas);

// Colors
const white = "#FFFFFF";
const blue = "#0000FF";
const red = "#FF0000";

// Ball class
class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 0.5;
        this.bounceFactor = 0.7;
    }

    update() {
        this.speedY += this.gravity;

        // Store the current position before potential collision adjustments
        const oldX = this.x;
        const oldY = this.y;

        // Update position based on speed
        this.x += this.speedX;
        this.y += this.speedY;

        // Collision checks and adjustments
        if (this.x < this.radius) {
            this.speedX = Math.abs(this.speedX) * this.bounceFactor;
            this.x = this.radius;
        }
        if (this.x > canvas.width - this.radius) {
            this.speedX = -Math.abs(this.speedX) * this.bounceFactor;
            this.x = canvas.width - this.radius;
        }

        if (this.y < this.radius) {
            this.speedY = Math.abs(this.speedY) * this.bounceFactor;
            this.y = this.radius;
        }
        if (this.y > canvas.height - this.radius) {
            this.speedY = -Math.abs(this.speedY) * this.bounceFactor;
            this.y = canvas.height - this.radius;
        }

        // If the ball got stuck at the wall, restore the old position
        if ((this.x === oldX && this.speedX !== 0) || (this.y === oldY && this.speedY !== 0)) {
            this.x = oldX;
            this.y = oldY;
        }
    }

    draw() {
        const circle = new createjs.Shape();
        circle.graphics.beginFill(this.color).drawCircle(this.x, this.y, this.radius);
        stage.addChild(circle);
    }

    controls(controls) {
        const keys = controls.keys;

        if (keys[controls.left]) {
            this.speedX -= 1;
        }
        if (keys[controls.right]) {
            this.speedX += 1;
        }
        if (keys[controls.up]) {
            this.speedY -= 1;
        }
        if (keys[controls.down]) {
            this.speedY += 1;
        }
    }
}

window.addEventListener("resize", handleResize);



// Function to handle window resize
function handleResize() {
    var canvasContainer = document.getElementById("canvasContainer");
    var canvas = canvasContainer.querySelector("canvas");
    canvas.width = canvasContainer.offsetWidth;
    canvas.height = canvasContainer.offsetHeight;

    // Redraw or reposition your content as needed
    var stage = new createjs.Stage(canvas);
    var shape = stage.getChildAt(0); // Assuming the red circle is the first child
    shape.x = canvas.width / 2;
    shape.y = canvas.height / 2;
    stage.update();
}


// Initialize the game
const player1 = new Ball(canvas.width / 2 + 20, canvas.height / 2, 18, white);
const player2 = new Ball(canvas.width / 2 - 20, canvas.height / 2, 20, white);

const controlsArrows = {
    keys: {},
    left: 37,
    right: 39,
    up: 38,
    down: 40
};

const controlsWASD = {
    keys: {},
    left: 65, // A
    right: 68, // D
    up: 87,   // W
    down: 83  // S
};

// Touch control variables
let touchStartX = 0;
let touchStartY = 0;
let touchCurrentX = 0;
let touchCurrentY = 0;


canvas.addEventListener("touchstart", function (event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

canvas.addEventListener("touchmove", function (event) {
    touchCurrentX = event.touches[0].clientX;
    touchCurrentY = event.touches[0].clientY;

    const deltaX = touchCurrentX - touchStartX;
    const deltaY = touchCurrentY - touchStartY;

    // Adjust speed based on touch drag
    player1.speedX = player1.speedX + deltaX / 10; // You can adjust the sensitivity by changing the divisor
    player1.speedY = player1.speedY + deltaY / 10; // You can adjust the sensitivity by changing the divisor

    //touchStartX = touchCurrentX;
    //touchStartY = touchCurrentY;
});

canvas.addEventListener("touchend", function () {
    //player1.speedX = 0;
    //player1.speedY = 0;
});

window.addEventListener("keydown", function (event) {
    controlsArrows.keys[event.keyCode] = true;
    controlsWASD.keys[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
    delete controlsArrows.keys[event.keyCode];
    delete controlsWASD.keys[event.keyCode];
});

createjs.Ticker.framerate = 60;
createjs.Ticker.on("tick", function () {
    player1.controls(controlsArrows);
    player2.controls(controlsWASD);

    player1.update();
    player2.update();

    stage.removeAllChildren();
    player1.draw();
    player2.draw();

    stage.update();
});