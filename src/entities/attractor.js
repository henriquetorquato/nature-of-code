import { Vector } from 'p5'

export default class Attractor {

    constructor(position, size, mass, gravity, minDistance, maxDistance) {
        this.position = position
        this.size = size
        this.mass = mass
        this.gravity = gravity
        this.minDistance = minDistance
        this.maxDistance = maxDistance
    }

    force(position, mass) {
        const attraction = Vector.sub(this.position, position)
        const distance = constrain(attraction.mag(), this.minDistance, this.maxDistance)
        const mag = (this.gravity * this.mass * mass) / Math.pow(distance, 2)

        attraction.normalize()
        attraction.setMag(mag)
        return attraction
    }

}