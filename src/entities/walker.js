export default class Walker {

    constructor(position = createVector(0, 0, 0)) {
        this.position = position
        this.velocity = createVector(0, 0, 0)
        this.acceleration = createVector(0, 0, 0)
        this.limit = null
    }

    update() {
        this.velocity.add(this.acceleration)

        if (this.limit !== null) {
            this.velocity.limit(this.limit)
        }

        this.position.add(this.velocity)
    }

    set velocityLimit(value) {
        this.limit = value
    }

}