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
class Star{
    constructor(x,y,radius,color,layer){
        this.x = x;
        this.y = y;
        this.velX = 0
        this.velY = 0
        this.radius=radius;
        this.color=color;
        this.friction = 0.92
        this.layer = layer
    }

    draw(){
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.radius,this.radius)
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(){


        this.velX += deltaX*0.1*this.layer
        this.velY += deltaY*0.1*this.layer

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


let stars1 = []
let stars2 = []
let stars3 = []

for(i=0;i<=10;i++){

    randX1 = Math.random()*canvas.width
    randY1 = Math.random()*canvas.height
    randX2 = Math.random()*canvas.width
    randY2 = Math.random()*canvas.height
    randX3 = Math.random()*canvas.width
    randY3 = Math.random()*canvas.height

    newStar1 = new Star(randX1, randY1,2,"#ffffff",0.25)
    newStar2 = new Star(randX2, randY2,4,"#ffffff",0.5)
    newStar3 = new Star(randX3, randY3,8,"#ffffff",1)

    stars1.push(newStar1)
    stars2.push(newStar2)
    stars3.push(newStar3)

}

let star = new Circle(canvas.width/2, canvas.height/2,20,"#ffffff")


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

    stars1.forEach(star =>{
        star.draw()
        star.update()
    })
    stars2.forEach(star =>{
        star.draw()
        star.update()
    })
    stars3.forEach(star =>{
        star.draw()
        star.update()
    })

    deltaX *= 0.98
    deltaY *= 0.98

    requestAnimationFrame(update);
}
update();