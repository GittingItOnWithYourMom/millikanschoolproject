const ballimage = document.getElementById('ball')
const boximage = document.getElementById('box')

//physics

class physicsobject{
    constructor(image, mass, friction, initialX, initialY, posX, posY, velX, velY, accX, accY, deltaTX, deltaTY){
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
    }
    moveImage(){
        var amount = "translate(" +this.posX+ "px, " +this.posY+ "px)"
        this.image.style.transform = amount
    }
}

var ball = new physicsobject(ballimage, 50, 100, 0, 100, 100, 100, 0, 0, 0, 0, 0, 0)
var box = new physicsobject(boximage, 100, 900, 0.2, 0, 900, 0, 0, 0, 0, 0, 0, 0)

var framerate = 1
var physics_objects = [ball, box]
var prevScroll
var newScroll
var prevWindow
var newWindow

var friction = 0
setInterval(() => {
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

        object.initialY = object.posY
        object.initialX = object.posX
        if (object.posY > bottom + scrollY){
            object.accY -= object.accY
            object.velY -= object.velY
            object.deltaTY = 0
            object.normalX = -9.8
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

        var ForceK = normalX * object.friction
        //if (object.accX > ForceK){
        //    ForceK = normalX * object.friction
        //}
        console.log(normalX)
        object.accY = 9.8
        object.accX = 0 + ForceK

        object.posY = object.initialY + object.velY*object.deltaTY*limiter + object.accY*object.deltaTY*object.deltaTY*limiter + offset
        object.posX = object.initialX + object.velX*object.deltaTX*limiter + object.accX*object.deltaTX*object.deltaTX*limiter
        object.deltaTY += 1
        object.deltaTX += 1
        object.moveImage()
        console.log()
    })
}, framerate)

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