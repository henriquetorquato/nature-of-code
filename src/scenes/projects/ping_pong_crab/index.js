import { Vector } from 'p5'
import Walker from '@entities/walker'
import { BouncingCircleBorder } from '@resources/border'

const ROTATION_SPEED = 0.2
const MOUSE_ACCELERATION_PULL = 15
const MOUSE_ACCELERATION_DECAY = 0.02

const DEBUG = true

export default class PingPongCrab {

    setup() {
        this.crab = new Crab(Vector.copy(window.canvasCenter))
    }

    draw() {
        clear()
        background(255)

        this.crab.update()
        this.crab.display()   
    }
}

const CRAB_SIZE = 50
const CRAB_VELOCITY_LIMIT = 10
const CRAB_ACCELERATION_LIMIT_X = 2
const CRAB_ACCELERATION_LIMIT_Y = 5
const CRAB_EYE_SIZE = 5

class Crab extends Walker {

    constructor(position) {
        super(position, CRAB_SIZE)
        this.velocityLimit = CRAB_VELOCITY_LIMIT
        this.canvasBorder = new BouncingCircleBorder(CRAB_SIZE)

        this.facingAngle = 0
    }

    update() {
        const mousePosition = createVector(mouseX, mouseY)
        const mouseDistance = Vector.sub(mousePosition, this.position)
        const mouseDistanceMag = mouseDistance.mag()

        if (mouseDistanceMag > CRAB_SIZE) {
            const mouseDirection = mouseDistance.normalize()
            this.facingAngle = createVector(1, 0).normalize().angleBetween(mouseDirection)

            if (DEBUG) Vector.drawArrow(this.position, Vector.mult(mouseDirection, 100), 'blue')
            
            const mouseForce = MOUSE_ACCELERATION_PULL * Math.pow(1 - MOUSE_ACCELERATION_DECAY, mouseDistanceMag)
            const mousePull = Vector.mult(mouseDirection, mouseForce)

            if (mousePull.x > CRAB_ACCELERATION_LIMIT_X) {
                mousePull.x = CRAB_ACCELERATION_LIMIT_X
            }

            if (mousePull.y > CRAB_ACCELERATION_LIMIT_Y) {
                mousePull.y = CRAB_ACCELERATION_LIMIT_Y
            }

            // if (DEBUG) Vector.drawArrow(this.position, Vector.mult(mousePull, 100), 'red')

            this.acceleration = mousePull
        } else {
            this.velocity.mult(0)
        }

        super.update()
    }

    display() {
        // Draw Body
        push()
        noStroke()
        rectMode(CENTER)
        translate(this.position.x, this.position.y)
        fill(252, 132, 3)
        rotate(this.facingAngle)
        rect(0, 0, CRAB_SIZE, CRAB_SIZE)
        pop()

        // Draw Eyes
        const eyeX = 25
        const rightEyeY = (CRAB_SIZE / 2) - (CRAB_EYE_SIZE * 2)
        const leftEyeY = (-CRAB_SIZE / 2) + CRAB_EYE_SIZE

        push()
        noStroke()
        rectMode(CORNER)
        translate(this.position.x, this.position.y)
        fill(0, 0, 0)
        rotate(this.facingAngle)
        rect(eyeX, rightEyeY, CRAB_EYE_SIZE, CRAB_EYE_SIZE)
        rect(eyeX, leftEyeY, CRAB_EYE_SIZE, CRAB_EYE_SIZE)
        pop()
    }
}