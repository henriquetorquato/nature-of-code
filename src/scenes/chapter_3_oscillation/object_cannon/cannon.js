import Rect from '@resources/rect'
import { Vector } from 'p5'

const CANNON_SIZE = 80
const CANNON_WIDTH = 20
const CANNON_BASE_SIZE = 30
const MIN_CANNON_ANGLE = 220
const MAX_CANNON_ANGLE = 250
const CANNON_ANGLE_SPEED = 0.5
const CANNON_RECT_SIZE = 50
const CANNON_FORCE_SCALE = 1000

export default class Cannon {

    constructor(position) {
        this.position = position
        this.angle = MIN_CANNON_ANGLE
        this.angleDirection = CANNON_ANGLE_SPEED
        this.size = {
            width: CANNON_RECT_SIZE,
            height: CANNON_RECT_SIZE
        }

        this.barrelAnchor = createVector(-CANNON_WIDTH / 2, -5)
    }

    get fireRect() {
        const corner = createVector(
            this.position.x - this.size.width / 2,
            this.position.y - this.size.height / 2)

        return Rect.from(corner, this.size)
    }

    get cannonTip() {
        /*
        *   The cannon tip in reference from angle 0.
        *   P.S: Yes, it points down.
        */
        let tip = createVector(0, CANNON_SIZE + this.barrelAnchor.x)

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
        noStroke()
        fill(100)
        translate(this.position.x, this.position.y)
        rotate(this.angle)
        rect(this.barrelAnchor.x, this.barrelAnchor.y, CANNON_WIDTH, CANNON_SIZE)
        pop()

        push()
        noStroke()
        fill(158, 115, 70)
        translate(this.position.x, this.position.y)
        triangle(0, 0, -CANNON_BASE_SIZE, CANNON_BASE_SIZE, CANNON_BASE_SIZE, CANNON_BASE_SIZE)
        pop()
    }

    nextAngle() {
        if (this.angle < MIN_CANNON_ANGLE) {
            this.angleDirection = CANNON_ANGLE_SPEED
        }
        else if(this.angle > MAX_CANNON_ANGLE) {
            this.angleDirection = -CANNON_ANGLE_SPEED
        }

        return this.angle + this.angleDirection
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
        object.applyAngularForce(-1000)

        object.appear()
    }

}