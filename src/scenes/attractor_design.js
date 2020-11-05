import { Vector } from 'p5'
import Walker from '../entities/walker'
import Attractor from '../entities/attractor'

const MIN_DISTANCE = 5
const MAX_DISTANCE = 50
const PARTICLE_AMOUNT = 20
const PARTICLE_SIZE_MEAN = 5
const PARTICLE_SIZE_DEVIATION = 2

export default class AttractorDesign {

    setup() {
        const center = Vector.copy(window.canvasCenter)
        this.attractor = new Attractor(center, 40, 40, 0.4, MIN_DISTANCE, MAX_DISTANCE)

        this.particles = []
        for (let i = 0; i < PARTICLE_AMOUNT; i++) {
            this.particles.push(this.createParticle(this.attractor))
        }

        background(80)
    }

    draw() {
        this.particles.forEach(particle =>
        {
            const attraction = this.attractor.force(particle.position, particle.mass)
            particle.applyForce(attraction)

            particle.update()
            particle.display()
        })
    }

    createParticle(attractor) {
        const position = this.randomParticlePosition(attractor)
        const size = randomGaussian(PARTICLE_SIZE_MEAN, PARTICLE_SIZE_DEVIATION)

        const particle = new Particle(position, size, size)
        const velocityX = Math.randomBetween(-1, 1)
        particle.velocity = createVector(velocityX, 0)

        return particle
    }

    randomParticlePosition(attractor) {
        const distance = Math.randomBetween(MIN_DISTANCE, MAX_DISTANCE)
        const angle = Math.randomBetween(0, 360)

        // radius * sin/cos(angle) + center
        const x = distance * Math.sin(angle) + attractor.position.x
        const y = distance * Math.cos(angle) + attractor.position.y

        return createVector(x, y)
    }

}

class Particle extends Walker {

    constructor(position, size, mass) {
        super(position, mass)
        this.size = size
    }

    display() {
        push()
        noStroke()
        circle(this.position.x, this.position.y, this.size)
        pop()
    }

}