import { Vector } from 'p5'

export default class Retractor {

    constructor(position, size, mass, gravity, minDistance, maxDistance) {
        this.position = position
        this.size = size
        this.mass = mass
        this.gravity = gravity
        this.minDistance = minDistance
        this.maxDistance = maxDistance
        this.color = color(201, 63, 63)
    }

    force(position, mass) {
        const retraction = Vector.sub(this.position, position)
        const distance = constrain(retraction.mag(), this.minDistance, this.maxDistance)
        const mag = (this.gravity * this.mass * mass) * Math.pow(distance, 2)

        retraction.normalize()
        retraction.setMag(mag)
        return retraction
    }

    display() {
        push()
        noStroke()
        fill(this.color)
        circle(this.position.x, this.position.y, this.size)
        pop()
    }

}