import { Vector } from 'p5'
import { BouncingBorder } from '@resources/border'

const NOISE_STEP = 1
const MAX_ACCELERATION = 5
const MAX_VELOCITY = 5

export default class NervousFly {

    constructor(position) {
        this.position = position
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)
        this.noiseOffset = Math.randomOffset()

        this.border = new BouncingBorder()
    }

    update() {
        this.acceleration = this.nextAcceleration()

        this.velocity.add(this.acceleration)
        this.velocity.limit(MAX_VELOCITY)

        const { velocity } = this.border.check(this.position, this.velocity)
        this.velocity = velocity

        this.position.add(this.velocity)
    }

    display() {
        push()
        noStroke()
        fill(0)
        ellipse(this.position.x, this.position.y, 2)
        pop()
    }

    nextAcceleration() {
        const direction = createVector(
            Math.randomBetween(-1, 1),
            Math.randomBetween(-1, 1))

        const force = createVector(
            map(noise(this.noiseOffset.x), 0, 1, 0, MAX_ACCELERATION),
            map(noise(this.noiseOffset.y), 0, 1, 0, MAX_ACCELERATION))

        this.noiseOffset.add(NOISE_STEP)
        return Vector.mult(direction, force)
    }

}