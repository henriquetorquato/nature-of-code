import { Vector } from 'p5'

const ROD_SIZE = 100
const ROD_WIDTH = 2
const SPHERE_DIAMETER = 20
const SPEED = 3

export default class RotatingBaton {

    setup() {
        this.angle = 0
        this.position = Vector.copy(window.canvasCenter)
    }

    draw() {
        clear()
        background(220)

        push()
        angleMode(DEGREES)
        translate(this.position.x, this.position.y)
        rotate(this.angle)
        fill(100, 100, 200)
        noStroke()
        rect(-ROD_SIZE / 2, -ROD_WIDTH, ROD_SIZE, ROD_WIDTH)
        circle(-ROD_SIZE / 2, 0, SPHERE_DIAMETER)
        circle(ROD_SIZE / 2, 0, SPHERE_DIAMETER)
        pop()

        this.angle = this.angle < 360 ? this.angle + SPEED : 0
    }

}