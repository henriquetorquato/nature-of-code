import { Particle, ParticleSystem } from '@entities/particle'

const ANGLE_VARIATION = 10
const ANGLE_VELOCITY = 10
const PARTICLE_ACCELERATION = 0.5

export default class Thruster extends ParticleSystem {

    rotationPivot = null
    rotationAngle = 0
    emitterAngle = 0
    emitterAngleDirection = 1

    constructor(position) {
        super(position, {})
    }

    add() {
        // Figure out the position of the emmiter
        const cos = Math.cos(this.rotationAngle)
        const sin = Math.sin(this.rotationAngle)
        const position = createVector(
            cos * this.position.x - sin * this.position.y + this.rotationPivot.x,
            sin * this.position.x + cos * this.position.y + this.rotationPivot.y)

        // Figure out the acceleration direction
        const angle = this.nextAngle() + this.rotationAngle
        const acceleration = createVector(
            PARTICLE_ACCELERATION * Math.cos(angle),
            PARTICLE_ACCELERATION * Math.sin(angle))

        const particle = new FireParticle(position)
        particle.applyForce(acceleration)

        this.particles.push(particle)
    }

    rotate(pivot, angle) {
        this.rotationPivot = pivot
        this.rotationAngle = angle * PI / 180
    }

    nextAngle() {
        if (this.emitterAngle > ANGLE_VARIATION) this.emitterAngleDirection = -1
        if (this.emitterAngle < -ANGLE_VARIATION) this.emitterAngleDirection = 1

        this.emitterAngle = this.emitterAngle + (ANGLE_VELOCITY * this.emitterAngleDirection)

        // The angle varies on the right, adding 90 will make it vary on the bottom
        return (this.emitterAngle + 90) * PI / 180
    }

}

const FIRE_COLOR = [207, 162, 41]
const FIRE_PARTICLE_SIZE = 10
const FIRE_LIFESPAN_TIC = 10
const FIRE_VELOCITY_LIMIT = 0.5

class FireParticle extends Particle {

    constructor(position) {
        super(position, FIRE_PARTICLE_SIZE, FIRE_LIFESPAN_TIC)
        this.velocityLimit = FIRE_VELOCITY_LIMIT
    }

    display() {
        push()
        noStroke()
        fill(FIRE_COLOR[0], FIRE_COLOR[1], FIRE_COLOR[2], this.lifespan)
        circle(this.position.x, this.position.y, this.size)
        pop()
    }

}