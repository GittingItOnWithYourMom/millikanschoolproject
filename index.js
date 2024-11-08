const ballimage = document.getElementById('ball')
const boximage = document.getElementById('box')
const d1 = document.getElementById('d1')
const d2 = document.getElementById('d2')


function ready(){
  physics_objects.forEach((object) => {
    object.createText()
  })
}

//physics

class physicsobject{
    constructor(image, mass, friction, initialX, initialY, posX, posY, velX, velY, accX, accY, deltaTX, deltaTY, text, para){
        this.image = image
        this.mass = mass
        this.friction = friction
        this.initialX = initialX
        this.initialY = initialY
        this.posX = posX
        this.posY = posY
        this.velX = velX
        this.velY = velY
        this.accX = accX
        this.accY = accY
        this.deltaTX = deltaTX
        this.deltaTY = deltaTY
        this.text = text
    }
    moveImage(){
        var amount = "translate(" +this.posX+ "px, " +this.posY+ "px)"
        this.image.style.transform = amount
    }
    createText(){
      this.para = document.createElement("p");
      this.text = document.createTextNode("This is a new paragraph.")
      this.para.appendChild(this.text);
      this.para.style.position = "absolute"
      this.para.style.zIndex = "1"
    }
    updateText(){
      var amount = "translate(" +this.posX+ "px, " +this.posY+ "px)"
      this.para.style.transform = amount
      this.para.textContent = "velx: " + this.velX
      this.para.textContent = "vely: " + this.velY
    }
}

var ball = new physicsobject(ballimage, 50, 0, 0, 100, 100, 100, 0, 0, 0, 0, 0, 0)
var box = new physicsobject(boximage, 100, 0.5, 200, 0, 200, 0, 200, 0, 0, 0, 0, 0)

var framerate = 1
var physics_objects = [ball, box]
var prevScroll
var newScroll
var prevWindow
var newWindow

var friction = 0
setInterval(() => {
    // calculate border speeds and positions
    prevScroll = newScroll
    newScroll = scrollY
    var accBorder = scrollY - prevScroll
    prevWindow = newWindow
    newWindow = innerHeight
    var accWindow = innerHeight - prevWindow

    physics_objects.forEach((object) => {
        var bottom = window.innerHeight - 105
        var top = 0
        var rightwall = window.innerWidth - 130
        var leftwall = 0
        var offset = 0
        const limiter = 0.00001
        var normalX = 0
        var normalY = 0
        
        // checks if object is touching a side
        object.initialY = object.posY
        object.initialX = object.posX
        if (object.posY > bottom + scrollY){
            object.accY -= object.accY
            object.velY -= object.velY
            object.deltaTY = 0
            normalY = 9.8
            if (accBorder < 0){
                offset += accBorder
            }
            if (accWindow < 0){
                offset += accWindow
            }
        }
        if (object.posY < top){
            object.accY -= object.accY
            object.velY -= object.velY
            object.deltaTY = 0
        }
        if (object.posX > rightwall){
            object.accX -= object.accX
            object.velX -= object.velX
            object.deltaTX = 0
        }
        if (object.posX < leftwall){
            object.accX -= object.accX
            object.velX -= object.velX
            object.deltaTX = 0
        }
        
        // calculates and applies friction
        var ForceK = 0
        if (Math.round(object.velX) == 0){
            ForceK = 0
            object.velX = 0
        }
        else if (object.velX > 0){
            ForceK = normalY * object.friction * -0.1
        }
        else{
            ForceK = normalY * object.friction * 0.1
        }
        object.accY = 9.8
        object.velX += ForceK
        
        var prevX = physics_objects[1].posX
        var prevY = physics_objects[1].posY
        
        // update object position
        object.posY = object.initialY + object.velY*object.deltaTY*limiter + object.accY*object.deltaTY*object.deltaTY*limiter + offset
        object.posX = object.initialX + object.velX*object.deltaTX*limiter + object.accX*object.deltaTX*object.deltaTX*limiter
        object.deltaTY += 1
        object.deltaTX += 1
        object.moveImage()
        object.updateText()
        
        // text
        d1.textContent = "velX: "+String(Math.round(prevX - physics_objects[1].posX))
        d2.textContent = "velY: "+String(Math.round(prevY - physics_objects[1].posY))
        var debugY = physics_objects[1].posY - 5
        var debugX = physics_objects[1].posX + 10
        d1.style.transform = "translate(" +debugX+ "px, " +debugY+ "px)"
    })
}, framerate)

// grabbing
function moveobject(object){
    setTimeout(() => {
        physics_objects[object].posX = mousex - 50
        physics_objects[object].posY = mousey - 50
        physics_objects[object].initialX = mousex - 50
        physics_objects[object].initialY = mousey - 50
        physics_objects[object].velX = 0
        physics_objects[object].velY = 0
    },10)
}


// calculates mouse velocity
var mousex
var mousey
var mouseprevX
var mouseprevY
var mouse_velX
var mouse_velY
document.addEventListener('mousemove', (event) => {
    mousex = event.clientX;
    mousey = event.clientY;
    mouse_velX = mousex - mouseprevX
    mouse_velY = mousey - mouseprevY
    mouseprevX = mousex
    mouseprevY = mousey
})

// all code is property of Liam Neubauer and you can take it I don't care