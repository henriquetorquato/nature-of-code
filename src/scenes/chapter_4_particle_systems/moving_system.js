import { Vector } from 'p5'
import { ParticleSystem, Particle } from '@entities/particle'

const PARTICLE_SIZE = 20
const PARTICLE_VELOCITY_LIMIT = 1

export default class MovingSystem {

    setup() {
        this.system = new ParticleSystem(window.canvasCenter, this.createParticle)

        textSize(20)
        textFont(window.font)
    }

    draw() {
        clear()
        background(220)

        this.system.position = createVector(mouseX, mouseY)

        this.system.add()
        this.system.run()

        text('Try moving the mouse!', 20, window.canvasHeight - 20)
    }

    createParticle(position) {
        const scale = Math.randomBetween(5, 20)
        const initialAcceleration = createVector(
            map(Math.random(), 0, 1, -scale, scale),
            map(Math.random(), 0, 1, -scale, scale))

        const particle = new Particle(Vector.copy(position), PARTICLE_SIZE)
        particle.velocityLimit = PARTICLE_VELOCITY_LIMIT
        particle.applyForce(initialAcceleration)

        return particle
    }

}