import Gel from './gel'
import { Vector } from 'p5'

const FRICTION_COEFICIENT = 5

export default class BlueGel extends Gel {

    constructor(position, size) {
        super(position, size, color(60, 100, 200))
    }

    force(velocity) {
        const friction = Vector.copy(velocity)
        friction.mult(-1)
        friction.normalize()
        friction.mult(FRICTION_COEFICIENT)

        return friction
    }

}