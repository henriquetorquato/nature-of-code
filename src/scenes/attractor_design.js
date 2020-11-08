import Walker from '@entities/walker'
import Attractor from '@entities/attractor'

const MIN_DISTANCE = 5
const MAX_DISTANCE = 50

const PARTICLE_AMOUNT = 20
const PARTICLE_SIZE_MEAN = 5
const PARTICLE_SIZE_DEVIATION = 2

const ATTRACTOR_AMOUNT = 10
const ATTRACTOR_MIN_SIZE = 20
const ATTRACTOR_MAX_SIZE = 60

export default class AttractorDesign {

    setup() {
        this.attractors = []
        for (let i = 0; i < ATTRACTOR_AMOUNT; i++)
        {
            this.attractors.push(this.createAttractor())
        }

        this.particles = []
        for (let i = 0; i < PARTICLE_AMOUNT; i++)
        {
            const index = Math.randomBetween(0, this.attractors.length - 1)
            const particle = this.createParticle(this.attractors[index])
            this.particles.push(particle)
        }
    }

    draw() {
        clear()
        background(80)

        this.particles.forEach(particle =>
        {
            this.attractors.forEach(attractor =>
            {
                const attraction = attractor.force(particle.position, particle.mass)
                particle.applyForce(attraction)
            })

            particle.update()
            particle.display()
        })
    }

    createAttractor() {
        const position = Math.randomPosition()
        const size = Math.randomBetween(ATTRACTOR_MIN_SIZE, ATTRACTOR_MAX_SIZE)
        const gravity = Math.random()

        return new Attractor(position, size, size, gravity, MIN_DISTANCE, MAX_DISTANCE)
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