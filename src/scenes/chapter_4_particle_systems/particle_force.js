import { Vector } from 'p5'
import { Particle } from '@entities/particle'

const PARTICLE_SIZE = 20
const VELOCITY_LIMIT = 2
const GRAVITY = 0.98
const WIND_STEP = 0.001
const ANGLE_SCALE = 0.001

export default class ParticleForce {

    setup() {
        this.spawn()
        this.gravity = createVector(0, GRAVITY)
        this.windOffset = 0

        textSize(20)
        textFont(window.font)
    }

    draw() {
        clear()
        background(220)

        const wind = this.nextWind()
        this.particle.applyForce(wind)
        this.particle.applyForce(this.gravity)

        // Sping object in wind direction
        const angleForce = ANGLE_SCALE * wind.x
        this.particle.applyAngularForce(angleForce)

        this.particle.update()
        this.particle.display()

        push()
        fill('blue')
        text('Wind', window.canvasCenter.x - 25, window.canvasCenter.y - 20)
        Vector.drawArrow(window.canvasCenter, Vector.mult(wind, 200), 'blue')
        pop()

        if (this.particle.isDead) this.spawn()
    }

    spawn() {
        const center = Vector.copy(window.canvasCenter)

        const scale = Math.randomBetween(5, 20)
        const initialAcceleration = createVector(
            map(Math.random(), 0, 1, -scale, scale),
            Math.random() * -scale)

        this.particle = new SquareParticle(center, PARTICLE_SIZE)
        this.particle.velocityLimit = VELOCITY_LIMIT
        this.particle.applyForce(initialAcceleration)
    }

    nextWind() {
        this.windOffset += WIND_STEP
        return createVector(map(noise(this.windOffset), 0, 1, -1, 1), 0)
    }

}

class SquareParticle extends Particle {

    constructor(position, size) {
        super(position, size)
    }

    display() {
        push()
        noStroke()
        fill(0, this.lifespan)
        translate(this.position.x, this.position.y)
        rotate(this.angle)
        square(-this.size / 2, -this.size / 2, this.size)
        pop()
    }

}