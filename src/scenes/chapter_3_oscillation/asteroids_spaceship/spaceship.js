import Walker from '@entities/walker'
import { TeleportingBorder } from '@resources/border'

const MASS = 1
const TRUSTERS_COLORS = [240, 142, 38]

export default class Spaceship extends Walker {

    constructor(position) {
        super(position, MASS)
        this.canvasBorder = new TeleportingBorder()
    }

    display() {
        push()
        translate(this.position.x, this.position.y)

        angleMode(DEGREES)
        rotate(this.angle)

        // Spaceship body
        fill(200, 100, 100)
        triangle(0, -20, -20, 20, 20, 20)
        // Spaceship window
        fill(115, 193, 201)
        circle(0, 0, 10)
        // Spaceship trusters

        if (this.accelerating)
        {
            fill(240, 142, 38)
        }
        else
        {
            fill(219, 213, 206)
        }

        rect(-15, 20, 5, 5)
        rect(10, 20, 5, 5)
        pop()

        this.accelerating = false
    }

    forward() {
        this.accelerating = true
    }

    left() {
        this.angle -= 1
    }

    right() {
        this.angle += 1
    }

}