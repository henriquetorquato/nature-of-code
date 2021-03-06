import Walker from '@entities/walker'
import Thruster from './thruster'
import { TeleportingBorder } from '@resources/border'
import { Vector } from 'p5'

const MASS = 1
const THRUSTER_FORCE = 0.05
const ANGLE_VELOCITY = 2
const VELOCITY_LIMIT = 6
const INITIAL_VELOCITY_BOUNDS = 0.2

export default class Spaceship extends Walker {

    constructor(position) {
        super(position, MASS)
        // Intial random velocity
        this.velocity = this.randomVelocity()
        this.canvasBorder = new TeleportingBorder()
        this.velocityLimit = VELOCITY_LIMIT

        this.leftThruster = new Thruster(createVector(-12.5, 30))
        this.rightThruster = new Thruster(createVector(12.5, 30))
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

        // Spaceship thrusters
        if (this.accelerating)
        {
            fill(240, 142, 38)

            this.leftThruster.add()
            this.rightThruster.add()
        }
        else
        {
            fill(219, 213, 206)
        }

        rect(-15, 20, 5, 5)
        rect(10, 20, 5, 5)
        pop()

        this.leftThruster.rotate(this.position, this.angle)
        this.rightThruster.rotate(this.position, this.angle)

        this.leftThruster.run()
        this.rightThruster.run()

        this.accelerating = false
    }

    forward() {
        const force = createVector(0, -THRUSTER_FORCE)
        force.rotate(this.angle)
        this.applyForce(force)
        this.accelerating = true
    }

    left() {
        this.angle -= ANGLE_VELOCITY
    }

    right() {
        this.angle += ANGLE_VELOCITY
    }

    randomVelocity() {
        return createVector(
            Math.randomBetween(-INITIAL_VELOCITY_BOUNDS, INITIAL_VELOCITY_BOUNDS),
            Math.randomBetween(-INITIAL_VELOCITY_BOUNDS, INITIAL_VELOCITY_BOUNDS))
    }

}