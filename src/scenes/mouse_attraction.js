import { Vector } from 'p5'
import Walker from '../entities/walker'
import Attractor from '../entities/attractor'

const PARTICLE_AMOUNT = 30
const MIN_DISTANCE = 20
const MAX_DISTANCE = 40

const RETRACTION_MIN_DISTANCE = 10
const RETRACTION_MAX_DISTANCE = 20

export default class MouseAttraction {

    setup() {
        this.particles = []
        for (let i = 0; i < PARTICLE_AMOUNT; i++) {
            const position = Math.randomPosition()
            const size = Math.randomBetween(3, 6)
            const particle = new Particle(position, size)

            this.particles.push(particle)
        }

        this.retractionForce = 0.1
        this.attractor = new Attractor(this.mouse, 10, 10, 8, MIN_DISTANCE, MAX_DISTANCE)
    }

    draw() {
        background(80)

        this.attractor.position = this.mouse
        this.particles.forEach((p1, i1) =>
        {
            this.particles.forEach((p2, i2) =>
            {
                if (i1 == i2) return
                
                const retraction = this.retraction(p1, p2)
                p1.applyForce(retraction)
            })

            const attraction = this.attractor.force(p1.position, p1.mass)
            p1.applyForce(attraction)

            p1.update()
            p1.display()
        })
    }

    retraction(p1, p2) {
        const retraction = Vector.sub(p1.position, p2.position)
        const distance = constrain(retraction.mag(), RETRACTION_MIN_DISTANCE, RETRACTION_MAX_DISTANCE)
        const mag = (this.retractionForce * p1.mass * p2.mass) / Math.pow(distance, 2)

        retraction.normalize()
        retraction.setMag(mag)
        return retraction
    }

    get mouse() {
        return createVector(mouseX, mouseY)
    }

}

class Particle extends Walker {

    constructor(position, size) {
        super(position, size)
        this.size = size
    }

    display() {
        push()
        noStroke()
        circle(this.position.x, this.position.y, this.size)
        pop()
    }

}