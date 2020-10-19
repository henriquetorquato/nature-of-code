import { Vector } from 'p5'
import PixelAnimation from '../../resources/pixel_animation'

const NOISE_STEP = 1
const MAX_DISTANCE = 5

export default class NervousFly {

    constructor() {
        this.position = window.canvasCenter
        this.noiseOffset = createVector(0, 1000)
        this.animation = new PixelAnimation(NervousFlyFrames)
    }

    update() {
        const movement = this.nextMovement()
        this.position.add(movement)
    }

    display() {
        const frame = this.animation.next()
        imageMode(CENTER)
        image(frame, this.position.x, this.position.y, 5, 5)
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

}

const NervousFlyFrames = [
    [
        [1, 0, 1],
        [0, 1, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 1, 0],
        [1, 0, 1]
    ]
]