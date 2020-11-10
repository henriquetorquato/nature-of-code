import { Vector } from 'p5'
import Sort from '@resources/sort'

const SIZE = 20
const WAIT_MEAN = 10000
const WAIT_DEVIATION = 3000
const POSITION_LOCK_DISTANCE = 5

const TONG_WIDTH = 5
const MAX_TONG_LENGTH = 80

export default class JumpingFrog {

    fly = null
    tong = null
    jump = null

    position = undefined
    currentLilypad = undefined

    constructor(lilypads) {
        this.lilypads = lilypads

        this.area = SIZE
        this.mass = SIZE / 2
        this.lilypad = this.nextLilypad()
        this.acceleration = createVector(0, 0)
        this.velocity = createVector(0, 0)
        this.wait = this.nextWait()
    }

    get lilypad() {
        return this.currentLilypad
    }

    set lilypad(value) {
        this.position = Vector.copy(value.position)
        this.currentLilypad = value
    }

    update() {
        // Wait random timeout
        if (Date.now() < this.wait)
        {
            return
        }

        // If a fly is close, catch it
        if (this.fly && this.jump === null)
        {
            this.tong = Vector.sub(this.fly.position, this.position)
            this.fly.kill()
            this.fly = null

            this.wait = this.nextWait()
            return
        }

        // Make next jump
        if (this.fly === null && this.jump === null)
        {
            this.jump = this.nextLilypad()
        }

        const direction = Vector.sub(this.jump.position, this.position)
        const distance = direction.mag()

        if (distance < POSITION_LOCK_DISTANCE)
        {
            this.lilypad = this.jump
            this.jump = null
            this.wait = this.nextWait()
            this.velocity.mult(0)
            return
        }

        direction.normalize()
        const jumpAcceleration = Vector.mult(direction, 20)
        this.applyForce(jumpAcceleration)

        this.velocity.add(this.acceleration)
        this.position.add(this.velocity)

        this.acceleration.mult(0)
    }

    applyForce(force) {
        let newForce = Vector.div(force, this.mass)
        this.acceleration.add(newForce)
    }

    display() {
        if (this.tong)
        {
            // Angle between down and the tond direction
            const angle = createVector(0, 1).angleBetween(this.tong)

            push()
            noStroke()
            fill(200, 100, 110)
            translate(this.position.x, this.position.y)
            rotate(angle)
            rect(0, 0, TONG_WIDTH, this.tong.mag())
            pop()

            this.tong = null
        }

        push()
        noStroke()
        rectMode(CENTER)
        fill(40, 100, 30)
        ellipse(this.position.x, this.position.y, SIZE)
        pop()
    }

    nextLilypad() {
        if (this.position === undefined)
        {
            const index = Math.randomBetween(0, this.lilypads.length - 1)
            return this.lilypads[index]
        }
        
        const sortedPositions = Sort.byDistance(this.position, this.lilypads)

        // Index 0 is the current
        const index = Math.randomBetween(2, 4)
        return sortedPositions[index]
    }

    nextWait() {
        const now = Date.now()
        const timeout = randomGaussian(WAIT_MEAN, WAIT_DEVIATION)
        return now + timeout
    }

    checkFlies(flies) {
        if (Date.now() < this.wait) return

        const sortedFlies = Sort.byDistance(this.position, flies)
        const nearest = sortedFlies[0]

        const direction = Vector.sub(nearest.position, this.position)
        const distance = direction.mag()

        if (distance <= MAX_TONG_LENGTH)
        {
            this.fly = nearest
        }
    }

}