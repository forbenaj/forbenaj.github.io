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
const black = "#000000";
const blue = "#00ff00";
const red = "#FF00FF";

const gray1 = "#111111";
const gray2 = "#222222";
const gray6 = "#666666";

// Player class

/*
                                                                                                         
        █ █████████o   █ ████                  .█.   `█.`████.      ,█' █ ██████████   █ █████████o.             
        █ ████    `██. █ ████                 .███.   `█.`████.    ,█'  █ ████         █ ████    `██.            
        █ ████     `██ █ ████                :█████.   `█.`████.  ,█'   █ ████         █ ████     `██            
        █ ████     ,██ █ ████               . `█████.   `█.`████.,█'    █ ████         █ ████     ,██            
        █ ████.   ,██' █ ████              .█. `█████.   `█.`█████'     █ ████████████ █ ████.   ,██'            
        █ ██████████'  █ ████             .█`█. `█████.   `█. ████      █ ████         █ █████████P'             
        █ ████         █ ████            .█' `█. `█████.   `█ ████      █ ████         █ ████`█b                 
        █ ████         █ ████           .█'   `█. `█████.   █ ████      █ ████         █ ████ `█b.               
        █ ████         █ ████          .█████████. `█████.  █ ████      █ ████         █ ████   `█b.             
        █ ████         █ ████████████ .█'       `█. `█████. █ ████      █ ████████████ █ ████     `██.           
*/
class Player {
    constructor(x, y, radius, color,controlKeys,number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.glowColor = white;
        this.ballColor = color;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 0.5;
        this.bounceFactor = 0.7;
        this.animationSpeed = 0.05;
        this.time = 0;
        this.animFactor = 0;
        this.playing = false
        this.score = 0
        this.controlKeys = controlKeys
        this.number = number
        this.alive = true
    }

    animate(min, max) {

        // Use a sine function to create a smoother animation
        if(this.alive){
            return min + (Math.sin(this.time) * 0.5 + 0.5) * (max - min);
        }
        else{return 1}
    }
    
    update(d) {
        this.speedY += this.gravity;

        // Update position based on speed
        this.x += this.speedX*d;
        this.y += this.speedY*d;

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

    }

    draw() {
        const circle = new createjs.Shape();
        if(this.animFactor<1){
            this.animFactor += 0.05
        }
        circle.graphics.beginFill( this.alive?this.ballColor:black ).drawCircle(this.x, this.y, this.radius*this.animate(1.1, 0.9)*this.animFactor);
        stage.addChild(circle);
    }

    controls() {
        if(this.alive){
            if(this.controlKeys.type=="Gamepad"){
                this.speedX+=this.controlKeys.x
                this.speedY+=this.controlKeys.y
            }
            else{
            if (pressedKeys[this.controlKeys.left]) {
                this.speedX -= 1;
            }
            if (pressedKeys[this.controlKeys.right]) {
                this.speedX += 1;
            }
            if (pressedKeys[this.controlKeys.up]) {
                this.speedY -= 1;
            }
            if (pressedKeys[this.controlKeys.down]) {
                this.speedY += 1;
            }}
        }
    }
}

/*
                                                  
            ,o██████o.     █ █████████o.   █ █████████o   
         . ████     `██.   █ ████    `██.  █ ████    `██. 
        ,█ ████       `█b  █ ████     `██  █ ████     `██ 
        ██ ████        `█b █ ████     ,██  █ ████     ,██ 
        ██ ████         ██ █ ████.   ,██'  █ ████.   ,██' 
        ██ ████         ██ █ █████████P'   █ ██████████   
        ██ ████        ,█P █ ████`█b       █ ████    `██. 
        `█ ████       ,█P  █ ████ `█b.     █ ████      ██ 
         ` ████     ,██'   █ ████   `█b.   █ ████    ,██' 
            `███████P'     █ ████     `██. █ █████████P   
*/

class Orb {
    constructor(radius, color) {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.active = true;
        this.radius = radius;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 0.5;
        this.bounceFactor = 0.7;
        this.animationSpeed = 0.05;
        this.time = 0;

        this.animFactor = 0
    }

    getRandomPosition(min, max) {
        return Math.random() * (max - min) + min;
    }

    animate(min, max) {
        return min + (Math.sin(this.time) * 0.5 + 0.5) * (max - min);
    }
    
    update(d) {
        this.speedY += this.gravity;

        // Update position based on speed
        this.x += this.speedX*d;
        this.y += this.speedY*d;

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

    }

    checkCollisionWith(otherBall) {
        const dx = this.x - otherBall.x;
        const dy = this.y - otherBall.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
    
        if (distance < this.radius + otherBall.radius) {
            // Collision detected, make both balls bounce in opposite directions
            const angle = Math.atan2(dy, dx);
            const speed1 = Math.sqrt(this.speedX ** 2 + this.speedY ** 2);
            const speed2 = Math.sqrt(otherBall.speedX ** 2 + otherBall.speedY ** 2);
    
            const direction1 = Math.atan2(this.speedY, this.speedX);
            const direction2 = Math.atan2(otherBall.speedY, otherBall.speedX);
    
            const newSpeedX1 = speed1 * Math.cos(direction1 - angle);
            const newSpeedY1 = speed1 * Math.sin(direction1 - angle);
            const newSpeedX2 = speed2 * Math.cos(direction2 - angle);
            const newSpeedY2 = speed2 * Math.sin(direction2 - angle);
    
            const finalSpeedX1 = ((this.radius - otherBall.radius) * newSpeedX1 + (this.radius + otherBall.radius) * newSpeedX2) / (this.radius + otherBall.radius);
            const finalSpeedX2 = ((otherBall.radius - this.radius) * newSpeedX2 + (this.radius + otherBall.radius) * newSpeedX1) / (this.radius + otherBall.radius);
    
            this.speedX = Math.cos(angle) * finalSpeedX1 + Math.cos(angle + Math.PI / 2) * newSpeedY1;
            this.speedY = Math.sin(angle) * finalSpeedX1 + Math.sin(angle + Math.PI / 2) * newSpeedY1;
            otherBall.speedX = Math.cos(angle) * finalSpeedX2 + Math.cos(angle + Math.PI / 2) * newSpeedY2;
            otherBall.speedY = Math.sin(angle) * finalSpeedX2 + Math.sin(angle + Math.PI / 2) * newSpeedY2;
    
            // Move balls to avoid overlap
            const overlap = 0.5 * (this.radius + otherBall.radius - distance + 1);
            this.x += overlap * Math.cos(angle);
            this.y += overlap * Math.sin(angle);
            otherBall.x -= overlap * Math.cos(angle);
            otherBall.y -= overlap * Math.sin(angle);
        }
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
            circle.graphics.beginFill(gray1).drawCircle(this.x, this.y, this.radius*1.8*this.animate(0.8, 1.5)*this.animFactor);
            circle.graphics.beginFill(gray2).drawCircle(this.x, this.y, this.radius*1.5*this.animate(0.8, 1.3)*this.animFactor);
            circle.graphics.beginFill(gray6).drawCircle(this.x, this.y, this.radius*this.animate(0.8, 1.2)*this.animFactor);
            circle.graphics.beginFill(this.color).drawCircle(this.x, this.y, (this.radius/2)*this.animate(1.1, 0.9)*this.animFactor);
            stage.addChild(circle);
            this.time += this.animationSpeed;
            if (this.time >= Math.PI * 2){
                this.time=0
            }
        }
    }

}

/*
        ███████  ██████  ██████  ██████  ███████ ██████   ██████   █████  ██████  ██████  
        ██      ██      ██    ██ ██   ██ ██      ██   ██ ██    ██ ██   ██ ██   ██ ██   ██ 
        ███████ ██      ██    ██ ██████  █████   ██████  ██    ██ ███████ ██████  ██   ██ 
             ██ ██      ██    ██ ██   ██ ██      ██   ██ ██    ██ ██   ██ ██   ██ ██   ██ 
        ███████  ██████  ██████  ██   ██ ███████ ██████   ██████  ██   ██ ██   ██ ██████  
                                                                                          
                                                                                          
*/
class ScoreBoard{
    constructor(){
        this.x = canvas.width / 2;
        this.y = 20;
        this.redSide = 0.5
        this.blueSide = 0.5
        this.pos = 0
        this.barSize = canvas.width / 2-40
        this.barBits = this.barSize/maxScore
        this.animFactor = 0

    }
    drawBar(){
        
        let points = player1.score - player2.score

        let redBarSize = this.barBits*points+this.barSize

        const p1scoreBar = new createjs.Shape()
        const p2scoreBar = new createjs.Shape()
        p2scoreBar.graphics.beginFill("#000088").drawRect(40,this.y,canvas.width-80,10)
        p1scoreBar.graphics.beginFill("#880000").drawRect(40,this.y,redBarSize,10)
        stage.addChild(p2scoreBar);
        stage.addChild(p1scoreBar);
    }
    drawNumbers(player){


        var scoreText = new createjs.Text(player.score,"172px Arial","#444444")

        if(players.length==1){
            scoreText.x = canvas.width / 2
            scoreText.y = canvas.height /2
        }
        
        else{
            if(this.animFactor<1){
                this.animFactor += 0.01
            }
            if(player.number == 1){
                scoreText = new createjs.Text(player.score,"172px Arial","#443333")
                scoreText.x = (canvas.width / 2)-((canvas.width / 2)*this.animFactor)+ (canvas.width / 4)*this.animFactor
                scoreText.y = (canvas.height /2)
            }
            else if(player.number == 2){
                scoreText = new createjs.Text(player.score,"172px Arial","#333344")
                scoreText.x = (canvas.width / 2)-((canvas.width / 2)*this.animFactor)+(canvas.width / 2 + canvas.width / 4)*this.animFactor
                scoreText.y = (canvas.height /2)
            }

        }

        scoreText.textAlign = "center"
        scoreText.textBaseline = "middle"
        
        stage.addChild(scoreText)
        
    }
}

window.addEventListener("resize", handleResize);





/*
      ███████                                                   
      █       █    █ █    █  ████  █████ █  ████  █    █  ████  
      █       █    █ ██   █ █    █   █   █ █    █ ██   █ █      
      █████   █    █ █ █  █ █        █   █ █    █ █ █  █  ████  
      █       █    █ █  █ █ █        █   █ █    █ █  █ █      █ 
      █       █    █ █   ██ █    █   █   █ █    █ █   ██ █    █ 
      █        ████  █    █  ████    █   █  ████  █    █  ████  
*/

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







  /*
      █     █                                                    
      █     █   ██   █████  █   ██   █████  █      ██████  ████  
      █     █  █  █  █    █ █  █  █  █    █ █      █      █      
      █     █ █    █ █    █ █ █    █ █████  █      █████   ████  
       █   █  ██████ █████  █ ██████ █    █ █      █           █ 
        █ █   █    █ █   █  █ █    █ █    █ █      █      █    █ 
         █    █    █ █    █ █ █    █ █████  ██████ ██████  ████  
*/

var maxScore = 5

const controls ={
    Arrows : {
        left: "ArrowLeft",
        right: "ArrowRight",
        up: "ArrowUp",
        down: "ArrowDown"
    },
    WASD : {
        left: "KeyA",
        right: "KeyD",
        up: "KeyW",
        down: "KeyS"
    },
    Joystick : {
        type: "Gamepad",
        x:0,
        y:0,
        left: 0,
        right: 0,
        up: 0,
        down: 0
    }
}

var pressedKeys = {}

// Initialize the game
const player1 = new Player(canvas.width / 4 +canvas.width / 2, canvas.height / 2, 25, red, controls.WASD,1);
const player2 = new Player(canvas.width / 4, canvas.height / 2, 25, blue,controls.Arrows,2);
const blackBall = new Orb(30, white);

const scoreBoard = new ScoreBoard()



var isPlaying = false


debug = true

const winAudio1 = new Audio("sound/win1.mp3")
const winAudio2 = new Audio("sound/win2.mp3")
const catchSounds = ["sound/waw.mp3","sound/wow.mp3"]

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
    pressedKeys[event.code] = true;
});

window.addEventListener("keyup", function (event) {
    delete pressedKeys[event.code];
});



if (navigator.getGamepads) {
    // Initialize the gamepad state
    var gamepadState = {};

}

function updateGamepadState() {
    const gamepads = navigator.getGamepads();

    for (const gamepad of gamepads) {
      if (gamepad) {
        // Store the state of each button
        gamepadState[gamepad.index] = {
          axes: gamepad.axes.slice(),
          buttons: gamepad.buttons.map(button => button.value),
        };
      }
    }

  }

var players = [player1,player2]

let timeScale = 0.7






/*
                                                                                                                 
                                                                                                                 
             SSSSSSSSSSSSSSS      tttt                                                        tttt           !!! 
           SS███████████████S  ttt███t                                                     ttt███t          !!█!!
          S█████SSSSSS██████S  t█████t                                                     t█████t          !███!
          S█████S     SSSSSSS  t█████t                                                     t█████t          !███!
          S█████S        ttttttt█████ttttttt      aaaaaaaaaaaaa  rrrrr   rrrrrrrrr   ttttttt█████ttttttt    !███!
          S█████S        t█████████████████t      a████████████a r████rrr█████████r  t█████████████████t    !███!
           S████SSSS     t█████████████████t      aaaaaaaaa█████ar█████████████████r t█████████████████t    !███!
            SS██████SSSSStttttt███████tttttt               a████arr██████rrrrr██████rtttttt███████tttttt    !███!
              SSS████████SS    t█████t              aaaaaaa█████a r█████r     r█████r      t█████t          !███!
                 SSSSSS████S   t█████t            aa████████████a r█████r     rrrrrrr      t█████t          !███!
                      S█████S  t█████t           a████aaaa██████a r█████r                  t█████t          !!█!!
                      S█████S  t█████t    tttttta████a    a█████a r█████r                  t█████t    tttttt !!! 
          SSSSSSS     S█████S  t██████tttt█████ta████a    a█████a r█████r                  t██████tttt█████t     
          S██████SSSSSS█████S  tt██████████████ta█████aaaa██████a r█████r                  tt██████████████t !!! 
          S███████████████SS     tt███████████tt a██████████aa███ar█████r                    tt███████████tt!!█!!
           SSSSSSSSSSSSSSS         ttttttttttt    aaaaaaaaaa  aaaarrrrrrr                      ttttttttttt   !!! 
                                                                                                                 
                                                                                                                 
                                                                                                                 
                                                                                                                 
                                                                                                                 
                                                                                                                 
                                                                                                                 
*/



createjs.Ticker.framerate = 60;
createjs.Ticker.on("tick", function (event) {
    const delta = (event.delta/16.67) * timeScale;
    stage.removeAllChildren();


    updateGamepadState()
    //blackBall.update(delta);
    blackBall.draw()

    for(i=0;i<players.length;i++){

        let player = players[i]
        player.controls();
        player.update(delta);
        player.draw();

        if (blackBall.active) {
            const distance = Math.sqrt((player.x - blackBall.x) ** 2 + (player.y - blackBall.y) ** 2);

            if (distance <= player.radius + blackBall.radius) {
                blackBall.respawn();
                new Audio(catchSounds[i]).play()
                player.score++
            }

        }
        

        if((player.score>=3) && !isPlaying){
            graduallyDisappear('webpage', 2000);
            isPlaying = true
        }
        if(isPlaying){
            scoreBoard.drawNumbers(player)
            if(players.length>1){
                scoreBoard.drawBar()
            }
        }

    }
    if(player1.score-player2.score>maxScore){
        player2.alive = false
        winAudio1.play()
    }
    else if(player2.score-player1.score>maxScore){
        player1.alive = false
        winAudio2.play()
    }





    for (const [index, state] of Object.entries(gamepadState)) {
        controls.Joystick.x = (state.axes[0]) + (state.buttons[14]*-1) + (state.buttons[15])
        controls.Joystick.y = state.axes[1]*1.7 + (state.buttons[12]*-1) + (state.buttons[13])
        controls.Joystick.up = state.buttons[13]
        controls.Joystick.down = state.buttons[14]
        controls.Joystick.left = state.buttons[15]
        controls.Joystick.right = state.buttons[16]
        onScreenConsole("x: "+state.axes[0]+"\ny: "+state.axes[1]+"\n"+state.buttons)
    }

    


    stage.update();
 
});







function onScreenConsole(e){
    var scoreText = new createjs.Text(e,"24px Arial","#f0fff0")

    scoreText.x = canvas.width / 8
    scoreText.y = canvas.height /8
    
    stage.addChild(scoreText)
}