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
        this.velX = 0
        this.velY = 0
        this.accX = 0
        this.accY = 0
        this.friction = 0.92
        this.image = new Image()
        this.image.src = "ship.png"
        this.rotation = 0; // Rotation angle in radians
        this.scale = 0.1; // Scale factor
    }

    draw(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale, this.scale);
        ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
        ctx.restore();
    }

    update(){
    }
}

class Star{
    constructor(x,y,radius,color,speedMultiplier){
        this.x = x;
        this.y = y;
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


        this.velX += deltaX*0.1*this.speedMultiplier
        this.velY += deltaY*0.1*this.speedMultiplier

        this.x += this.velX
        this.y += this.velY

        this.velX *= this.friction
        this.velY *= this.friction

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
    constructor(x,y,radius,color,speedMultiplier){
        this.pos = {
            x: x,
            y: y
        };
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


        this.velX += deltaX*0.1*this.speedMultiplier
        this.velY += deltaY*0.1*this.speedMultiplier

        this.x += this.velX
        this.y += this.velY

        this.velX *= this.friction
        this.velY *= this.friction

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

let maxNumStars = 20 // Max number per layer (smaller/further layer)

let minNumStars = 5 // Min number per layer (bigger/closer layer)

let minStarSize = 2

let maxStarSize = 6

let layers = 3

let bit = (maxNumStars - minNumStars)/(layers-1)


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


let spaceship = new Spaceship(canvas.width/2, canvas.height/2)


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

// Begin loop
function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    stars.forEach(layer=>{
        layer.forEach(star=>{
            star.draw()
            star.update()
        })
    })

    spaceship.rotation = -Math.atan2(stars[0][0].velX,stars[0][0].velY)

    spaceship.draw()
    deltaX *= 0.98
    deltaY *= 0.98

    requestAnimationFrame(update);
}
update();