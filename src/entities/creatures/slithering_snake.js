import { Vector } from 'p5'

const MAX_VELOCITY = 1
const ACCELERATION_SCALE = 2
const SLITHERING_RATE = 0.1
const MIN_BORDER_DISTANCE = 80

export default class SlitheringSnake {

    constructor(position) {
        this.genes = new SlitheringSnakeGenes()

        // Basic information for the moving object
        this.position = position
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)

        // The direction determined by the perlin noise
        this.direction = createVector(0, 0)
        this.directionOffset = Math.randomOffset()

        // The 'flip' values to maintain the snake inside the canvas
        this.flip = createVector(1, 1)

        // The x value used by the slithering movement (sin wave)
        this.slitheringX = 0
    }
    
    update() {
        this.direction = this.nextDirection()
        this.acceleration = this.accelerationVector()

        this.velocity.add(this.acceleration)
        this.velocity.limit(MAX_VELOCITY)
        this.position.add(this.velocity)
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

    nextDirection() {
        this.directionOffset.add(0.01)       

        const direction = createVector(
            map(noise(this.directionOffset.x), 0, 1, -1, 1),
            map(noise(this.directionOffset.y), 0, 1, -1, 1))
            .normalize()

        this.flip = this.flipVector()
        return Vector.mult(direction, this.flip)
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

    slitheringVector() {
        const y = Math.sin(this.slitheringX)
        this.slitheringX += SLITHERING_RATE
        return createVector(0, y)
    }

    flipVector() {
        const flip = Vector.copy(this.flip)

        // Vector representing the distance to the 4 sides of the border
        const top = Vector.sub(createVector(this.position.x, 0), this.position)
        const left = Vector.sub(createVector(0, this.position.y), this.position)
        const bottom = Vector.sub(createVector(this.position.x, window.canvasHeight), this.position)
        const right = Vector.sub(createVector(window.canvasWidth, this.position.y), this.position)

        if (this.checkFlipDimention(left) || this.checkFlipDimention(right))
        {
            flip.x *= -1
        }

        if (this.checkFlipDimention(top) || this.checkFlipDimention(bottom))
        {
            flip.y *= -1
        }

        return flip
    }

    checkFlipDimention(vector) {
        const angle = Math.abs(this.direction.angleBetween(vector))
        return vector.mag() < MIN_BORDER_DISTANCE && angle < 90
    }

}

const WIDTH_MEAN = 3
const WIDTH_DEVIATION = 1
const HEIGHT_MEAN = 60
const HEIGHT_DEVIATION = 15
const COLOR_DEVIATION = 40

class SlitheringSnakeGenes {

    constructor() {
        this.width = randomGaussian(WIDTH_MEAN, WIDTH_DEVIATION)
        this.height = randomGaussian(HEIGHT_MEAN, HEIGHT_DEVIATION)
        this.color = color(
            randomGaussian(40, COLOR_DEVIATION),
            randomGaussian(80, COLOR_DEVIATION),
            randomGaussian(60, COLOR_DEVIATION))
    }

}