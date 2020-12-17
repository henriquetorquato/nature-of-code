import { Vector } from 'p5'
import { ParticleSystem, Particle } from '@entities/particle'
import { BouncingSquareBorder } from '@resources/border'

const PIECE_SIZE = 5

export default class ShatteredShape extends ParticleSystem {

    constructor(position, size, color, angle) {
        super(position, {})
        this.size = size
        this.color = color
        this.angle = angle

        this.centerOffset = createVector(this.size.width / 2, this.size.height / 2)
        this.createParticles()
    }

    createParticles() {
        for (let x = 0; x < this.size.width; x += PIECE_SIZE)
        {
            for (let y = 0; y < this.size.height; y += PIECE_SIZE)
            {
                // Center of the figure
                const center = Vector.sub(this.position, this.centerOffset)
                // Add pixel offset
                let position = Vector.add(center, createVector(x, y))
                // Rotate position to match old shape
                position = Vector.rotateAround(position, this.angle, this.position)

                const acceleration = Vector.sub(position, this.position)
                    .setMag(2)

                const particle = new ShatterPiece(position, this.color)
                particle.applyForce(acceleration)

                this.particles.push(particle)
            }
        }
    }

    applyForce(force) {
        this.particles.forEach(particle =>
        {
            let newForce = Vector.div(force, particle.mass)
            particle.applyForce(newForce)
        })
    }

    update() {
        this.run()
    }

    display() {
        return null
    }

    isDead() {
        const el = this.particles.find(particle => !particle.isDead)
        return el === undefined
    }

}

const BOUNCE_FACTOR = 0.5

class ShatterPiece extends Particle {

    constructor(position, color) {
        super(position, PIECE_SIZE, 3)
        this.color = color
        this.canvasBorder = new BouncingSquareBorder({ width: this.size, height: this.size }, BOUNCE_FACTOR)
    }

    display() {
        push()
        noStroke()
        fill(this.color.r, this.color.g, this.color.b, this.lifespan)
        square(this.position.x, this.position.y, this.size)
        pop()
    }

}