import Walker from '@entities/walker'

const MASS = 2
const WIDTH = 10
const HEIGHT = 20
const THOTTLE_ACCELERATION = 1
const STEERING_ACCELERATION = 2

export default class Car extends Walker {

    constructor(position) {
        super(position, MASS)
        // To rotate the car forwards
        this.velocity = createVector(0, -1)
        this.size = {
            width: WIDTH,
            height: HEIGHT
        }        
    }

    display() {
        push()
        rectMode(CENTER)
        translate(this.position.x, this.position.y)
        rotate(this.velocity.heading())
        rect(0, 0, this.size.height, this.size.width)
        pop()
    }

    forward() {
        const force = createVector(0, -THOTTLE_ACCELERATION)

        angleMode(DEGREES)
        force.rotate(this.angle)

        this.applyForce(force)
    }

    left() {
        this.angle -= STEERING_ACCELERATION
    }

    right() {
        this.angle += STEERING_ACCELERATION
    }

}