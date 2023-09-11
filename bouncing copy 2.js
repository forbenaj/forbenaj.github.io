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

var playMode = "1P"

// Colors
const white = "#FFFFFF";
const blue = "#000022";
const red = "#220000";

// Ball class
class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speedX = Math.random()*40-20;
        this.speedY = Math.random()*40-20;
        this.gravity = 0.5;
        this.bounceFactor = 0.7;
        this.animationSpeed = 0.05; // Adjust this value to control animation speed
        this.time = 0;
        this.animFactor = 0;
    }

    animate(min, max) {
        //this.time += this.animationSpeed;
        // Use a sine function to create a smoother animation
        return min + (Math.sin(this.time) * 0.5 + 0.5) * (max - min);
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
        /*if ((this.x === oldX && this.speedX !== 0) || (this.y === oldY && this.speedY !== 0)) {
            this.x = oldX;
            this.y = oldY;
        }*/
    }

    draw() {
        const circle = new createjs.Shape();
        if(this.animFactor<1){
            this.animFactor += 0.05
        }
        if(playMode=="2P"){
            circle.graphics.beginFill(this.color).drawCircle(this.x, this.y, this.radius*2*this.animate(0.9, 1.1)*this.animFactor);
            this.time += this.animationSpeed;
            if (this.time >= Math.PI * 2){
                this.time=0
            }
        }
        circle.graphics.beginFill("#FFFFFF").drawCircle(this.x, this.y, this.radius*this.animate(1.1, 0.9)*this.animFactor);
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



class BlackBall {
    constructor(radius, color) {
        this.x = canvas.width / 2 -40;
        this.y = canvas.height / 2 -33;
        this.active = true;
        this.radius = radius;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 0.5;
        this.bounceFactor = 0.7;
        this.animationSpeed = 0.05; // Adjust this value to control animation speed
        this.time = 0; // Initialize time

        this.animFactor = 0
    }

    getRandomPosition(min, max) {
        return Math.random() * (max - min) + min;
    }

    animate(min, max) {
        //this.time += this.animationSpeed;
        // Use a sine function to create a smoother animation
        return min + (Math.sin(this.time) * 0.5 + 0.5) * (max - min);
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
        /*if ((this.x === oldX && this.speedX !== 0) || (this.y === oldY && this.speedY !== 0)) {
            this.x = oldX;
            this.y = oldY;
        }*/
    }


    respawn() {
        this.active = true;
        this.animFactor = 0
        this.x = this.getRandomPosition(this.radius, canvas.width - this.radius);
        this.y = this.getRandomPosition(this.radius, canvas.height - this.radius);
    }

    draw() {
        if (this.active) {
            if(this.animFactor<1){
                this.animFactor += 0.05
            }
            const circle = new createjs.Shape();
            circle.graphics.beginFill("#111111").drawCircle(this.x, this.y, this.radius*1.8*this.animate(0.8, 1.5)*this.animFactor);
            circle.graphics.beginFill("#222222").drawCircle(this.x, this.y, this.radius*1.5*this.animate(0.8, 1.3)*this.animFactor);
            circle.graphics.beginFill("#666666").drawCircle(this.x, this.y, this.radius*this.animate(0.8, 1.2)*this.animFactor);
            circle.graphics.beginFill(this.color).drawCircle(this.x, this.y, (this.radius/2)*this.animate(1.1, 0.9)*this.animFactor);
            stage.addChild(circle);
            this.time += this.animationSpeed;
            if (this.time >= Math.PI * 2){
                this.time=0
            }
        }
    }

}

class ScoreBar{
    constructor(){
        this.x = canvas.width / 2;
        this.y = 20;
        this.redSide = 0.5
        this.blueSide = 0.5
        this.pos = 0
        this.barSize = canvas.width / 2-40
        this.barBits = this.barSize/maxScore

    }
    draw(){

        let points = player1Score - player2Score

        let redBarSize = this.barBits*points+this.barSize

        const p1scoreBar = new createjs.Shape()
        const p2scoreBar = new createjs.Shape()
        p2scoreBar.graphics.beginFill("#000088").drawRect(40,this.y,canvas.width-80,10)
        p1scoreBar.graphics.beginFill("#880000").drawRect(40,this.y,redBarSize,10)
        stage.addChild(p2scoreBar);
        stage.addChild(p1scoreBar);
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

function graduallyDisappear(elementId, duration) {
    const element = document.getElementById(elementId);
    let currentOpacity = 1;
    const fadeInterval = 50; // Adjust the interval for smoother or faster fading
  
    const fadeOut = setInterval(() => {
      currentOpacity -= (fadeInterval / duration);
  
      if (currentOpacity <= 0) {
        clearInterval(fadeOut); // Stop the fading animation
        element.style.opacity = 0; // Ensure opacity is set to 0
        element.style.display = 'none'; // Hide the element
      } else {
        element.style.opacity = currentOpacity;
      }
    }, fadeInterval);
  }


var player1Score = 0
var player2Score = 0

var maxScore = 10

var p1_score_color = "#444444"
var p2_score_color = "#444444"

// Initialize the game
const player1 = new Player(canvas.width / 4 +canvas.width / 2, canvas.height / 2, 20, red);
const player2 = new Player(canvas.width / 4, canvas.height / 2, 20, blue);
const blackBall = new Orb(30, white);

const scoreBar = new ScoreBoard()



isPlaying = false


debug = true

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

var touchdown = false;
var deltaX = 0
var deltaY = 0

canvas.addEventListener("touchstart", function (event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    touchCurrentX = event.touches[0].clientX;
    touchCurrentY = event.touches[0].clientY;
    touchdown = true
});

canvas.addEventListener("touchmove", function (event) {
    touchCurrentX = event.touches[0].clientX;
    touchCurrentY = event.touches[0].clientY;

    deltaX = (touchCurrentX - touchStartX) * 0.01;
    deltaY = (touchCurrentY - touchStartY) * 0.01;



    //touchStartX = touchCurrentX;
    //touchStartY = touchCurrentY;
});

canvas.addEventListener("touchend", function () {
    //player1.speedX = 0;
    //player1.speedY = 0;
    touchdown = false
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
    
    player1.controls(controlsWASD);
    player2.controls(controlsArrows);


    if (playMode == "1P" && (controlsArrows.keys[controlsArrows.left]||
                             controlsArrows.keys[controlsArrows.right]||
                             controlsArrows.keys[controlsArrows.up]||
                             controlsArrows.keys[controlsArrows.down])){
        playMode = "2P"
        newPlayerEntered = true
        player1Score = 0
        player2Score = 0
    }

    if(deltaX >= 1){
        deltaX = 1
    }
    if(touchdown){
        // Adjust speed based on touch drag
        console.log(deltaX)
        player1.speedX += deltaX; // You can adjust the sensitivity by changing the divisor
        player1.speedY += deltaY; // You can adjust the sensitivity by changing the divisor
    }

    player1.update();
    if(playMode=="2P"){
        player2.update();
    }

    if (blackBall.active) {
        const distance1 = Math.sqrt((player1.x - blackBall.x) ** 2 + (player1.y - blackBall.y) ** 2);
        const distance2 = Math.sqrt((player2.x - blackBall.x) ** 2 + (player2.y - blackBall.y) ** 2);

        if (distance1 <= player1.radius + blackBall.radius) {
            blackBall.respawn();
            player1Score++
        }

        if(playMode=="2P"){
            if (distance2 <= player2.radius + blackBall.radius) {
                blackBall.respawn();
                player2Score++
            }
        }
    }

    if((player1Score>=0 || player2Score>=5) && !isPlaying){
        graduallyDisappear('webpage', 2000);
        isPlaying = true
    }

    stage.removeAllChildren();

    if(isPlaying){
        p1_score = new createjs.Text(player1Score,"172px Arial",p1_score_color)
        if(playMode=="2P"){
            p1_score_color = "#443333"
            p2_score_color = "#333344"
            p2_score = new createjs.Text(player2Score,"172px Arial",p2_score_color)
            p1_score.x = canvas.width / 4
            p1_score.y = canvas.height /2
            p2_score.x = canvas.width / 2 + canvas.width / 4
            p2_score.y = canvas.height /2
            p2_score.textAlign = "center"
            p2_score.textBaseline = "middle"
            stage.addChild(p2_score)

            scoreBoard.draw()
        }
        else{
            p1_score.x = canvas.width / 2
            p1_score.y = canvas.height /2
        }
        p1_score.textAlign = "center"
        p1_score.textBaseline = "middle"
        
        stage.addChild(p1_score)
    }


    //blackBall.animate(0.8,1.3);
    blackBall.draw();
    player1.draw();

    if(playMode=="2P"){
        player2.draw();
    }
    
    if(debug){
        // Create a Graphics object to define the line's properties
        var graphics = new createjs.Graphics().setStrokeStyle(2).beginStroke("#FF0000");

        // Define the line's starting and ending points
        graphics.moveTo(touchStartX, touchStartY);
        graphics.lineTo(touchCurrentX, touchCurrentY);

        // Create a Shape object to display the line
        var line = new createjs.Shape(graphics);

        // Add the line to the stage
        stage.addChild(line);
    }
    
    if(player1Score-player2Score>maxScore){

    }


    stage.update();
});