import { Vector } from 'p5'
import Walker from '@entities/walker'
import { BouncingBorder } from '@resources/border'

const BALL_SIZE = 20
const GRAVITY_FORCE = 9.8
const GRAVITY_DECAY = 0.02

export default class GravitationalAcceleration {

    setup() {
        this.ball = new Ball(window.canvasCenter, BALL_SIZE)
        this.ball.velocityLimit = 5
        this.ball.canvasBorder = new BouncingBorder()

        this.longestDistance = Math.sqrt(Math.pow(window.canvasWidth, 2) + Math.pow(window.canvasHeight, 2))

        textFont(window.font);
        textSize(20);
    }

    draw() {
        clear()
        background(220)
        
        this.ball.acceleration = this.accelerationVector()

        this.ball.update()
        this.ball.display()
    }

    accelerationVector() {
        const mouse = createVector(mouseX, mouseY)
        const distance = Vector.sub(mouse, this.ball.position)

        const force = this.forceExponentialDecay(distance.mag())
        text(`Gravitational Pull: ${force}`, 10, 20)

        // This is now a direction vector
        distance.normalize()

        return Vector.mult(distance, force)
    }

    forceExponentialDecay(value) {
        return GRAVITY_FORCE * Math.pow(1 - GRAVITY_DECAY, value)
    }

}

class Ball extends Walker {

    constructor(position, size) {
        super()
        this.position = position
        this.size = size
    }

    display() {
        ellipse(this.position.x, this.position.y, this.size)
    }

}