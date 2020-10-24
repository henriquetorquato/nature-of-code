import { Vector } from 'p5'
import CreatureMovement from './creature_movement'

const MAX_VELOCITY = 1
const ACCELERATION_SCALE = 2
const MIN_BORDER_DISTANCE = 80

export default class SlitheringSnake extends CreatureMovement {

    constructor(position) {
        super(MIN_BORDER_DISTANCE)
        this.genes = new SlitheringSnakeGenes()

        // Basic information for moving the object
        this.position = position
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)

        this.direction = createVector(0, 0)

        // The x value used by the slithering movement (sin wave)
        this.slitheringX = Math.randomBetween(0, 10000)
    }
    
    display() {    
        push()
        noStroke()
        fill(this.genes.color)
        translate(this.position.x, this.position.y)

        // Sum 90 degrees to make the vector relative to y
        rotate(this.direction.heading() + 90)
        rect(0, 0, this.genes.width, this.genes.height)
        pop()
    }

    update() {
        this.direction = this.nextDirection()
        this.acceleration = this.accelerationVector()

        this.velocity.add(this.acceleration)
        this.velocity.limit(MAX_VELOCITY)
        this.position.add(this.velocity)
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

    /*
    * The slithering movement is produced by a vector generated based on a
    * sin wave. This vector is then merged with the direction, making the 
    * final acceleration vector produce a side to side movement.
    */
    slitheringVector() {
        const y = Math.sin(this.slitheringX)
        this.slitheringX += this.genes.slitheringRate
        return createVector(0, y)
    }

}

const WIDTH_MEAN = 3
const WIDTH_DEVIATION = 1
const HEIGHT_MEAN = 60
const HEIGHT_DEVIATION = 15
const COLOR_DEVIATION = 30

class SlitheringSnakeGenes {

    constructor() {
        this.width = randomGaussian(WIDTH_MEAN, WIDTH_DEVIATION)
        this.height = randomGaussian(HEIGHT_MEAN, HEIGHT_DEVIATION)
        this.color = color(
            randomGaussian(60, COLOR_DEVIATION),
            randomGaussian(80, COLOR_DEVIATION),
            randomGaussian(20, COLOR_DEVIATION))
        this.slitheringRate = Math.random()
    }

}