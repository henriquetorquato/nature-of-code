import { Vector } from 'p5'

const SIZE = 20
const BORDER_FORCE = 10
const BORDER_FORCE_DECAY = 0.08
const MIN_BORDER_DISTANCE = 40

export default class BouncingBall {

    setup() {
        this.size = SIZE
        this.mass = SIZE
        this.radius = SIZE / 2

        this.position = Vector.copy(window.canvasCenter)
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)

        this.border = new BorderForce(MIN_BORDER_DISTANCE)
        this.acceleration = Vector.random2D()
    }

    draw() {
        clear()
        background(220)
        this.update()
        this.display()
    }

    update() {
        const borderForces = this.border.forces(this.position)
        this.acceleration.add(borderForces)

        this.velocity.add(this.acceleration)
        this.velocity.limit(10)

        const bounce = this.bounceVector()
        this.velocity.mult(bounce)

        this.position.add(this.velocity)
        this.acceleration.mult(0)
    }

    display() {
        push()
        ellipse(this.position.x, this.position.y, this.size)
        pop()
    }

    applyForce(force) {
        const newForce = Vector.div(force, this.mass)
        this.acceleration.add(newForce)
    }

    bounceVector() {
        let bounce = createVector(1, 1)
        const nextPosition = Vector.add(this.position, this.velocity)

        if (nextPosition.x - this.radius < 0 || nextPosition.x + this.radius > window.canvasWidth)
        {
            bounce.x = -1
        }

        if (nextPosition.y - this.radius < 0 || nextPosition.y + this.radius > window.canvasHeight)
        {
            bounce.y = -1
        }

        return bounce
    }

}

class BorderForce {

    constructor(minDistance) {
        this.minDistance = minDistance
    }

    forces(position) {
        const acceleration = createVector(0, 0)

        const top = Vector.sub(createVector(position.x, 0), position)
        const left = Vector.sub(createVector(0, position.y), position)
        const bottom = Vector.sub(createVector(position.x, window.canvasHeight), position)
        const right = Vector.sub(createVector(window.canvasWidth, position.y), position)    

        if (this.shouldApply(top))
        {
            acceleration.y -= this.forceFunction(top)
        }
        else if (this.shouldApply(bottom))
        {
            acceleration.y += this.forceFunction(bottom)
        }

        if (this.shouldApply(left))
        {
            acceleration.x -= this.forceFunction(left)
        }
        else if (this.shouldApply(right))
        {
            acceleration.x += this.forceFunction(right)
        }

        return acceleration
    }

    // force * (1 - decay)^distance
    forceFunction(distanceVector) {
        return BORDER_FORCE * Math.pow(1 - BORDER_FORCE_DECAY, distanceVector.mag())
    }

    shouldApply(vector) {
        return vector.mag() <= this.minDistance
    }

}