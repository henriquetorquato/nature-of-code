import { Vector } from 'p5'
import { BouncingBorder } from '../resources/border'

const SIZE = 20
const MAX_VELOCITY = 3
const WIND_OFFSET = 0.05
const HELIUM_FORCE = 0.5

export default class HeliumBallon {

    setup() {
        this.radius = SIZE / 2

        this.position = Vector.copy(window.canvasCenter)
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)
        this.border = new BouncingBorder()
        
        this.helium = createVector(0, -HELIUM_FORCE)
        this.windOffset = 0
    }

    draw() {
        clear()
        background(220)

        this.applyForce(this.helium)
        this.applyForce(this.nextWindVector())

        this.velocity.add(this.acceleration)
        this.velocity.limit(MAX_VELOCITY)

        const bounce = this.checkBorder()
        this.velocity.mult(bounce)
        this.position.add(this.velocity)

        push()
        ellipse(this.position.x, this.position.y, SIZE)
        pop()

        this.acceleration.mult(0)
    }

    applyForce(force) {
        this.acceleration.add(force)
    }

    checkBorder() {
        let bounce = createVector(1, 1)

        if (this.position.x - this.radius < 0 || this.position.x + this.radius > window.canvasWidth)
        {
            bounce.x = -0.5
        }

        if (this.position.y - this.radius < 0 || this.position.y + this.radius > window.canvasHigth)
        {
            bounce.y = -0.5
        }

        return bounce
    }

    nextWindVector() {
        const wind = map(noise(this.windOffset), 0, 1, -1, 1)
        this.windOffset += WIND_OFFSET

        return createVector(wind, 0)
    }

}