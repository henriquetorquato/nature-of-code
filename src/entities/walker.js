import { Vector } from 'p5'

export default class Walker {

    constructor(position = createVector(0, 0, 0), mass = 1) {
        this.mass = mass
        this.position = position
        this.velocity = createVector(0, 0, 0)
        this.acceleration = createVector(0, 0, 0)

        this.velocityLimit = null
        this.canvasBorder = null
    }

    update() {
        // Apply acceleration vector
        this.velocity.add(this.acceleration)

        // Limit velocity vector
        if (this.velocityLimit !== null) {
            this.velocity.limit(this.velocityLimit)
        }

        // Check for borders using abstracted behaviour
        if (this.canvasBorder !== null) {
            const { position, velocity } = this.canvasBorder.check(this.position, this.velocity)
            this.position = position
            this.velocity = velocity
        }

        // Apply velocity vector
        this.position.add(this.velocity)

        // Reset acceleration
        this.acceleration.mult(0)
    }

    applyForce(force) {
        let newForce = Vector.div(force, this.mass)
        this.acceleration.add(newForce)
    }

}