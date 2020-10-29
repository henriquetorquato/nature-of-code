import { Vector } from 'p5'

const SIZE = 20
const BORDER_FORCE = 20
const BORDER_FORCE_DECAY = 0.08

export default class BouncingBall {

    setup() {
        this.size = SIZE
        this.mass = SIZE
        this.radius = SIZE / 2

        this.position = Vector.copy(window.canvasCenter)
        this.velocity = createVector(0, 0)

        // Create a random initial acceleration
        this.acceleration = Vector.mult(Vector.random2D(), 5)
    }

    draw() {
        clear()
        background(220)
        this.update()
        this.display()
    }

    update() {
        const borderForces = this.checkBounds()
        this.acceleration.add(borderForces)

        this.velocity.add(this.acceleration)
        this.velocity.limit(10)

        this.position.add(this.velocity)
        this.acceleration.mult(0)
    }

    display() {
        push()
        Vector.drawArrow(this.position, Vector.mult(this.velocity, 10), 'red')
        ellipse(this.position.x, this.position.y, this.size)
        pop()
    }

    applyForce(force) {
        const newForce = Vector.div(force, this.mass)
        this.acceleration.add(newForce)
    }

    checkBounds() {
        const acceleration = createVector(0, 0)

        // Vectors representing distance to each canvas side
        const top = Vector.sub(createVector(this.position.x, 0), this.position)
        const left = Vector.sub(createVector(0, this.position.y), this.position)
        const bottom = Vector.sub(createVector(this.position.x, window.canvasHeight), this.position)
        const right = Vector.sub(createVector(window.canvasWidth, this.position.y), this.position)

        // Apply the influence of every force to the body
        acceleration.y += this.forceFunction(top)
        acceleration.y -= this.forceFunction(bottom)
        acceleration.x += this.forceFunction(left)
        acceleration.x -= this.forceFunction(right)

        return acceleration
    }

    // force * (1 - decay)^distance
    forceFunction(distanceVector) {
        return BORDER_FORCE * Math.pow(1 - BORDER_FORCE_DECAY, distanceVector.mag())
    }

}