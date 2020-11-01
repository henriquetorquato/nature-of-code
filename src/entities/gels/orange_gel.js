import Gel from './gel'
import { Vector } from 'p5'

const ACCELERATION_COEFICIENT = 5

export default class OrangeGel extends Gel {

    constructor(position, size) {
        super(position, size, color(219, 116, 42))
    }

    force(velocity) {
        const acceleration = Vector.copy(velocity)
        acceleration.normalize()
        acceleration.mult(ACCELERATION_COEFICIENT)

        return acceleration
    }

}