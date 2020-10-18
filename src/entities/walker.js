export default class Walker {

    constructor(position = createVector(0, 0, 0)) {
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
    }

}