import { Vector } from 'p5'
import { Particle } from '@entities/particle'

const PARTICLE_SIZE = 20
const MAX_DISTANCE = 60
const MAX_FORCE = 1

export default class RepellingParticle extends Particle {

    constructor(position, maxDistance = MAX_DISTANCE, maxForce = MAX_FORCE) {
        super(position, PARTICLE_SIZE, 0)
        this.area = PARTICLE_SIZE
        this.maxDistance = maxDistance
        this.maxForce = maxForce
    }

    shouldRepell(particle) {
        const distance = Vector.sub(this.position, particle.position)
        return distance.mag() < this.maxDistance
    }

    repellingForce(particle) {
        const force = Vector.sub(this.position, particle.position)
        const distance = force.mag()

        const mag = this.forceMag(distance, this.maxDistance, this.maxForce)
        force.normalize().mult(mag)

        return force
    }

    forceMag(distance, maxDistance, maxForce) {
        // -x^2 / (max_distance * (max_distance / max_force)) + max_force
        const force = -Math.pow(distance, 2) / (maxDistance * (maxDistance / maxForce)) + maxForce
        return force > 0 ? force : 0
    }

}