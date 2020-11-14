import Walker from '@entities/walker'

const MASS = 2
const WIDTH = 10
const HEIGHT = 20
const MAX_STEERING = 45
const MIN_STEERING = -45
const THOTTLE_ACCELERATION = 1

export default class Car extends Walker {

    constructor(position) {
        super(position, MASS)
        this.size = {
            width: WIDTH,
            height: HEIGHT
        }

        this.area = 1
    }

    display() {
        push()
        translate(
            this.position.x + this.size.width / 2,
            this.position.y + this.size.height / 2)
        rect(0, 0, this.size.width, this.size.height)
        pop()
    }

    forward() {
        const force = createVector(0, THOTTLE_ACCELERATION)
        this.applyForce(force)
    }

    backward() {
        const force = createVector(0, -THOTTLE_ACCELERATION)
        this.applyForce(force)
    }

}