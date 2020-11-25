import { Vector } from 'p5'
import Walker from '@entities/walker'

const RAMP_SIZE = 300
const RAMP_WIDTH = 5
const BOX_SIZE = 20
const ANGLE = -30

export default class SlidingBox {

    setup() {
        const position = createVector((RAMP_SIZE / 2) - BOX_SIZE, -BOX_SIZE)
        this.box = new Box(position, 10, BOX_SIZE)

        angleMode(DEGREES)
        this.gravity = createVector(0, 0.98).rotate(-ANGLE)
    }

    draw() {
        clear()
        background(220)
        
        push()
        translate(window.canvasCenter.x, window.canvasCenter.y)
        angleMode(DEGREES)
        // rotate(ANGLE)
        rect(-RAMP_SIZE / 2, 0, RAMP_SIZE, RAMP_WIDTH)
        this.box.display()
        pop()

        const center = createVector(
            window.canvasCenter.x + this.box.position.x + this.box.size / 2,
            window.canvasCenter.y + this.box.position.y + this.box.size / 2)

        const y = this.gravity.y * this.box.mass * Math.cos(ANGLE)
        const x = this.gravity.x * this.box.mass * Math.sin(ANGLE)

        Vector.drawArrow(center, Vector.mult(this.gravity, 50), 'red')
        Vector.drawArrow(center, Vector.mult(createVector(0, y), 20), 'blue')
        Vector.drawArrow(center, Vector.mult(createVector(x, 0), 20), 'blue')
    }

}

class Box extends Walker {

    constructor(position, mass, size) {
        super(position, mass)
        this.size = size
    }

    display() {
        square(this.position.x, this.position.y, this.size)
    }

}