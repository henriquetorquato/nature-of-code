import { Vector } from 'p5'
import { BouncingBorder } from '../border'

const MAX_VELOCITY = 1
const ACCELERATION_SCALE = 2

export default class SlitheringSnake {

    constructor(position) {
        this.width = 3
        this.height = 60

        this.position = createVector(window.canvasCenter.x, window.canvasCenter.y)
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)

        this.direction = createVector(0, 0)
        this.directionOffset = Math.randomOffset()

        this.bounds = new BouncingBorder()
    }
    
    update() {
        this.direction = this.randomDirection()
        this.acceleration = Vector.mult(this.direction, ACCELERATION_SCALE)

        this.velocity.add(this.acceleration)
        this.velocity.limit(MAX_VELOCITY)

        const { velocity } = this.bounds.check(this.position, this.velocity)
        this.velocity = velocity

        this.position.add(this.velocity)
    }

    display() {
        push()
        noStroke()
        fill(20, 80, 60)
        translate(this.position.x, this.position.y)

        // Sum 90 degrees to make the vector relative to y
        rotate(this.direction.heading() + 90)
        rect(0, 0, this.width, this.height)
        pop()
    }

    randomDirection() {
        this.directionOffset.add(0.01)

        return createVector(
            map(noise(this.directionOffset.x), 0, 1, -5, 5),
            map(noise(this.directionOffset.y), 0, 1, -5, 5)
        ).normalize()
    }

}