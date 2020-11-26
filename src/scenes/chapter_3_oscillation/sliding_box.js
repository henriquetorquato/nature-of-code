import { Vector } from 'p5'
import Walker from '@entities/walker'
import { TeleportingBorder } from '../../resources/border/teleporting'

const GRAVITY = 0.98
const FRICTION = 0.001
const RAMP_WIDTH = 5

const BOX_MASS = 1
const BOX_SIZE = 20
const BOX_VELOCITY_LIMIT = 10

const ANGLE_VARIATION = 20
const ANGLE_VELOCITY = 0.01

export default class SlidingBox {

    setup() {
        const position = Vector.add(window.canvasCenter,
            createVector(-BOX_SIZE / 2, -BOX_SIZE))

        this.box = new Box(position, BOX_MASS, BOX_SIZE)
        this.index = 0
    }

    draw() {
        clear()
        background(220)

        const angle = this.nextAngle() * PI / 180
        this.gravity = createVector(
            GRAVITY * this.box.mass * Math.sin(angle),
            GRAVITY * this.box.mass * Math.cos(angle))

        const force = createVector(this.gravity.x - FRICTION * this.gravity.y, 0)
        this.box.applyForce(force)
        this.box.update()

        push()
        translate(window.canvasCenter.x, window.canvasCenter.y)
        rotate(angle)
        rect(-window.canvasWidth, 0, 2 * window.canvasWidth, RAMP_WIDTH)

        const position = Vector.sub(this.box.position, window.canvasCenter)
        this.box.display(position)
        pop()
    }

    nextAngle() {
        this.index += ANGLE_VELOCITY
        return Math.sin(this.index) * ANGLE_VARIATION
    }

}

class Box extends Walker {

    constructor(position, mass, size) {
        super(position, mass)
        this.size = size
        this.canvasBorder = new TeleportingBorder()
        this.velocityLimit = BOX_VELOCITY_LIMIT
    }

    display(position = this.position) {
        square(position.x, position.y, this.size)
    }

}