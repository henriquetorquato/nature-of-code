import { Vector } from 'p5'
import { BouncingBorder } from '../border'

const MAX_VELOCITY = 1
const ACCELERATION_SCALE = 2
const SLITHERING_RATE = 0.1

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
        this.slitheringX = 0
    }
    
    update() {
        this.direction = this.randomDirection()
        this.acceleration = this.accelerationVector()

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
            map(noise(this.directionOffset.x), 0, 1, -1, 1),
            map(noise(this.directionOffset.y), 0, 1, -1, 1)
        ).normalize()
    }

    slitheringVector() {
        const y = Math.sin(this.slitheringX)
        this.slitheringX += SLITHERING_RATE
        return createVector(0, y)
    }

    /*
    * The idea of calculation the acceleration this way, is to merge a side 
    * movement that is defined by a sin wave (simulating a snake slithering),
    * considering the general direction that the snake is moving.
    */
    accelerationVector() {
        angleMode(DEGREES)

        const slithering = this.slitheringVector()
        // Make the side movement relative to the direction the snake is going
        slithering.rotate(this.direction.heading())
        
        // Scale the direction vector
        const direction = Vector.mult(this.direction, ACCELERATION_SCALE)

        const acceleration = Vector.cross(direction, slithering)
        acceleration.rotate(this.direction.heading() + direction.angleBetween(slithering) / 2)

        return acceleration
    }

}