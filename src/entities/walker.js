export default class Walker {

    constructor(position = createVector(0, 0, 0)) {
        this.position = position
        this.velocity = createVector(0, 0, 0)
        this.acceleration = createVector(0, 0, 0)
    }

    update() {
        this.velocity.add(this.acceleration)
        this.position.add(this.velocity)
    }

}