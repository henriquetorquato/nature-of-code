import { Vector } from 'p5'

const NOISE_STEP = 1
const MAX_DISTANCE = 5

export default class NervousFly {

    constructor(position) {
        this.position = position
        this.noiseOffset = this.randomOffset()
    }

    update() {
        const movement = this.nextMovement()
        this.position.add(movement)
    }

    display() {
        noStroke()
        fill(0)
        ellipse(this.position.x, this.position.y, 2)
    }

    nextMovement() {
        const direction = createVector(
            Math.randomBetween(-1, 1),
            Math.randomBetween(-1, 1))

        const distance = createVector(
            map(noise(this.noiseOffset.x), 0, 1, 0, MAX_DISTANCE),
            map(noise(this.noiseOffset.y), 0, 1, 0, MAX_DISTANCE))

        this.noiseOffset.add(NOISE_STEP)
        return Vector.mult(direction, distance)
    }

    randomPosition() {
        return createVector(
            Math.randomBetween(0, window.canvasWidth),
            Math.randomBetween(0, window.canvasHeight))
    }

    randomOffset() {
        const max = Math.randomBetween(0, 10000)
        return createVector(
            Math.randomBetween(0, max),
            Math.randomBetween(max, max + 1000))
    }

}