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

class Spaceship{
    constructor(size){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.size = size;
    }
    draw(){
        let ship = new createjs.Shape()
        let outline = new createjs.Shape()
        ship.graphics.beginFill("#776677").drawCircle(this.x,this.y,this.size);
        outline.graphics.setStrokeStyle(2).beginStroke("#ff0fff").drawCircle(this.x, this.y, this.size*4)
        stage.addChild(ship)
        stage.addChild(outline)
    }
}

class Enemy{
    constructor(size,key){
        this.x = 0;
        this.y = 0;
        this.size = size;
        this.key = key
    }

    update(pos){
        if(this.key == "W"){
            this.x = canvas.width/2
            this.y = (canvas.height/2)*pos
        }
        if(this.key == "D"){
            this.x = (canvas.width)-(canvas.width/2)*pos
            this.y = (canvas.height/2)
        }
        if(this.key == "S"){
            this.x = canvas.width/2
            this.y = (canvas.height)-(canvas.height/2)*pos
        }
        if(this.key == "A"){
            this.x = (canvas.width/2)*pos
            this.y = canvas.height/2
        }
    }

    play(pos){

    }

    draw(){
        let ship = new createjs.Shape()
        ship.graphics.beginFill("#776677").drawCircle(this.x,this.y,this.size);
        stage.addChild(ship)
    }

}

function print(e){console.log(e)} // xd



var spaceship = new Spaceship(30)

var enemiesOnScreen = []

/*var testSong = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,
                2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,
                3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]*/

const testSong = {"W":[0,[240,299]],
                  "D":[60,300],
                  "S":[120,420],
                  "A":[180,[360,419]]}

var timer = -60
var currentKey = "N"
var thisNote = 0

var timeScale = 1;

var clickTimer = -90

const click = new Audio("CLICK.WAV")

// Define variables to keep track of time
var lastTickTime = 0;  // Initialize with 0
var delay = 500;     // Delay in milliseconds (1 second)

createjs.Ticker.framerate = 60;
createjs.Ticker.on("tick", function (event) {
    stage.removeAllChildren();

    var delta = (event.delta/16.67) * timeScale;
    /*var currentTime = event.time;
    var deltaTime = currentTime - lastTickTime;

    if (deltaTime >= delay) {
        // Play the sound
        click.play();

        // Update the last tick time
        lastTickTime = currentTime;
    }*/
    spaceship.draw()
    
    timer+=delta


    if(timer>=480){
        timer=0
    }

    if(clickTimer>30){
        clickTimer=0
        click.play()
    }
    clickTimer+=delta

    /*if(timer%30==0){
        click.play()
    }*/

    /*for(let key in testSong){

        for(i=0;i<testSong[key].length;i++){
            var thisValue = testSong[key[i]]
            if(Array.isArray(thisValue)){
                var thisNote = thisValue[0]
            }
            else{
                var thisNote = thisValue
            }
            console.log(thisNote)
            if(thisNote==timer){
                console.log(key)
            }
        }
    }*/
    for (let key in testSong) {
        for (let item of testSong[key]) {
            if (Array.isArray(item)) {
                thisNote = item[0]
            }
            else{
                thisNote = item
            }

            /*if(thisNote==timer){
                currentKey = key
                let enemy = new Enemy(20,key)
                enemiesOnScreen.push([enemy,0])
            }*/
            if(timer>=thisNote&&timer<thisNote+40){
                let enemy = new Enemy(20,key)
                enemy.update((timer-thisNote)*0.025)
                enemy.draw()
            }
        }
    }

    /*for(let i= 0;i<enemiesOnScreen.length;i++){
        let e = enemiesOnScreen[i]
        e[0].update(e[1]*0.025)
        e[0].draw()
        e[1]++
        if(e[1]>=40){
            enemiesOnScreen.splice(i, 1)
        }
    }*/
    
    

    stage.update();

})