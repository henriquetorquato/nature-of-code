import { Vector } from 'p5'
import { Particle, ParticleSystem } from '@entities/particle'

const INITIAL_ACCELERATION = 2
const INITIAL_ANGLE = -22.5
const FINAL_ANGLE = 22.5
const ANGULAR_ACCELERATION = 0.05
const COUNT_MEAN = 500
const COUNT_DEVIATION = 50
const DEATH_TIMEOUT = 2000

export default class FireworkEmmiter extends ParticleSystem {

    count = 0
    deathTimer = null

    constructor(position) {
        super(position, {})
        this.top = createVector(0, -1)
        this.color = Math.randomColor()
        this.particleCount = randomGaussian(COUNT_MEAN, COUNT_DEVIATION)
    }

    add() {
        if (this.particleCount <= 0)
        {
            this.deathTimer = Date.now() + DEATH_TIMEOUT
            return
        }

        const angle = Math.randomBetween(INITIAL_ANGLE, FINAL_ANGLE) * PI / 180
        const acceleration = Vector.mult(this.top, INITIAL_ACCELERATION).rotate(angle)
        const angularForce = ANGULAR_ACCELERATION * (angle < 0 ? -1 : 1)

        const particle = new Firework(Vector.copy(this.position), this.color)
        particle.applyForce(acceleration)
        particle.applyAngularForce(angularForce)

        this.particles.push(particle)
        this.particleCount--
    }

    get isDead() {
        return this.deathTimer !== null && Date.now() > this.deathTimer
    }

}

const INITIAL_SIZE = 2
const LIFESPAN_MEAN = 200
const LIFESPAN_DEVIATION = 50
const PARTICLE_GROW_MEAN = 0.05
const PARTICLE_GROW_DEVIATION = 0.02

class Firework extends Particle {

    constructor(position, color) {
        super(position, INITIAL_SIZE)
        this.color = color

        this.lifespan = randomGaussian(LIFESPAN_MEAN, LIFESPAN_DEVIATION)
        this.grow = randomGaussian(PARTICLE_GROW_MEAN, PARTICLE_GROW_DEVIATION)
    }

    display() {
        push()
        noStroke()
        translate(this.position.x, this.position.y)
        rotate(this.angle)
        fill(this.color.r, this.color.g, this.color.b, this.lifespan)
        square(-this.size / 2, -this.size / 2, this.size)
        pop()
    }

    update() {
        this.size += this.grow
        super.update()
    }

}