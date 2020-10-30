import { Vector } from 'p5'
import Walker from '../entities/walker'
import { BouncingCircleBorder } from '../resources/border'

const BALL_SIZE = 20
const VELOCITY_LIMIT = 10

export default class PortalGels {

    setup() {
        const position = Vector.copy(window.canvasCenter)
        this.ball = new Ball(position, BALL_SIZE)
        this.gel = new Gel(createVector(100, 100), 0.01)
    }

    draw() {
        clear()
        background(220)

        this.gel.display()
        // TO-DO: Check if there is a collision, and apply gel friction

        this.ball.update()
        this.ball.display()
    }

}

class Ball extends Walker {

    constructor(position, diameter) {
        super(position, diameter)
        this.diameter = diameter
        this.radius = diameter / 2

        this.canvasBorder = new BouncingCircleBorder(this.radius)
        this.velocityLimit = VELOCITY_LIMIT

        this.acceleration = Vector.mult(Vector.random2D(), 10)
    }

    display() {
        push()
        noStroke()
        circle(this.position.x, this.position.y, this.diameter)
        pop()
    }

}

class Gel {

    constructor(position, frictionCoeficient) {
        this.position = position
        this.coeficient = frictionCoeficient
        this.size = Math.randomBetween(20, 40)

        this.rect = {
            left: this.position.x,
            right: this.position.x + this.size,
            top: this.position.y,
            bottom: this.position.y + this.size
        }
    }

    display() {
        push()
        noStroke()
        fill(60, 100, 200)
        square(this.position.x, this.position.y, this.size)
        pop()
    }

    collides(ball) {
        if (!this.shouldCheck(ball.position, ball.size)) {
            return false
        }

        const ballRect = {
            left: ball.position.x,
            right: ball.position.x + ball.size,
            top: ball.position.y,
            bottom: ball.position.y + ball.size
        }

        // TO-DO: Compute the intersection of the two areas
    }

    shouldCheck(position, size) {
        const gelCenter = createVector(
            this.position.x + this.size / 2,
            this.position.y + this.size / 2)

        const ballCenter = createVector(
            position.x + size / 2,
            position.y + size / 2)

        // Distance between two points
        const distance = Math.sqrt(
            Math.pow(gelCenter.x - ballCenter.x, 2) + Math.pow(gelCenter.y - ballCenter.y, 2)
        )

        // The min distance is the sum of the distances
        // from the center to every side of both rects
        const minDistance = this.size / 2 + size / 2

        return distance <= minDistance
    } 

}