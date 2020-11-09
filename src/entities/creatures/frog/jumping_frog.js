import { Vector } from 'p5'

const SIZE = 20
const WAIT_MEAN = 10000
const WAIT_DEVIATION = 3000
const POSITION_LOCK_DISTANCE = 5

export default class JumpingFrog {

    position = undefined
    currentLilypad = undefined

    constructor(lilypads) {
        this.lilypads = lilypads

        this.area = SIZE
        this.mass = SIZE / 2
        this.lilypad = this.nextLilypad()
        this.acceleration = createVector(0, 0)
        this.velocity = createVector(0, 0)

        this.jump = null
        this.wait = this.nextWait()
    }

    get lilypad() {
        return this.currentLilypad
    }

    set lilypad(value) {
        this.position = Vector.copy(value.position)
        this.currentLilypad = value
    }

    // TO-DO: Use a jump function to 
    update() {
        if (this.jump === null)
        {
            if (Date.now() < this.wait)
            {
                return
            }
            else
            {
                this.jump = this.nextLilypad()
            }
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
        push()
        rectMode(CENTER)
        fill(0)
        ellipse(this.position.x, this.position.y, SIZE)
        pop()
    }

    nextLilypad() {
        if (this.position === undefined)
        {
            const index = Math.randomBetween(0, this.lilypads.length - 1)
            return this.lilypads[index]
        }
        
        const sortedPositions = this.lilypads.sort((a, b) =>
        {
            const distanceA = Vector.sub(this.position, a.position)
            const distanceB = Vector.sub(this.position, b.position)

            if (distanceA.mag() < distanceB.mag())
            {
                return -1
            }
            else if (distanceA.mag() > distanceB.mag())
            {
                return 1
            }
            else
            {
                return 0
            }
        })
        
        // Index 0 is the current
        const index = Math.randomBetween(2, 4)
        return sortedPositions[index]
    }

    nextWait() {
        const now = Date.now()
        const timeout = randomGaussian(WAIT_MEAN, WAIT_DEVIATION)
        return now + timeout
    }

}