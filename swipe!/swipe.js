// Get a reference to the canvas container div
var canvasContainer = document.getElementById("canvasContainer");

// Create a new canvas element
var canvas = document.createElement("canvas");

// Set the canvas size to match the container size
canvas.width = canvasContainer.offsetWidth;
canvas.height = canvasContainer.offsetHeight;

// Append the canvas to the container
canvasContainer.appendChild(canvas);

var ctx = canvas.getContext("2d")

class Circle{
    constructor(x,y,radius,color){
        this.x = x;
        this.y = y;
        this.velX = 0
        this.velY = 0
        this.accX = 0
        this.accY = 0
        this.radius=radius;
        this.color=color;
        this.friction = 0.92
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(){
        this.velX += this.accX
        this.velY += this.accY

        this.x += this.velX
        this.y += this.velY

        this.velX *= this.friction
        this.velY *= this.friction

        this.accX *= this.friction
        this.accY *= this.friction
    }
}

class Spaceship{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.screenX
        this.screenY
        this.velX = 0
        this.velY = 0
        this.accX = 0
        this.accY = 0
        this.friction = 0.92
        this.image = new Image()
        this.image.src = "ship.png"
        this.rotation = 0; // Rotation angle in radians
        this.scale = 0.1; // Scale factor
        this.color = "red"
    }

    draw(){
        ctx.save();
        ctx.translate(this.screenX,this.screenY);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale, this.scale);
        ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
        ctx.restore();
    }

    update(){

        this.screenX = this.x - camera.x
        this.screenY = this.y - camera.y

        this.velX += deltaX*0.1
        this.velY += deltaY*0.1


        this.x -= this.velX
        this.y -= this.velY

        this.velX *= this.friction
        this.velY *= this.friction
    }
}

class Star{
    constructor(x,y,radius,color,speedMultiplier){
        this.x = x;
        this.y = y;
        this.screenX
        this.screenY
        this.velX = 0
        this.velY = 0
        this.radius=radius;
        this.color=color;
        this.friction = 0.92
        this.speedMultiplier = speedMultiplier
    }

    draw(){
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.radius,this.radius)
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(){


        /*this.velX += deltaX*0.1*this.speedMultiplier
        this.velY += deltaY*0.1*this.speedMultiplier

        this.x += this.velX
        this.y += this.velY

        this.velX *= this.friction
        this.velY *= this.friction*/

        if(this.x < 0){
            this.x = canvas.width
            this.y = Math.random()*canvas.height
        }
        if(this.x > canvas.width){
            this.x = 0
            this.y = Math.random()*canvas.height
        }
        if(this.y < 0){
            this.y = canvas.height
            this.x = Math.random()*canvas.width
        }
        if(this.y > canvas.height){
            this.y = 0
            this.x = Math.random()*canvas.width
        }

    }
}
class Planet{
    constructor(x,y,radius,color){
        this.x= x
        this.y= y
        this.velX = 0
        this.velY = 0
        this.radius=radius;
        this.color=color;
    }

    draw(){
        ctx.beginPath();
        ctx.rect(this.x-camera.x,this.y-camera.y,this.radius,this.radius)
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(){

    }
}

class Camera {
    constructor(x,y){
        this.x = x
        this.y = y
        this.easing = 0.1; // Adjust this value to control the smoothness (lower values are smoother)
    }

    follow(target) {
        /*// Calculate the desired camera position centered on the target
        const targetX = target.x - canvas.width / 2;
        const targetY = target.y - canvas.height / 2;

        // Use easing to smoothly interpolate towards the target position
        this.x += (targetX - this.x) * this.easing;
        this.y += (targetY - this.y) * this.easing;
*/
        this.x = target.x-canvas.width/2
        this.y = target.y-canvas.height/2
    }
}
class Minimap {
    constructor(){
        this.weight
        this.x
        this.y
        this.w
        this.h
        this.indicator

    }
    drawMap(){
    
        this.weight = (canvas.width + canvas.height)/2

        this.x = canvas.width -this.weight/3.5
        this.y = canvas.height -this.weight/3.5
    
        this.w = this.weight/4
        this.h = this.weight/4

        ctx.beginPath();
        ctx.strokeStyle = "grey";
                
        // Set the stroke width
        ctx.lineWidth = 2;
        
        // Draw the empty rectangle
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        ctx.closePath();

    }
    drawIndicator(obj){
    
        
        this.indicator = {
            x: (this.w/world.width)*obj.x+this.x,
            y: (this.h/world.height)*obj.y+this.y,
            color: obj.color
        }
    
        ctx.beginPath();
        ctx.rect(this.indicator.x,this.indicator.y,5,5)
        ctx.fillStyle = this.indicator.color;
        ctx.fill();
        ctx.closePath();

    }
}


class Starsystem{
    constructor(maxStars=20,minStars=5,minSize=2,maxSize=6,layers=3){

        this.maxNumStars = maxStars // Max number per layer (smaller/further layer)

        this.minNumStars = minStars // Min number per layer (bigger/closer layer)

        this.minStarSize = minSize

        this.maxStarSize = maxSize

        this.layers = layers

        this.bit = (this.maxNumStars - this.minNumStars)/(this.layers-1)


        this.stars = []
    }

    setup(){

        //let screenX = camera.x-world.width/2
        //let screenY = camera.y-world.height/2

        for(i = 0; i < this.layers; i++){

            let newLayer = []
            let numStars = this.maxNumStars-this.bit*i // The number of stars on this layer
            let starSize = (this.maxStarSize/this.layers)*i+this.minStarSize

            for(j = 0;j < numStars; j++){
            
                let scrX  = Math.random() * canvas.width;
                let scrY = Math.random() * canvas.height;

            
                let currentStar = {screenX:scrX, screenY:scrY, size:starSize};
                newLayer.push(currentStar);
            }
            this.stars.push(newLayer)
        }
    }

    draw(star){

        //let cameraOffsetX = camera.x-world.width/2+canvas.width/2 // Camera offset to center X
        //let cameraOffsetY = camera.y-world.height/2+canvas.height/2 // Camera offset to center Y


        ctx.beginPath();
        ctx.rect(
            star.screenX,
            star.screenY,
            star.size,star.size)
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.closePath();
    }

    update(star){
        let sm = star.size/this.maxStarSize // Speed multiplier depending on layer

        star.screenX += spaceship.velX*sm
        star.screenY += spaceship.velY*sm

        if(star.screenX < 0){
            star.screenX = canvas.width
            star.screenY = (Math.random()*canvas.height)
        }
        if(star.screenX > canvas.width){
            star.screenX = 0
            star.screenY = (Math.random()*canvas.height)
        }
        if(star.screenY < 0){
            star.screenY = canvas.height
            star.screenX = (Math.random()*canvas.width)
        }
        if(star.screenY > canvas.height){
            star.screenY = 0
            star.screenX = (Math.random()*canvas.width)
        }

    }

}

let minimap = new Minimap()

var world = {width:100000,height:100000}

var camera = new Camera(world.width/2-canvas.width/2,world.height/2-canvas.height/2)

let planet = new Planet(50200,50120,20,"#fba4ff")

let maxNumStars = 20 // Max number per layer (smaller/further layer)

let minNumStars = 5 // Min number per layer (bigger/closer layer)

let minStarSize = 2

let maxStarSize = 6

let layers = 3

let bit = (maxNumStars - minNumStars)/(layers-1)

let starsystem = new Starsystem(20,5,2,6,3)

let stars = []

for(i = 0; i < layers; i++){

    let newLayer = []
    let numStars = maxNumStars-bit*i // The number of stars on this layer
    let starSize = (maxStarSize/layers)*i+minStarSize

    for(j = 0;j < numStars; j++){

        let randX = Math.random() * canvas.width;
        let randY = Math.random() * canvas.height;
    
        newStar = new Star(randX, randY, starSize, "#ffffff", starSize/maxStarSize);
        newLayer.push(newStar);
    }
    stars.push(newLayer)
}


let spaceship = new Spaceship(50000, 50000)


// Define the touch objects
let startX, startY, endX, endY, lastX=0, lastY=0;

var deltaX = 0;
var deltaY = 0;

addEventListener("touchstart", (event)=>{
    
    lastX = event.touches[0].clientX
    lastY = event.touches[0].clientY
})

// Listen to touch
addEventListener("touchmove", (event)=>{
    startX = lastX;
    startY = lastY;
    endX = event.touches[0].clientX
    endY = event.touches[0].clientY


    deltaX = endX - startX 
    deltaY = endY - startY

    lastX = endX;
    lastY = endY
    
})

addEventListener("touchend", (event)=>{

})

// Listen to mouse

let isMouseDown = false;


canvas.addEventListener("mousedown", (e) => {
    isMouseDown = true;
  });


addEventListener("mousemove", (event)=>{
    event.preventDefault();
    if(isMouseDown){
        startX = lastX;
        startY = lastY;
        endX = event.clientX
        endY = event.clientY

        deltaX = endX - startX 
        deltaY = endY - startY

        lastX = endX;
        lastY = endY
    }
    else{
        lastX = event.clientX
        lastY = event.clientY
    }
})

canvas.addEventListener("mouseup", () => {
    if (isMouseDown) {
        isMouseDown=false
    }
})

starsystem.setup()




function printToGame(text){
    ctx.font = "30px Arial";

    // Set the text color
    ctx.fillStyle = "#ff0fff";
    
    // Position and text to draw
    var x = 30;
    var y = 50;
    
    // Use fillText to draw the text on the canvas
    ctx.fillText(text, x, y);
}



// Begin loop
function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //camera.update()

    starsystem.stars.forEach(layer=>{
        layer.forEach(star=>{
            starsystem.update(star)
            starsystem.draw(star)
        })
    })

    camera.follow(spaceship)
    
    spaceship.rotation = -Math.atan2(spaceship.velX,spaceship.velY)

    spaceship.update()
    spaceship.draw()

    planet.update()
    planet.draw()

    minimap.drawMap()

    minimap.drawIndicator(spaceship)
    minimap.drawIndicator(planet)
    

    deltaX *= 0.98
    deltaY *= 0.98
    printToGame(starsystem.stars[0][0].screenX)
    requestAnimationFrame(update);
}
update();