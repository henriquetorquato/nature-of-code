import { Vector } from 'p5'
import Ball from '../entities/ball'

const BALL_SIZE = 20
const GRAVITATIONAL_FORCE = 1

export default class GravitationalAcceleration {

    setup() {
        this.ball = new Ball(window.canvasCenter, BALL_SIZE)
        this.ball.velocityLimit = 10
    }

    draw() {
        clear()
        background(220)
        
        this.ball.acceleration = this.getPullVector()

        this.ball.update()
        this.ball.display()
    }

    getPullVector() {
        const mouse = createVector(mouseX, mouseY)

        const direction = Vector.sub(mouse, this.ball.position)
        direction.normalize()

        // const force = createVector(
        //     this.ball.position.x / (window.canvasWidth / 2),
        //     this.ball.position.y / (window.canvasHeight / 2))

        return Vector.mult(direction, 0.5)
    }

}