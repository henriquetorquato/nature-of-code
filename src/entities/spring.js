import { Vector } from 'p5'

const SIZE = 3

export default class Spring {

    connected = null

    constructor(anchor, length, constant) {
        this.anchor = anchor
        this.length = length
        this.constant = constant
    }

    connect(walker) {
        let force = Vector.sub(walker.position, this.anchor)
        let stretch = force.mag() - this.length

        force.normalize()
        force.mult(-1 * this.constant * stretch)

        walker.applyForce(force)
        this.connected = walker
    }

    display() {
        const destination = this.connected
            ? this.connected.position
            : createVector(0, this.length)

        line(this.anchor.x, this.anchor.y, destination.x, destination.y)
    }

}