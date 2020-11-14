import Rect from '@resources/rect'
import { Vector } from 'p5'

const CANNON_SIZE = 150
const CANNON_WIDTH = 20
const MIN_CANNON_ANGLE = 235
const MAX_CANNON_ANGLE = 270
const CANNON_ANGLE_SPEED = 0.5
const CANNON_FORCE_SCALE = 1000

export default class Cannon {

    constructor(position) {
        this.position = position
        this.angle = MIN_CANNON_ANGLE
        this.angularVelocity = CANNON_ANGLE_SPEED
    }

    get fireRect() {
        const corner = createVector(this.position.x - 60, this.position.y - 70)
        const size = { width: 120, height: 40 }
        return Rect.from(corner, size)
    }

    get cannonTip() {
        /*
        *   The cannon tip in reference from angle 0.
        *   P.S: Yes, it points down.
        */
        let tip = createVector(CANNON_WIDTH / 2, CANNON_SIZE)

        // Rotate the same amount as the cannon
        tip.rotate(this.angle)

        // The absolute tip position
        return Vector.add(this.position, tip)
    }

    update() {
        this.angle = this.nextAngle()
    }

    display() {
        push()
        angleMode(DEGREES)
        fill(80)
        translate(this.position.x, this.position.y)
        rotate(this.angle)
        rect(0, 0, CANNON_WIDTH, CANNON_SIZE)
        pop()

        push()
        translate(this.position.x, this.position.y - 40)
        fill(80)
        triangle(0, 0, 60, -30, -60, -30) // Funnel body
        fill(100)
        rect(-60, -70, 120, 40) // Funnel top
        fill(75)
        rect(-10, -5, 20, 20) // Funnel bottom
        fill(100)
        circle(0, 40, 70) // Storage unit
        fill(158, 115, 70)
        triangle(0, 50, -60, 100, 60, 100) // Cannon base
        pop()
    }

    nextAngle() {
        if (this.angle < MIN_CANNON_ANGLE) {
            this.angularVelocity = CANNON_ANGLE_SPEED
        }
        else if(this.angle > MAX_CANNON_ANGLE) {
            this.angularVelocity = -CANNON_ANGLE_SPEED
        }

        return this.angle + this.angularVelocity
    }

    fire(object) {
        const tipPosition = this.cannonTip
        let direction = Vector.sub(tipPosition, this.position)
        direction.normalize()

        // Correct position to use object center
        const centerPosition = createVector(
            tipPosition.x - object.size.width / 2,
            tipPosition.y - object.size.height / 2)

        object.position = centerPosition

        // Scale the force
        const force = Vector.mult(direction, CANNON_FORCE_SCALE)
        object.applyForce(force)
        object.applyAngularForce(-CANNON_FORCE_SCALE)

        object.appear()
    }

}