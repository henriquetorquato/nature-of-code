import { Vector } from 'p5'

const ANGLE_SPEED = 0.01
const RADIUS_SPEED = 0.05

export default class Spiral {

    setup() {
        this.center = Vector.copy(window.canvasCenter)
        this.angle = 0
        this.radius = 0

        background(0)
    }

    draw() {
        const x = this.radius * Math.cos(this.angle)
        const y = this.radius * Math.sin(this.angle)

        push()
        translate(this.center.x, this.center.y)
        noStroke()
        fill(255)
        circle(x, y, 20)
        pop()

        this.radius += RADIUS_SPEED
        this.angle = this.angle > 360 ? 0 : this.angle + ANGLE_SPEED
    }

}